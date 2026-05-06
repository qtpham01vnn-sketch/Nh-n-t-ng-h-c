# Hướng dẫn Bảo trì & Phát triển

## 1. Cập nhật API Key
- API Key được lưu trữ trong file `.env`. 
- Cần đảm bảo key có quyền truy cập vào Google AI Studio và các model Gemini Flash.

## 2. Cấu hình Model
Trong `services/geminiService.ts`, có thể thay đổi model cho Text và Audio:
- `MODEL_NAME`: `gemini-3-flash-preview` (Mặc định).
- `TTS_MODEL_NAME`: `gemini-3.1-flash-tts-preview`.

## 3. Thay đổi Nội dung & Dịch thuật
Mọi chuỗi ký tự hiển thị trên UI và danh sách gợi ý đều nằm trong file `constants.ts`. Để thay đổi nội dung, chỉ cần chỉnh sửa các hằng số tại đây:
- `NICHE_SUGGESTIONS`: Danh sách các chủ đề chính.
- `SUB_TOPICS`: Danh sách các tiểu chủ đề tương ứng.
- `TRANSLATIONS`: Nội dung hiển thị theo ngôn ngữ (VI/EN).

## 4. Định hướng Cải tiến tương lai
- **Tích hợp Camera**: Sử dụng Vision AI để phân tích trực tiếp khuôn mặt gia chủ.
- **Thanh toán**: Tích hợp các cổng thanh toán/mã QR động khi người dùng muốn xem các bản tin "Đặc biệt".
- **Chat trực tiếp**: Cho phép người dùng hỏi đáp sâu hơn về kết quả vừa nhận được thông qua cửa sổ chat.
- **Đa dạng hóa giọng đọc**: Thêm lựa chọn giọng đọc (Nam/Nữ, vùng miền) trong cài đặt.
