# Y2K Snapbooth

Photobooth 4-cut chạy trên trình duyệt, cho phép chụp ảnh bằng webcam, trang trí dải ảnh và tải hoặc chia sẻ thành phẩm. Giao diện lấy cảm hứng từ phong cách Y2K.

## Trạng thái dự án

**MVP trong ứng dụng: Hoàn thành.** Tính năng còn thiếu để hoàn tất phạm vi MVP mở rộng là upload và liên kết/QR để mở ảnh trên thiết bị khác.

Ứng dụng hiện hỗ trợ:

- Chọn bố cục 2-cut/4-cut, frame và thời gian đếm ngược 3, 5 hoặc 10 giây.
- Chụp bằng camera, chuyển camera trước/sau trên thiết bị hỗ trợ, chụp lại từng ảnh; có mock mode khi camera không khả dụng hoặc bị từ chối quyền.
- Xem trạng thái camera, countdown, flash và tiến trình chụp.
- Trang trí với frame, filter và chữ ký tùy chỉnh (kiểu chữ, màu, kích thước); thêm sticker cố định trên khung và sticker trước/sau/cả hai đầu chữ ký. Preview khớp PNG xuất.
- Xuất và tải PNG; chia sẻ ảnh qua Web Share API nếu trình duyệt hỗ trợ, có tải ảnh dự phòng.
- Bắt đầu phiên mới và xóa dữ liệu phiên hiện tại.
- Đã kiểm thử E2E và kiểm thử thủ công trên mobile với camera thật, bao gồm chuyển đổi camera trước/sau.

## Tính năng còn thiếu

- Upload ảnh và tạo liên kết/QR để mở ảnh trên thiết bị khác. Hiện chưa tích hợp Supabase, Firebase hay dịch vụ lưu trữ nào.
- Khi triển khai chia sẻ xuyên thiết bị, cần chọn backend lưu ảnh và cơ chế tự động xóa ảnh sau 7 ngày.


## Bắt đầu

Yêu cầu Node.js tương thích với Next.js 16.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Để chụp bằng webcam, hãy mở ứng dụng trong môi trường trình duyệt hỗ trợ camera và cấp quyền truy cập khi được hỏi. Nếu không có camera, có thể dùng mock mode trên trang chụp.

## Kiểm thử E2E

Cài Chromium cho Playwright một lần:

```bash
npx playwright install chromium
```

Chạy các bài kiểm thử luồng photobooth:

```bash
npm run test:e2e
```

Test tự khởi động ứng dụng và sử dụng camera giả lập của Chromium; không cần webcam thật. Các kịch bản bao gồm 2-cut/4-cut, giữ frame, timer, retake, filter không làm thay đổi ảnh gốc, tùy chỉnh chữ ký và vị trí sticker, xử lý từ chối quyền camera bằng mock mode, xuất PNG/tải ảnh, reset và kiểm tra tràn ngang ở viewport hẹp.

## Công nghệ

- Next.js 16, React 19 và TypeScript
- Tailwind CSS
- Zustand để quản lý trạng thái phiên chụp
- Playwright cho kiểm thử E2E
