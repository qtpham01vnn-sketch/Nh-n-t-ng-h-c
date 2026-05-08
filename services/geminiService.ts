import { GoogleGenerativeAI } from "@google/generative-ai";
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

// --- NEW: PHYSIOGNOMY PROMPT CONSTRUCTOR ---
const constructPhysiognomyPrompt = (formData: FormData): string => {
  return `
    BẠN LÀ BẬC THẦY NHÂN TƯỚNG HỌC VÀ THẦN SỐ HỌC CẤP CAO (DỰA TRÊN HÌNH ẢNH THỰC TẾ).
    GIA CHỦ ĐÃ CUNG CẤP ẢNH CHÂN DUNG. HÃY PHÂN TÍCH DỰA TRÊN ĐẶC ĐIỂM THỰC TẾ TRONG ẢNH.
    
    QUY TRÌNH LUẬN GIẢI:
    1. Nhận xét ngay về THẦN THÁI và CỐT CÁCH nhìn thấy qua ảnh chân dung này.
    2. Phân tích chi tiết 5 bộ phận: Trán (Sự nghiệp), Mắt (Tâm hồn/Trí tuệ), Mũi (Tài lộc), Miệng (Hậu vận/Giao tiếp), Cằm (Sức khỏe/Địa vị).
    3. Kết hợp với thông tin tử vi: ${formData.fullName}, sinh ngày ${formData.dob} (${formData.zodiac}).
    
    YÊU CẦU ĐẦU RA (BẮT BUỘC):
    1. Bản luận giải văn bản dài, sâu sắc, bắt đầu bằng việc "Soi tướng qua ảnh".
    2. ĐÍNH KÈM thẻ <physiognomy_json>...</physiognomy_json> ở CUỐI CÙNG với đầy đủ tọa độ X, Y để vẽ điểm neo lên mặt.
    
    CẤU TRÚC JSON (MẪU):
    {
      "summary": "Mô tả ngắn về tướng mạo qua ảnh",
      "points": [
        { "id": "tran", "label": "TRÁN", "description": "Nhận xét thực tế về trán...", "x": (tự tính toán X), "y": (tự tính toán Y) },
        { "id": "mat", "label": "MẮT", "description": "Nhận xét thực tế về mắt...", "x": (tự tính toán X), "y": (tự tính toán Y) },
        { "id": "mui", "label": "MŨI", "description": "Nhận xét thực tế về mũi...", "x": (tự tính toán X), "y": (tự tính toán Y) },
        { "id": "mieng", "label": "MIỆNG", "description": "Nhận xét thực tế về miệng...", "x": (tự tính toán X), "y": (tự tính toán Y) },
        { "id": "cam", "label": "CẰM", "description": "Nhận xét thực tế về cằm...", "x": (tự tính toán X), "y": (tự tính toán Y) }
      ],
      LƯU Ý: Phải xác định X, Y thực tế trên mặt người trong ảnh. KHÔNG ĐƯỢC để X giống nhau cho tất cả các điểm (tránh hàng dọc).
      "energyChart": [
        { "label": "Sự nghiệp", "value": 85 },
        { "label": "Tình cảm", "value": 70 },
        { "label": "Trí tuệ", "value": 90 },
        { "label": "Thể chất", "value": 75 },
        { "label": "Tinh thần", "value": 80 }
      ]
    }
    
    CHÚ Ý: Tọa độ X, Y là phần trăm (%). Hãy ước lượng vị trí các bộ phận trên ảnh chân dung người thật một cách hợp lý nhất.
  `;
};

export const generateFengShuiTextStream = async function* (formData: FormData, imageBase64?: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || '');
  
  const fullPrompt = imageBase64 
    ? constructPhysiognomyPrompt(formData)
    : constructPrompt(formData);

  try {
    const modelName = "gemini-flash-latest"; 
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const parts: any[] = [fullPrompt];
    
    if (imageBase64) {
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      parts.push({
        inlineData: {
          mimeType: "image/png", 
          data: cleanBase64
        }
      });
    }
    
    // --- RETRY LOGIC (NON-STREAMING FOR STABILITY) ---
    let attempts = 0;
    const maxRetries = 3;
    
    while (attempts < maxRetries) {
      try {
        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();
        yield text;
        return;
      } catch (error: any) {
        attempts++;
        const isRetryable = error.message?.includes("429") || error.message?.includes("503") || error.message?.includes("parse");
        
        if (isRetryable && attempts < maxRetries) {
          console.warn(`Đang thử lại lần ${attempts}...`);
          await new Promise(resolve => setTimeout(resolve, attempts * 2000));
          continue;
        }
        
        if (error.message?.includes("429")) throw new Error("Hạn mức AI hôm nay đã hết.");
        if (error.message?.includes("503")) throw new Error("Máy chủ AI đang quá tải.");
        throw error;
      }
    }
    throw new Error("Không thể kết nối với AI sau nhiều lần thử. Vui lòng kiểm tra mạng!");

  } catch (error) {
    console.error("Stream API Error", error);
    throw error;
  }
};

// 2. BACKGROUND AUDIO GENERATION (Optimized with chunking and fast provider)
export const generateFengShuiAudio = async (text: string): Promise<string | undefined> => {
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    // Clean up text for speech
    const textForSpeech = text
      .replace(/:::NEXT_TOPIC:::.*$/s, '') 
      .replace(/<physiognomy_json>.*?<\/physiognomy_json>/gs, '')
      .replace(/\*\*/g, '') 
      .replace(/##/g, '')   
      .replace(/#/g, '')    
      .replace(/^\s*-\s/gm, '') 
      .replace(/\[.*?\]/g, '') 
      .replace(/\(.*?\)/g, '') 
      .replace(/\s+/g, ' ') 
      .trim();

    // To prevent "very long time", we only read the most important parts (approx first 1000 chars)
    // if the text is too long.
    const limitedText = textForSpeech.length > 1500 
      ? textForSpeech.substring(0, 1500) + "... Cảm ơn anh đã lắng nghe."
      : textForSpeech;

    try {
        // We use a high-quality, fast public TTS proxy for immediate results
        // This is much faster than calling a heavy LLM for TTS
        const chunks = splitTextIntoChunks(limitedText, 200);
        const audioBuffers: Uint8Array[] = [];

        for (const chunk of chunks) {
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=vi&client=tw-ob`;
            const response = await fetch(url);
            if (response.ok) {
                const arrayBuffer = await response.arrayBuffer();
                audioBuffers.push(new Uint8Array(arrayBuffer));
            }
        }

        if (audioBuffers.length === 0) return undefined;

        // Combine buffers
        const totalLength = audioBuffers.reduce((acc, curr) => acc + curr.length, 0);
        const combinedBuffer = new Uint8Array(totalLength);
        let offset = 0;
        for (const buffer of audioBuffers) {
            combinedBuffer.set(buffer, offset);
            offset += buffer.length;
        }

        // Convert to Base64
        let binary = '';
        const len = combinedBuffer.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(combinedBuffer[i]);
        }
        return btoa(binary);

    } catch (e) {
        console.error("Audio generation error", e);
        return undefined;
    }
};

// Helper to split text into chunks for TTS limits
const splitTextIntoChunks = (text: string, maxLength: number): string[] => {
    const chunks: string[] = [];
    let current = text;
    while (current.length > 0) {
        if (current.length <= maxLength) {
            chunks.push(current);
            break;
        }
        let cutIndex = current.lastIndexOf(' ', maxLength);
        if (cutIndex === -1) cutIndex = maxLength;
        chunks.push(current.substring(0, cutIndex).trim());
        current = current.substring(cutIndex).trim();
    }
    return chunks;
};
