# Tổng quan Dự án: HUYỀN CƠ CỐ VẤN (Tuấn Master App)

## 1. Mục tiêu & Ý nghĩa
Dự án **"HUYỀN CƠ CỐ VẤN"** là một ứng dụng Web cao cấp được thiết kế để cung cấp các dịch vụ luận giải vận mệnh, phong thuỷ và tử vi dựa trên công nghệ AI (Gemini). Mục tiêu chính là tạo ra một trải nghiệm huyền bí, chuyên nghiệp và mang lại giá trị tinh thần, định hướng tích cực cho người dùng trong năm 2026.

## 2. Công nghệ sử dụng (Stack)
- **Frontend**: React (v19), TypeScript, Vite.
- **Styling**: Tailwind CSS (Sử dụng cấu hình custom với hệ màu Neon).
- **AI Core**: Google Gemini API (Model: `gemini-3-flash-preview` cho text và `gemini-3.1-flash-tts-preview` cho audio).
- **Xử lý nội dung**: `react-markdown` để hiển thị kết quả AI một cách chuyên nghiệp.

## 3. Kiến trúc hệ thống
Ứng dụng được xây dựng theo mô hình Single Page Application (SPA) tập trung vào tốc độ phản hồi và hiệu ứng thị giác:
- **Client-Side**: Xử lý toàn bộ UI/UX, quản lý state và gọi trực tiếp API của Gemini (thông qua cấu hình an toàn trong `.env`).
- **Data Persistence**: Sử dụng `localStorage` để lưu trữ lịch sử luận giải và trạng thái mở khóa của người dùng.

## 4. Triết lý Thiết kế
Ứng dụng mang phong cách **Premium Neon Dark Theme**:
- Sử dụng màu sắc mạnh (Neon Red, Blue, Gold, Purple) trên nền đen sâu.
- Các hiệu ứng hạt (fireworks), chuyển động (glow, float, spin) tạo cảm giác sống động và cao cấp.
- Typography kết hợp giữa Font hiện đại (Inter) và Font tiêu đề sang trọng (Playfair Display/Orbitron).
