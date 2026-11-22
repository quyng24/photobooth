# 📸 Y2K Snapbooth — Korean Photobooth Web Application

Ứng dụng Photobooth chuẩn phong cách Hàn Quốc (Life 4-Cut / 3-Cut) chạy trực tiếp trên trình duyệt web, lấy cảm hứng từ phong cách thiết kế **Y2K Retro & Neobrutalism**. Người dùng có thể chụp ảnh bằng webcam, chọn các mẫu khung hoạt hình & lễ hội độc quyền, áp filter màu phim retro, viết chữ ký kỷ niệm và tải ảnh về máy ở độ phân giải **HD 2X siêu nét (2048px)**.

---

## ✨ Tính Năng Nổi Bật

- 📷 **Chụp Ảnh Live Webcam Thông Minh**:
  - Hỗ trợ webcam laptop và camera điện thoại (hỗ trợ đổi camera trước/sau).
  - Đếm ngược linh hoạt: **3 giây (Nhanh)**, **5 giây (Tiêu chuẩn)**, **10 giây (Tạo dáng kỹ)**.
  - Hiệu ứng đèn Flash và âm thanh đếm ngược chân thực.
  - Chế độ **Retake**: Cho phép chụp lại từng ô ảnh bất kỳ nếu chưa ưng ý mà không phải chụp lại từ đầu.
  - Chế độ **Mock Camera**: Tự động kích hoạt ảnh mẫu dự phòng khi trình duyệt không có camera hoặc người dùng chưa cấp quyền.

- 🎨 **Hệ Thống Khung Độc Quyền (Pure Image Overlay HD)**:
  - Sử dụng kiến trúc **Khung ảnh trong suốt độ phân giải cao** kết hợp với tọa độ slot chính xác, đảm bảo 100% nét vẽ và màu sắc nhân vật gốc:
    1. **🐻 We Bare Bears 3-cut** (`we-bare-bears`): Bộ ba Gấu Nâu, Gấu Trúc, Gấu Trắng đáng yêu (`512 × 1024`, xuất HD `1024 × 2048`).
    2. **🥋 Taekwondo Panda 3-cut** (`taekwondo-panda`): Khung võ thuật gấu trúc đai đen mạnh mẽ (`682 × 1024`, xuất HD `1364 × 2048`).
    3. **🎄 Merry Christmas 3-cut** (`merry-christmas`): Khung Giáng Sinh Vintage với mũ Noel, tất quà, cây thông (`571 × 1024`, xuất HD `1142 × 2048`).
    4. **🧧 Tết Cổ Truyền 2026 3-cut** (`tet-holiday`): Khung Tết Nguyên Đán với lồng đèn đỏ, cành đào, bao lì xì, bánh chưng xanh & hoa mai vàng (`571 × 1024`, xuất HD `1142 × 2048`).
  - Các chi tiết trang trí đè tự nhiên lên mép ảnh chụp, 100% đặc (`alpha = 255`), không bị mờ đục hay bóng ma (ghosting).

- 🎞️ **Bộ Lọc Phim Y2K Retro**:
  - **Normal**: Giữ màu sắc gốc tự nhiên.
  - **Y2K Film**: Màu phim ấm áp phong cách vintage những năm 2000.
  - **B&W Film**: Đen trắng tương phản cao cổ điển.
  - **Pop Punch**: Rực rỡ, sống động, tôn da.

- ✍️ **Chữ Ký Kỷ Niệm & Sticker**:
  - Tùy chỉnh nội dung chữ ký (ví dụ: ngày kỷ niệm, nickname, lời chúc).
  - Đa dạng font chữ: `Mono`, `Sans`, `Serif`.
  - Tùy chọn màu chữ ký theo màu chủ đạo của khung hoặc bảng màu neon Y2K.
  - Đính kèm sticker emoji (`✨`, `⭐`, `💖`, `🌸`) ở trước, sau hoặc cả 2 đầu chữ ký.
  - Live Preview đồng bộ 1:1 tuyệt đối với file Canvas PNG tải về.

- 💾 **Xuất & Tải Ảnh HD 2X**:
  - Vẽ trực tiếp bằng HTML5 Canvas ở độ phân giải gấp đôi (`Scale 2x`, chiều cao lên tới `2048px`).
  - Tải về tức thì dưới định dạng `.png` sắc nét, sẵn sàng in ấn hoặc đăng Story Instagram, Facebook, TikTok.
  - Tích hợp Web Share API để chia sẻ nhanh trên thiết bị di động.

- 🖥️ **Giao Diện Y2K Neobrutalism Tối Ưu Mọi Màn Hình**:
  - Thiết kế lại hoàn chỉnh cả trang chủ (`/`) và phòng chọn khung (`/setup`).
  - Cân xứng hoàn hảo trên cả màn hình Desktop lớn (1080p, 2K, 4K) lẫn Mobile/Tablet.
  - Tích hợp linh vật **Mèo Y2K (`HomeMascot`)** chuyển động mắt theo con trỏ chuột độc đáo.

---

## 🏗️ Cấu Trúc Dự Án

```text
photobooth/
├── public/
│   ├── frames/                  # Tài nguyên khung ảnh chất lượng cao
│   │   ├── we-bare-bears.png    # Overlay trong suốt chuẩn
│   │   ├── we-bare-bears@2x.png # Overlay xuất HD 2x
│   │   ├── we-bare-bears.jpg    # Thumbnail xem trước
│   │   ├── taekwondo-panda.*
│   │   ├── merry-christmas.*
│   │   └── tet-holiday.*
│   ├── images/                  # Ảnh mẫu (Sample photos cho mock & preview)
│   └── mascots/                 # Sprite linh vật mèo Y2K
├── src/
│   ├── app/
│   │   ├── page.tsx             # Trang chủ (Hero Showcase 3D, danh mục khung, tính năng)
│   │   ├── setup/page.tsx       # Phòng cài đặt (Chọn khung 2x2, hẹn giờ, preview live)
│   │   ├── capture/page.tsx     # Buồng chụp ảnh webcam (Countdown, flash, retake)
│   │   ├── edit/page.tsx        # Phòng chỉnh sửa (Filter, khung, chữ ký, sticker)
│   │   ├── result/page.tsx      # Trang kết quả (Tải ảnh HD, chia sẻ, chụp lại)
│   │   └── globals.css          # Tailwind CSS 4 & Y2K styles
│   ├── components/
│   │   └── y2k/                 # Các component phong cách Y2K
│   │       ├── Y2kShell.tsx     # Khung nền chấm bi & sticker nổi
│   │       ├── Y2kWindow.tsx    # Cửa sổ hệ điều hành retro
│   │       ├── Y2kMarquee.tsx   # Dải chữ chạy ngang
│   │       ├── Y2kSteps.tsx     # Thanh tiến trình bước
│   │       ├── HomeMascot.tsx   # Linh vật mèo tương tác chuột
│   │       └── FilmStripFooter.tsx
│   ├── config/
│   │   └── signature.ts         # Hằng số font chữ, màu sắc & sticker chữ ký
│   ├── frames/
│   │   ├── components/          # Component hiển thị & hàm vẽ Canvas từng khung
│   │   │   ├── WeBareBearsFrame.tsx
│   │   │   ├── TaekwondoPandaFrame.tsx
│   │   │   ├── MerryChristmasFrame.tsx
│   │   │   └── TetHolidayFrame.tsx
│   │   ├── registry.ts          # Danh bạ đăng ký khung toàn hệ thống
│   │   └── types.ts             # Định nghĩa kiểu dữ liệu Frame & Canvas
│   ├── lib/
│   │   ├── renderPhotoStrip.ts  # Điều phối xuất Canvas PNG
│   │   └── formatSignatureLabel.ts
│   ├── stores/
│   │   └── photoStore.ts        # Quản lý trạng thái phiên chụp (Zustand)
│   └── types/
│       └── index.ts             # Type definitions
├── FRAMES_GUIDE.md              # Sổ tay chi tiết về thông số kỹ thuật khung
└── README.md
```

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Core UI**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Camera Capture**: [React Webcam](https://www.npmjs.com/package/react-webcam)
- **Testing**: [Playwright](https://playwright.dev/) (End-to-End Testing)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Môi Trường
- **Node.js**: Phiên bản 18.18+ hoặc 20+ trở lên.
- **npm** (hoặc pnpm / yarn).

### Các Bước Thực Hiện

1. **Clone repository về máy**:
   ```bash
   git clone <repository-url>
   cd photobooth
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Chạy máy chủ phát triển (Development Mode)**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

4. **Kiểm tra kiểu dữ liệu & lint code**:
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

5. **Đóng gói dự án (Production Build)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🧪 Kiểm Thử E2E (Playwright)

Dự án đã thiết lập bộ kiểm thử tự động toàn diện mô phỏng luồng chụp ảnh Photobooth bằng camera giả lập của Chromium:

```bash
# Cài đặt browser binary cho Playwright (chỉ cần chạy lần đầu)
npx playwright install chromium

# Chạy toàn bộ test E2E
npm run test:e2e
```

Bộ test tự động kiểm tra:
- Khởi động app và điều hướng qua các bước.
- Chụp ảnh với webcam giả lập, đếm ngược và retake từng ô ảnh.
- Đổi khung ảnh, áp filter màu phim và thêm chữ ký kỷ niệm.
- Xuất file ảnh Canvas PNG và kiểm tra tải về.

---

## 🎨 Hướng Dẫn Thêm Khung Mới (Trong 3 Bước)

Hệ thống khung được thiết kế theo dạng **Plug & Play**. Khi bạn có 1 ảnh mẫu khung mới, chỉ cần:

1. **Chuẩn bị 3 file ảnh** và lưu vào `public/frames/`:
   - `public/frames/<id>.png`: Ảnh overlay trong suốt ở các ô chụp.
   - `public/frames/<id>@2x.png`: Ảnh overlay nhân đôi kích thước (xuất HD).
   - `public/frames/<id>.jpg`: Ảnh preview hiển thị trong danh mục chọn.
2. **Tạo component khung** tại `src/frames/components/<Name>Frame.tsx`:
   - Khai báo tọa độ các ô ảnh chụp (`slots`).
   - Tạo component JSX và hàm `draw<Name>Canvas`.
3. **Đăng ký vào danh bạ**: Thêm 1 object vào mảng `FRAME_TEMPLATES` trong [src/frames/registry.ts](file:///Users/macbookpro/Desktop/FRONTEND/NEXTJS/photobooth/src/frames/registry.ts).

👉 *Xem chi tiết tọa độ và hướng dẫn chi tiết tại [FRAMES_GUIDE.md](file:///Users/macbookpro/Desktop/FRONTEND/NEXTJS/photobooth/FRAMES_GUIDE.md).*

---

## 📄 Bản Quyền & Giấy Phép

Dự án được xây dựng phục vụ mục đích học tập, sáng tạo và giải trí phong cách Y2K Retro Photobooth.
Toàn bộ mã nguồn phát hành theo giấy phép MIT.
