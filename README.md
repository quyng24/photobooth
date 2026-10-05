# Y2K Snapbooth

Photobooth 4-cut chạy trên trình duyệt, cho phép chụp ảnh bằng webcam, trang trí dải ảnh và tải hoặc chia sẻ thành phẩm. Giao diện lấy cảm hứng từ phong cách Y2K.

## Trạng thái dự án

**Phase 1 — Core MVP: Hoàn thành**

Luồng cốt lõi từ trang chủ đến ảnh thành phẩm đã hoạt động:

- Chọn bố cục ảnh 2-cut hoặc 4-cut.
- Chụp bằng camera với đếm ngược; có thể chụp lại từng ảnh.
- Chuyển sang mock mode để trải nghiệm khi camera không khả dụng hoặc không được cấp quyền.
- Trang trí dải ảnh với màu khung, filter và chữ ký tùy chỉnh.
- Xem trước, kết xuất ảnh PNG, tải xuống và chia sẻ qua tính năng chia sẻ của trình duyệt nếu được hỗ trợ.
- Bắt đầu phiên mới và xóa dữ liệu phiên hiện tại.
- Kiểm thử E2E cho luồng chọn 2-cut, chụp, chỉnh sửa, xuất/tải ảnh và bắt đầu lại.

### Phase 2 — Photo Booth Experience

**Trạng thái: Hoàn thành phần triển khai chính.** Camera vật lý và đổi camera trước/sau vẫn cần được xác nhận thủ công trên thiết bị mục tiêu.

- [x] Hiển thị trạng thái camera, đếm ngược, flash và tiến trình chụp.
- [x] Hỗ trợ camera trước/sau trên thiết bị di động khi trình duyệt và thiết bị cho phép.
- [x] Cho phép chụp lại từng ảnh trong dải.
- [x] Cho phép chọn bố cục 2-cut/4-cut và frame ở trang setup; lựa chọn được giữ khi sang capture.
- [x] Cho phép chọn thời gian đếm ngược 3, 5 hoặc 10 giây; áp dụng cho chụp mới và retake.
- [x] Cho phép chọn filter; preview dùng CSS trên ảnh gốc và filter chỉ được áp dụng khi xuất PNG.
- [x] Có mock mode để trải nghiệm khi camera không khả dụng hoặc bị từ chối quyền.
- [x] Bổ sung trạng thái truy cập được cho các lựa chọn và countdown; kiểm tra bố cục setup/capture ở viewport mobile bằng E2E.
- [x] Mở rộng E2E cho 2-cut/4-cut, timer, retake, filter preview, camera bị từ chối quyền, mock mode, xuất/tải ảnh và reset.
- [ ] Kiểm thử camera thật, đổi camera và trải nghiệm trình duyệt trên nhiều thiết bị mục tiêu.

## Lộ trình phát triển

### Phase 3 — Social / Advanced

Mở rộng từ trải nghiệm cá nhân sang chia sẻ và các tính năng nâng cao:

- Hoàn thiện trải nghiệm chia sẻ ảnh và tối ưu thành phẩm cho các nền tảng xã hội.
- Cân nhắc tạo QR hoặc liên kết chia sẻ để mở ảnh trên thiết bị khác.
- Bổ sung thư viện lưu/xem lại ảnh hoặc phiên chụp, với lựa chọn lưu trữ phù hợp.
- Khám phá thêm template, sticker, tùy chỉnh nâng cao và các tính năng cộng đồng.

Phase 2 đã hoàn thiện phần triển khai chính; kiểm thử camera vật lý và tương thích đa thiết bị vẫn là xác nhận thủ công. Các mục Phase 3 là mục tiêu dự kiến, chưa phải tính năng đã phát hành.

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

Test tự khởi động ứng dụng và sử dụng camera giả lập của Chromium; không cần webcam thật. Các kịch bản bao gồm 2-cut/4-cut, giữ frame, timer, retake, filter không làm thay đổi ảnh gốc, xử lý từ chối quyền camera bằng mock mode, xuất PNG/tải ảnh, reset và kiểm tra tràn ngang ở viewport hẹp.

## Công nghệ

- Next.js 16, React 19 và TypeScript
- Tailwind CSS
- Zustand để quản lý trạng thái phiên chụp
- Playwright cho kiểm thử E2E
