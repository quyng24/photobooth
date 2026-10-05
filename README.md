# Y2K Snapbooth

Photobooth 4-cut chạy trên trình duyệt, cho phép chụp ảnh bằng webcam, trang trí dải ảnh và tải hoặc chia sẻ thành phẩm. Giao diện lấy cảm hứng từ phong cách Y2K.

## Trạng thái dự án

**Phase 1 — Core MVP: Hoàn thành**

Luồng cốt lõi từ trang chủ đến ảnh thành phẩm đã hoạt động:

- Chọn bố cục ảnh 2-cut hoặc 4-cut.
- Chụp bằng camera với đếm ngược; có thể chụp lại từng ảnh hoặc chụp lại cả bộ.gg
- Chuyển sang mock mode để trải nghiệm khi camera không khả dụng hoặc không được cấp quyền.
- Trang trí dải ảnh với màu khung, filter và chữ ký tùy chỉnh.
- Xem trước, kết xuất ảnh PNG, tải xuống và chia sẻ qua tính năng chia sẻ của trình duyệt nếu được hỗ trợ.
- Bắt đầu phiên mới và xóa dữ liệu phiên hiện tại.
- Kiểm thử E2E cho luồng chọn 2-cut, chụp, chỉnh sửa, xuất/tải ảnh và bắt đầu lại.

## Lộ trình phát triển

### Phase 2 — Photo Booth Experience

Tập trung làm cho trải nghiệm chụp ảnh liền mạch, thú vị và gần với một photobooth thực tế:

- Tinh chỉnh giao diện và hướng dẫn trong lúc chụp: trạng thái camera, đếm ngược, hiệu ứng flash và phản hồi sau mỗi ảnh.
- Cải thiện trải nghiệm camera trên desktop và mobile, bao gồm đổi camera trước/sau khi thiết bị hỗ trợ.
- Làm thao tác chụp lại và quản lý từng khung ảnh trực quan hơn.
- Mở rộng lựa chọn bố cục, màu sắc và template; bảo đảm preview phản ánh chính xác ảnh xuất.
- Kiểm tra độ ổn định, khả năng truy cập và hiển thị trên nhiều kích thước màn hình.

### Phase 3 — Social / Advanced

Mở rộng từ trải nghiệm cá nhân sang chia sẻ và các tính năng nâng cao:

- Hoàn thiện trải nghiệm chia sẻ ảnh và tối ưu thành phẩm cho các nền tảng xã hội.
- Cân nhắc tạo QR hoặc liên kết chia sẻ để mở ảnh trên thiết bị khác.
- Bổ sung thư viện lưu/xem lại ảnh hoặc phiên chụp, với lựa chọn lưu trữ phù hợp.
- Khám phá thêm template, sticker, tùy chỉnh nâng cao và các tính năng cộng đồng.

Các mục trong Phase 2 và Phase 3 là mục tiêu dự kiến, chưa phải tính năng đã phát hành.

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

Chạy bài kiểm thử luồng photobooth:

```bash
npm run test:e2e
```

Test tự khởi động ứng dụng và sử dụng camera giả lập của Chromium; không cần webcam thật.

## Công nghệ

- Next.js 16, React 19 và TypeScript
- Tailwind CSS
- Zustand để quản lý trạng thái phiên chụp
- Playwright cho kiểm thử E2E
