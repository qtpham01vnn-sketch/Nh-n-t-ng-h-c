import { GoogleGenAI, Modality } from "@google/genai";
import { FormData } from '../types';
import { SYSTEM_PROMPT_TEMPLATE } from '../constants';

// --- AUDIO PROCESSING HELPERS ---
// Convert Raw PCM (16-bit, 24kHz, Mono) to WAV container
const pcmToWav = (base64PCM: string): string => {
  // 1. Decode base64 to binary string & convert to buffer
  const binaryString = atob(base64PCM);
  const len = binaryString.length;
  const buffer = new ArrayBuffer(len);
  const view = new DataView(buffer);
  for (let i = 0; i < len; i++) {
    view.setUint8(i, binaryString.charCodeAt(i));
  }

  // 2. WAV Header Parameters for Gemini TTS
  const numOfChannels = 1;
  const sampleRate = 24000;
  const bitDepth = 16;
  const byteRate = sampleRate * numOfChannels * (bitDepth / 8);
  const blockAlign = numOfChannels * (bitDepth / 8);
  const wavHeaderSize = 44;

  // 3. Create buffer for the final WAV file (Header + Data)
  const wavBuffer = new ArrayBuffer(wavHeaderSize + len);
  const wavView = new DataView(wavBuffer);

  // RIFF chunk
  writeString(wavView, 0, 'RIFF');
  wavView.setUint32(4, 36 + len, true); // ChunkSize
  writeString(wavView, 8, 'WAVE');

  // fmt sub-chunk
  writeString(wavView, 12, 'fmt ');
  wavView.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  wavView.setUint16(20, 1, true);   // AudioFormat (1 for PCM)
  wavView.setUint16(22, numOfChannels, true);
  wavView.setUint32(24, sampleRate, true);
  wavView.setUint32(28, byteRate, true);
  wavView.setUint16(32, blockAlign, true);
  wavView.setUint16(34, bitDepth, true);

  // data sub-chunk
  writeString(wavView, 36, 'data');
  wavView.setUint32(40, len, true); // Subchunk2Size

  // 4. Combine Header and PCM Data
  const pcmBytes = new Uint8Array(buffer);
  const wavBytes = new Uint8Array(wavBuffer);
  wavBytes.set(pcmBytes, 44);

  // 5. Encode back to Base64 (Chunked to prevent stack overflow)
  let binary = '';
  const bytes = new Uint8Array(wavBuffer);
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
  }

  return btoa(binary);
};

const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
// ------------------------------


/**
 * Tinh toán màu sắc may mắn dựa trên con giáp và ngày hiện tại (deterministic)
 */
const getLuckyColor = (zodiac: string, language: string = 'vi'): string => {
  const colorsVi = ["Đỏ", "Vàng", "Xanh Dương", "Xanh Lá", "Trắng", "Đen", "Tím", "Hồng", "Cam", "Nâu"];
  const colorsEn = ["Red", "Yellow", "Blue", "Green", "White", "Black", "Purple", "Pink", "Orange", "Brown"];
  const colors = language === 'en' ? colorsEn : colorsVi;
  
  const date = new Date();
  const dayStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const seed = zodiac + dayStr;
  
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const constructPrompt = (formData: FormData): string => {
  const isLuckyColorTopic = formData.topic.includes("Màu Sắc May Mắn Hôm Nay") || formData.topic.includes("Lucky Color of the Day");
  const luckyColor = isLuckyColorTopic ? getLuckyColor(formData.zodiac, formData.language) : null;
  
  const luckyColorInstruction = luckyColor 
    ? `\n!!! LƯU Ý QUAN TRỌNG: Màu sắc may mắn NHẤT của gia chủ hôm nay TUYỆT ĐỐI PHẢI LÀ: ${luckyColor}. Hãy giải thích lý do dựa trên ngũ hành của màu này và con giáp ${formData.zodiac} một cách thuyết phục.\n`
    : "";

  const userRequest = `
    THÔNG TIN CHI TIẾT GIA CHỦ:
    - Họ và tên: ${formData.fullName || "Chưa cung cấp"}
    - Ngày tháng năm sinh: ${formData.dob || "Chưa cung cấp"}
    - Khu vực đang sống: ${formData.location || "Chưa cung cấp"}
    - Công việc hiện tại: ${formData.currentJob || "Chưa cung cấp"}
    - Tình trạng hôn nhân: ${formData.maritalStatus || "Chưa cung cấp"}
    - Giới tính: ${formData.gender}
    - Con giáp: ${formData.zodiac}
    
    CHỦ ĐỀ YÊU CẦU: ${formData.topic}${luckyColorInstruction}
    
    CÂU HỎI CHI TIẾT/MỞ RỘNG:
    "${formData.superChat || "Hãy phân tích chi tiết và chuẩn xác theo thông tin trên."}"
    
    YÊU CẦU BẮT BUỘC (SIÊU CẤP VIP PRO):
    0. **NGÔN NGỮ**: Trả lời bằng ${formData.language === "en" ? "TIẾNG ANH (ENGLISH)" : "TIẾNG VIỆT"}. 
    1. **PHÂN TÍCH CHUYÊN SÂU & CHI TIẾT**: Trả lời CỰC KỲ CHI TIẾT, ĐA CHIỀU. Nội dung phải dài, đủ để đọc trong 5-10 phút. Phân tích sâu vào từng khía cạnh dựa trên thông tin gia chủ.
    2. **TƯ DUY THỊNH VƯỢNG & TÍCH CỰC TUYỆT ĐỐI**: Tập trung 100% vào CƠ HỘI, TÀI LỘC, MAY MẮN. 
       - KHÔNG NÓI ĐIỀU XUI XẺO. Nếu có hạn, hãy biến nó thành CƠ HỘI ĐỂ THAY ĐỔI và đưa ra giải pháp hoá giải ngay.
       - Làm cho người đọc cảm thấy HẠNH PHÚC, PHẤN CHẤN, ĐẦY NĂNG LƯỢNG.
    3. **GIỌNG VĂN CHUYÊN NGHIỆP & CUỐN HÚT**: 
       - Sử dụng ngôn từ SANG TRỌNG, ĐẲNG CẤP, NHƯ MỘT BẬC THẦY CỐ VẤN.
       - Giọng văn điềm tĩnh, sâu sắc, tạo niềm tin tuyệt đối.
       - Tránh các từ đệm quá thân mật, hãy giữ sự tôn trọng và uy nghiêm của một bậc thầy.
    4. **GIÁ TRỊ THỰC TIỄN CAO**: Lời khuyên phải áp dụng được ngay vào công việc, đời sống 2026.
    
    HÃY LÀM CHO NGƯỜI DÙNG CẢM THẤY ĐƯỢC YÊU THƯƠNG, ĐƯỢC TRAO QUYỀN NĂNG VÀ MUỐN NGHE MÃI KHÔNG THÔI.
  `;

  return SYSTEM_PROMPT_TEMPLATE + userRequest;
};

// 1. STREAMING TEXT GENERATION (Ultra Fast)
export const generateFengShuiTextStream = async function* (formData: FormData) {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || '' });
  const fullPrompt = constructPrompt(formData);

  try {
    // Switch to Flash for maximum speed as requested
    const modelText = 'gemini-3-flash-preview'; 
    
    const responseStream = await ai.models.generateContentStream({
      model: modelText,
      contents: fullPrompt,
      config: {
        temperature: 0.8, 
        topK: 40,
        topP: 0.95,
      }
    });

    for await (const chunk of responseStream) {
      yield chunk.text || "";
    }

  } catch (error) {
    console.error("Stream API Error", error);
    throw error;
  }
};

// 2. BACKGROUND AUDIO GENERATION
export const generateFengShuiAudio = async (text: string): Promise<string | undefined> => {
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: apiKey || '' });

    // Clean up text for professional speech synthesis - OPTIMIZED FOR VIP CONTENT
    const textForSpeech = text
      .replace(/:::NEXT_TOPIC:::.*$/s, '') // Remove Next Topic tag and everything after
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/##/g, '')   // Remove h2 markers
      .replace(/#/g, '')    // Remove h1 markers
      .replace(/^\s*-\s/gm, '') // Remove list bullets at start of line
      .replace(/\[.*?\]/g, '') // Remove citations
      .replace(/\(.*?\)/g, '') // Remove parentheses
      .replace(/!/g, '! ')
      .replace(/\?/g, '? ')
      .replace(/\./g, '. ')
      .replace(/\n/g, ', ') // Line breaks to commas
      .replace(/\s+/g, ' ') // Collapse spaces
      .trim();

    try {
        const audioResponse = await ai.models.generateContent({
            model: 'gemini-3.1-flash-tts-preview',
            contents: {
              parts: [{ text: textForSpeech }]
            },
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' } 
                }
              }
            }
          });
    
        const rawAudioBase64 = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (rawAudioBase64) {
             // Convert to WAV so browser can play it
             return pcmToWav(rawAudioBase64);
        }
    } catch (e) {
        console.error("Audio generation error", e);
    }
    return undefined;
};
