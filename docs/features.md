# Tính năng Chi tiết ứng dụng

Ứng dụng được chia thành 3 giai đoạn trải nghiệm chính cho người dùng:

## 1. Hệ thống Khóa & Bảo mật (Lock Screen)
- **Cơ chế**: Người dùng cần nhập mã bí mật (`LIXITET`) để truy cập.
- **Trải nghiệm**: Hiệu ứng pháo hoa tương tác khi click chuột, tạo không khí lễ hội và sự tò mò ngay từ đầu.
- **Lưu trữ**: Trạng thái mở khóa được ghi nhớ trên trình duyệt (`is_app_unlocked`).

## 2. Giao diện Luận giải & Nhập liệu
- **Thông tin gia chủ**: Thu thập Họ tên, Ngày sinh, Nơi ở, Công việc, Tình trạng hôn nhân và Con giáp.
- **Hệ thống Gợi ý (Niche Suggestions)**: Cung cấp hàng chục chủ đề "hot" và chi tiết giúp người dùng dễ dàng lựa chọn điều mình quan tâm nhất (Công danh, Tài lộc, Tình duyên, v.v.).
- **Banner & QR Hệ sinh thái**: 
  - Tích hợp mã QR **Agribank** chính chủ cho các giao dịch lì xì/thanh toán.
  - Tích hợp mã QR **Học AI miễn phí** để dẫn dắt người dùng vào hệ sinh thái AIVA.
  - Các mã QR được tối ưu hóa kích thước và hiệu ứng (Scan line, Neon Glow) để đảm bảo khả năng quét nhạy bén trên mọi thiết bị di động.

## 3. Module Nhân tướng học AI (MỚI)
- **AI Vision Integration**: Sử dụng Gemini 1.5 Flash để phân tích đặc điểm khuôn mặt từ ảnh tải lên.
- **Hiệu ứng Scan Laser**: Mô phỏng quá trình tầm soát nhân dạng bằng tia laser xanh rực rỡ.
- **Dashboard Trực quan**: 
  - Hiển thị ảnh chân dung với các **Điểm neo (Pointers)** giải mã chi tiết từng bộ phận.
  - **Biểu đồ Năng lượng**: Radar chart (SVG) hiển thị 5 chỉ số vận mệnh (Sự nghiệp, Tình duyên, Trí tuệ...).

## 4. Kết quả & Tiện ích Cao cấp
- **Streaming Text**: Phản hồi AI theo thời gian thực với hiệu ứng gõ chữ.
- **Đa phương thức**: Luận giải kết hợp văn bản và giọng đọc AI (TTS) truyền cảm.
- **Xuất dữ liệu Đa dạng**: 
  - **Tải file Word**: Lưu trữ văn bản luận giải.
  - **Hồ sơ VIP (PDF)**: Xuất toàn bộ Dashboard trực quan sang file PDF/In ấn chất lượng cao.
- **Quản lý Lịch sử**: Lưu trữ và xem lại các phiên luận giải ngay trên giao diện.
