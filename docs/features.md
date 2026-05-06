# Tính năng Chi tiết ứng dụng

Ứng dụng được chia thành 3 giai đoạn trải nghiệm chính cho người dùng:

## 1. Hệ thống Khóa & Bảo mật (Lock Screen)
- **Cơ chế**: Người dùng cần nhập mã bí mật (`LIXITET`) để truy cập.
- **Trải nghiệm**: Hiệu ứng pháo hoa tương tác khi click chuột, tạo không khí lễ hội và sự tò mò ngay từ đầu.
- **Lưu trữ**: Trạng thái mở khóa được ghi nhớ trên trình duyệt (`is_app_unlocked`).

## 2. Giao diện Luận giải & Nhập liệu
- **Thông tin gia chủ**: Thu thập Họ tên, Ngày sinh, Nơi ở, Công việc, Tình trạng hôn nhân và Con giáp.
- **Hệ thống Gợi ý (Niche Suggestions)**: Cung cấp hàng chục chủ đề "hot" và chi tiết giúp người dùng dễ dàng lựa chọn điều mình quan tâm nhất (Công danh, Tài lộc, Tình duyên, v.v.).
- **Banner Quảng bá**: Tích hợp các banner kêu gọi hành động (CTA) như "Quét mã QR học AI", "Lì xì lấy hên" để tăng tính tương tác và định hướng người dùng.

## 3. Kết quả Tiên tri & Tiện ích
- **Streaming Text**: Kết quả luận giải được hiển thị theo thời gian thực (typing effect), tạo cảm giác AI đang trực tiếp phân tích.
- **Giọng đọc AI (TTS)**: Tự động chuyển đổi văn bản luận giải thành giọng nói truyền cảm trong nền.
- **Lịch sử Luận giải**: Cho phép người dùng xem lại các lần luận giải trước đó thông qua Sidebar.
- **Xuất dữ liệu**: 
  - Xuất file Word (.doc) để lưu trữ lâu dài.
  - Tải file Audio (.wav) để nghe lại.
- **Gợi ý chủ đề tiếp theo**: Cuối mỗi bài luận luôn có gợi ý một chủ đề mới để giữ chân người dùng.
