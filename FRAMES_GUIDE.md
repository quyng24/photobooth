# HƯỚNG DẪN HỆ THỐNG FRAME ẢNH (IMAGE FRAMES ARCHITECTURE)

Dự án Photobooth sử dụng phương pháp **Frame Ảnh Gốc (Raster Overlay PNG)** để đảm bảo chất lượng đồ họa và nét vẽ nhân vật gốc đạt mức hoàn hảo 100%.

---

## 1. NGUYÊN LÝ HOẠT ĐỘNG CỦA FRAME ẢNH

Mỗi khung ảnh gồm:
1. **Một ảnh Overlay PNG trong suốt** (`public/frames/<id>.png`):
   - Các vùng ô ảnh được đục trong suốt (`alpha = 0`) để người dùng nhìn thấy ảnh chụp.
   - Các nhân vật hoạt hình, sticker, viền khung được giữ nguyên nét vẽ gốc 100% đặc (`alpha = 255`).
   - Các chi tiết nhân vật đè lên mép ô ảnh (như chân gấu, đai đen, mũ Noel) nằm bên trên layer ảnh chụp.
2. **Ảnh Overlay 2x xuất HD** (`public/frames/<id>@2x.png`):
   - Kích thước gấp đôi cho phép xuất file PNG Canvas sắc nét ở độ phân giải cao.
3. **Ảnh Preview JPG** (`public/frames/<id>.jpg`):
   - Hiển thị danh sách xem trước trong bộ chọn khung.

---

## 2. DANH SÁCH CÁC KHUNG HIỆN TẠI

### 1. We Bare Bears (`we-bare-bears`)
- **Tỉ lệ khung**: `512 × 1024` (Aspect ratio: `1:2`)
- **Xuất HD 2x**: `1024 × 2048`
- **3 Ô ảnh**: Đồng nhất `388 × 250 px`
  - Ô 1: `(x: 52, y: 135)`
  - Ô 2: `(x: 52, y: 400)`
  - Ô 3: `(x: 52, y: 665)`
- **Vị trí chữ ký**: `(x: 470, y: 990)`, căn phải

### 2. Taekwondo Panda (`taekwondo-panda`)
- **Tỉ lệ khung**: `682 × 1024` (Aspect ratio: `682 / 1024`)
- **Xuất HD 2x**: `1364 × 2048`
- **3 Ô ảnh**: Đồng nhất `516 × 260 px`
  - Ô 1: `(x: 83, y: 136)`
  - Ô 2: `(x: 83, y: 411)`
  - Ô 3: `(x: 83, y: 686)`
- **Vị trí chữ ký**: `(x: 585, y: 980)`, căn phải

### 3. Merry Christmas (`merry-christmas`)
- **Tỉ lệ khung**: `571 × 1024` (Aspect ratio: `571 / 1024`)
- **Xuất HD 2x**: `1142 × 2048`
- **3 Ô ảnh**: Đồng nhất `272 × 247 px`
  - Ô 1: `(x: 150, y: 118)`
  - Ô 2: `(x: 150, y: 396)`
  - Ô 3: `(x: 150, y: 676)`
- **Vị trí chữ ký**: `(x: 285.5, y: 968)`, căn giữa

### 4. Tết Cổ Truyền (`tet-holiday`)
- **Tỉ lệ khung**: `571 × 1024` (Aspect ratio: `571 / 1024`)
- **Xuất HD 2x**: `1142 × 2048`
- **3 Ô ảnh**: Khớp viền vàng truyền thống `272 px` chiều ngang
  - Ô 1: `(x: 150, y: 118, width: 272, height: 251)` (Cành đào đè góc trên phải)
  - Ô 2: `(x: 150, y: 396, width: 272, height: 253)` (Bao lì xì đè cạnh phải)
  - Ô 3: `(x: 150, y: 669, width: 272, height: 262)` (Bánh chưng đè góc dưới trái, Cành mai đè góc dưới phải)
- **Vị trí chữ ký**: `(x: 285.5, y: 984)`, căn giữa, màu đỏ cổ truyền `#B91C1C`
- **Đặc điểm**: Giữ 100% nét vẽ đặc (`alpha = 255`) cho các hoạ tiết cành đào, bao lì xì, bánh chưng, hoa mai, lồng đèn đỏ và dòng chữ "CHÚC MỪNG NĂM MỚI".

---

## 3. CÁCH THÊM FRAME ẢNH MỚI

Khi bạn có 1 ảnh mẫu khung photobooth mới:
1. Đặt 3 file ảnh vào `public/frames/`:
   - `public/frames/<id>.png`: Kích thước gốc với 3 ô ảnh đã đục trong suốt.
   - `public/frames/<id>@2x.png`: Kích thước gấp đôi (Scale 2x).
   - `public/frames/<id>.jpg`: Ảnh xem trước.
2. Tạo component tại `src/frames/components/<Name>Frame.tsx` sử dụng thẻ `<img src="/frames/<id>.png" />` phủ lên 3 ô ảnh.
3. Khai báo hàm `drawCanvas` tương ứng xuất ở độ phân giải 2x.
4. Đăng ký vào mảng `FRAME_TEMPLATES` tại `src/frames/registry.ts`.
