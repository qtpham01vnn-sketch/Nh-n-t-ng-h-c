# Nguyên lý Hoạt động & Logic Cốt lõi

## 1. Prompt Engineering (Linh hồn của ứng dụng)
Mọi kết quả luận giải đều dựa trên một `SYSTEM_PROMPT_TEMPLATE` cực kỳ chi tiết:
- **Vai trò**: Cố vấn chiến lược vận mệnh cấp cao.
- **Triết lý**: Không phán đúng/sai, chỉ tập trung vào hiệu quả và giải pháp.
- **Phong cách**: Điềm tĩnh, uy nghiêm nhưng vẫn gần gũi, sử dụng tư duy của người lãnh đạo/doanh nhân.
- **Cấu trúc**: Luôn tuân thủ 7 tầng nội dung (Hook, Dẫn dắt, Bức tranh tổng thể, Dự báo, Nguyên nhân, Giải pháp, Đúc kết).

## 2. Logic Màu sắc May mắn (Deterministic)
Ứng dụng tính toán màu sắc may mắn dựa trên thuật toán hash kết hợp giữa `Con giáp` và `Ngày hiện tại`. Điều này đảm bảo:
- Trong cùng một ngày, một người (cùng con giáp) sẽ luôn nhận được một màu sắc duy nhất.
- Sang ngày mới, màu sắc sẽ tự động thay đổi, tạo cảm giác vận khí biến chuyển theo thời gian.

## 3. Xử lý Audio & TTS
- **Dòng chảy**: Sau khi hoàn tất việc tạo văn bản, ứng dụng sẽ gửi nội dung đã được làm sạch (loại bỏ các ký tự Markdown) tới model `flash-tts`.
- **Định dạng**: Dữ liệu PCM 16-bit trả về từ API được convert sang container WAV thủ công để trình duyệt có thể phát và tải xuống trực tiếp mà không cần server backend.

## 4. Logic Đa phương thức & Trích xuất JSON (Vision)
- **Model**: Sử dụng `gemini-1.5-flash` để hỗ trợ cả văn bản và hình ảnh.
- **Dữ liệu cấu trúc**: Hệ thống yêu cầu AI trả về dữ liệu nhân tướng trong thẻ `<physiognomy_json>`. 
- **Quy trình bóc tách**:
  1. Nhận luồng dữ liệu (Stream) từ AI.
  2. Dùng Regex/Split để tách riêng phần **Văn bản luận giải** (hiển thị) và phần **Dữ liệu JSON** (ẩn).
  3. Parse JSON để lấy tọa độ các bộ phận trên mặt (`points`) và chỉ số năng lượng (`energyChart`).
  4. Cập nhật Dashboard trực quan theo thời gian thực khi dữ liệu stream đang đổ về.

## 5. Quản lý State & Stream
Sử dụng `async generators` để xử lý stream từ Gemini API, cho phép cập nhật giao diện ngay khi có từng từ (chunk) văn bản được trả về, giúp giảm thiểu thời gian chờ đợi của người dùng.
