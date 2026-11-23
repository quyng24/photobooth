# HƯỚNG DẪN TẠO VÀ TỐI ƯU FRAME TỪ ẢNH (IMAGE-BASED FRAME CREATION GUIDE)

> **Tài liệu chuẩn kỹ thuật**: Hướng dẫn quy trình tạo khung Photobooth từ ảnh thiết kế/minh họa nghệ thuật đạt chuẩn HD sắc nét, khử triệt để 100% hiện tượng xước viền, lẹm mép mà vẫn giữ trọn vẹn nét vẽ gốc của vật thể (bánh chưng, cành đào, bao lì xì, nhân vật hoạt hình).

---

## 1. BỐI CẢNH & PHÂN TÍCH VẤN ĐỀ

### 1.1. Hiện tượng "Xước viền" & "Lẹm mép" là gì?

Khi tạo khung photobooth có các ô ảnh đục lỗ từ một file ảnh gốc (PNG raster):

1. **Quá trình cắt ảnh thủ công**: Khi dùng Photoshop (Eraser, Magic Wand, Polygonal Lasso, Layer Masking) để đục thủng 3 ô chữ nhật cho ảnh chụp lọt vào, các pixel tại mép cắt luôn xuất hiện hiện tượng **Anti-aliasing / Feathering** (các điểm ảnh bán trong suốt mờ ảo).
2. **Khi ghép ảnh chụp vào**: Ảnh người dùng nằm ở lớp dưới, mép ô cắt ở lớp trên. Sự chênh lệch và các pixel bán trong suốt này tạo ra các quầng trắng, vệt răng cưa lem nhem hoặc các đường xước mờ mắt thường nhìn thấy rất rõ.
3. **Màu nền lộ thiên**: Nếu container ô ảnh để màu mặc định như `bg-zinc-200`, bất kỳ sự xê dịch $0.5\text{px}$ nào cũng làm lộ một đường chỉ xám nham nhở xung quanh ảnh.

### 1.2. Tại sao KHÔNG NÊN vẽ lại các vật thể bằng SVG thuần túy?

- Các vật thể lễ hội như **Bánh chưng** (vân lá dong, nếp gấp lạt tre), **Cành hoa đào/hoa mai** (độ loang phớt hồng, bóng cành gỗ), **Bao lì xì** (nhũ vàng, hoa văn chìm), hay **Nhân vật hoạt hình**: đều là các tác phẩm hội họa kỹ thuật số (Digital Illustration) có chiều sâu, cọ vẽ mềm và chuyển sắc tinh tế.
- Nếu cố gắng vẽ lại bằng code SVG (`<path>`, `<polygon>`):
  - Hình vẽ sẽ bị cứng đơ, biến thành các khối hình học thô kệch kiểu hoạt hình rẻ tiền (clipart).
  - Mất hoàn toàn cái "hồn", tính thẩm mỹ và không khí lễ hội truyền thống.
  - Tốn rất nhiều công sức mà chất lượng đồ họa lại bị giảm sút trầm trọng.

---

## 2. GIẢI PHÁP ĐÃ TRIỂN KHAI TRONG DỰ ÁN

Thay vì vẽ lại vật thể, dự án áp dụng **Bộ 3 Kỹ Thuật Khóa Mép Vector Đỉnh Cao (Triple Edge-Locking Techniques)**:

```
┌─────────────────────────────────────────────────────────────┐
│ LỚP 3 (TRÊN CÙNG): Ảnh Overlay Frame PNG (Overlay Image)     │
│       - Giữ 100% nét cọ, bóng đổ gốc của Bánh chưng, Hoa... │
│       - Đè tự nhiên lên các góc ô ảnh                       │
├─────────────────────────────────────────────────────────────┤
│ LỚP 2 (VIỀN KHÓA MÉP): Precision Vector Inner Bezel Stroke  │
│       - Đường viền vector toán học (1.5px - 2px) sắc như dao│
│       - Đè lên đúng mép cắt, triệt tiêu 100% vết xước/lẹm   │
├─────────────────────────────────────────────────────────────┤
│ LỚP 1 (LÓT DƯỚI): Ảnh người dùng chụp (User Photos)         │
│       - Được clip chuẩn xác theo tọa độ slot                │
│       - Nền đệm bịt kín (Background Sealing) trùng màu giấy │
└─────────────────────────────────────────────────────────────┘
```

### 2.1. Kỹ thuật 1: Viền Khóa Mép Vector (Precision Inner Bezel Stroke)

- Ngay tại chu vi của từng ô ảnh, một đường viền vector toán học siêu nét được vẽ đè lên:
  - **Tết Cổ Truyền (`TetHolidayFrame`)**: Viền màu vàng kim hoàng gia `#D4AF37` sang trọng kết hợp bóng chìm đỏ `#B91C1C` (borderRadius: 2px).
  - **Merry Christmas (`MerryChristmasFrame`)**: Viền màu đỏ rượu vang Giáng Sinh `#8E2A2B` cổ điển kết hợp viền thông `#2D5A27` (borderRadius: 2px).
  - **We Bare Bears (`WeBareBearsFrame`)**: Viền hoạt họa comic màu nâu gấu Grizzly `#543018` ấm áp (borderRadius: 16px).
  - **Taekwondo Panda (`TaekwondoPandaFrame`)**: Viền hoạt họa comic màu đen võ thuật `#181715` mạnh mẽ (borderRadius: 16px).
- **Hiệu quả**: Đường viền này "khóa" mép ảnh chụp lại, biến nhược điểm cắt thô thành một **đường viền tranh kim loại sang trọng hoặc viền comic sắc sảo**, che lấp toàn bộ các pixel xước mờ và răng cưa.

### 2.2. Kỹ thuật 2: Bịt Kín Màu Nền (Background Color Sealing)

- Thay thế màu nền mặc định `bg-zinc-200` (xám) bằng chính mã màu của nền khung:
  - Tết Cổ Truyền: `#FDF6E2` (Kem ấm truyền thống).
  - Giáng Sinh: `#F7F1E1` (Kem sáng Vintage).
  - We Bare Bears: `#FFFDF8` (Kem ấm hoạt hình).
  - Taekwondo Panda: `#FEFDFB` (Kem sáng võ đường).
- Khi khung được co giãn trên nhiều tỉ lệ màn hình, không bao giờ xuất hiện khe hở màu xám lạc quẻ.

### 2.3. Kỹ thuật 3: Đồng Bộ Tuyệt Đối 1:1 Giữa DOM Live Preview & Canvas Export 2x

- **Trên Live Preview (React DOM)**: Dùng lớp viền `border-[1.5px]` kết hợp `shadow-[inset_0_0_0_1px_...]` ôm sát ô ảnh.
- **Trên Canvas Xuất File HD (Scale 2x)**: Sử dụng lệnh `ctx.strokeRect` / `ctx.roundRect` với nét vẽ chuẩn xác sau khi vẽ ảnh, trước khi phủ lớp overlay.

---

## 3. QUY TRÌNH 5 BƯỚC TẠO FRAME MỚI TỪ ẢNH BẤT KỲ (A-Z)

Khi bạn có 1 ảnh khung photobooth mới từ designer hoặc tải từ trên mạng về, hãy thực hiện theo đúng 5 bước sau:

### BƯỚC 1: Chuẩn bị tài nguyên ảnh (Asset Preparation)

1. Mở file ảnh khung trong Photoshop/Figma.
2. Chuẩn hóa kích thước khung theo chiều cao chuẩn `1024px` (ví dụ: `571 × 1024`, `682 × 1024`, hoặc `512 × 1024`).
3. Đục 3 ô chữ nhật cho ảnh bằng công cụ **Vector Shape / Marquee Tool với Feather = 0px** (tuyệt đối không dùng Feather để tránh viền mờ).
4. Xuất 3 file vào thư mục `public/frames/`:
   - `<frame-id>.png`: Kích thước chuẩn 1x (ví dụ: $571 \times 1024$).
   - `<frame-id>@2x.png`: Kích thước gấp đôi siêu nét 2x (ví dụ: $1142 \times 2048$).
   - `<frame-id>.jpg`: Ảnh bìa xem trước (Preview Thumbnail) cho trang chọn khung.

---

### BƯỚC 2: Đo đạc tọa độ Slots chuẩn xác

Ghi lại chính xác tọa độ của từng ô ảnh trên bản vẽ gốc 1x:

```ts
// Tọa độ tính bằng Pixel trên khung chuẩn 1x
export const MY_FRAME_SLOTS: FrameSlot[] = [
  { x: 150, y: 118, width: 272, height: 250, borderRadius: 4 },
  { x: 150, y: 396, width: 272, height: 250, borderRadius: 4 },
  { x: 150, y: 674, width: 272, height: 250, borderRadius: 4 },
];
```

---

### BƯỚC 3: Tạo Component React Preview (`src/frames/components/<Name>Frame.tsx`)

Áp dụng đầy đủ:

- Tỉ lệ `aspect-[width/height]` với `containerType: "inline-size"`.
- Bịt kín màu nền ô ảnh khớp màu giấy.
- Bổ sung **Lớp Viền Khóa Mép Khử Xước**:

```tsx
import React from "react";
import type { FramePreviewProps, FrameSlot } from "../types";
import { formatSignatureLabel } from "@/lib/formatSignatureLabel";
import { SIGNATURE_FONTS } from "@/config/signature";

export const MY_FRAME_SLOTS: FrameSlot[] = [
  { x: 150, y: 118, width: 272, height: 250, borderRadius: 4 },
  { x: 150, y: 396, width: 272, height: 250, borderRadius: 4 },
  { x: 150, y: 674, width: 272, height: 250, borderRadius: 4 },
];

export function MyFrame({
  photos,
  filterClass = "",
  customText,
  signatureFont,
  signatureColor = "#D4AF37",
  signatureSize = 24,
  sticker,
  stickerPosition = "before",
  className = "",
}: FramePreviewProps) {
  const signatureLabel = customText
    ? formatSignatureLabel(customText, sticker ?? null, stickerPosition)
    : "";
  const fontFamily = signatureFont
    ? SIGNATURE_FONTS[signatureFont]?.family
    : "Arial, sans-serif";

  return (
    <div
      className={`relative w-full aspect-571/1024 rounded-2xl overflow-hidden select-none shadow-[8px_8px_0px_0px_#000] border-3 border-black bg-[#FDF6E2] ${className}`}
      style={{ backgroundColor: "#FDF6E2", containerType: "inline-size" }}
    >
      {/* 3 PHOTO SLOTS */}
      {MY_FRAME_SLOTS.map((slot, index) => {
        const photo = photos[index];
        const leftPercent = (slot.x / 571) * 100;
        const topPercent = (slot.y / 1024) * 100;
        const widthPercent = (slot.width / 571) * 100;
        const heightPercent = (slot.height / 1024) * 100;

        return (
          <div
            key={index}
            className="absolute overflow-hidden bg-[#FDF6E2]"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
              borderRadius: "1.5%",
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt={`Snap ${index + 1}`}
                className={`w-full h-full object-cover ${filterClass}`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-amber-900/40 font-mono text-xs font-black">
                <span>0{index + 1}</span>
                <span className="text-[9px] uppercase tracking-wider">
                  WAITING
                </span>
              </div>
            )}

            {/* VIỀN KHÓA MÉP SẮC NÉT (Khử 100% vết xước viền do cắt ảnh) */}
            <div className="absolute inset-0 pointer-events-none border-[1.5px] border-[#D4AF37]/90 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] rounded-[inherit] z-5" />

            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1 rounded z-6">
              0{index + 1}
            </span>
          </div>
        );
      })}

      {/* OVERLAY KHUNG CHẤT LƯỢNG CAO NHẤT */}
      <img
        src="/frames/my-frame.png"
        alt="My Frame Overlay"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
      />

      {/* CHỮ KÝ KỶ NIỆM (Responsive bằng 100cqi) */}
      {signatureLabel && (
        <div
          className="absolute z-20 pointer-events-none select-none uppercase"
          style={{
            left: "50%",
            top: "96%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: signatureColor,
            fontFamily,
            fontSize: `calc(${signatureSize} * 100cqi / 571)`,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {signatureLabel}
        </div>
      )}
    </div>
  );
}
```

---

### BƯỚC 4: Viết Hàm Canvas HD Xuất Ảnh Siêu Nét (`drawCanvas`)

Trong cùng file component, viết hàm `draw<Name>Canvas`:

- Scale 2x độ nét cao.
- Khóa mép ảnh bằng `ctx.strokeRect` / `ctx.roundRect` màu viền vector:

```ts
export async function drawMyFrameCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options: DrawCanvasOptions,
) {
  const {
    photos,
    filter,
    customText,
    signatureColor,
    signatureFontFamily,
    signatureSize,
    sticker,
    stickerPosition,
  } = options;

  // 1. Cài đặt Canvas xuất 2x HD
  canvas.width = 1142;
  canvas.height = 2048;
  const scale = 2;

  ctx.save();
  ctx.scale(scale, scale);

  // 2. Vẽ màu nền giấy
  ctx.fillStyle = "#FDF6E2";
  ctx.fillRect(0, 0, 571, 1024);

  // 3. Tải và vẽ 3 bức ảnh người chụp
  const loadedPhotos = await Promise.all(
    photos.slice(0, 3).map((src) => loadImage(src).catch(() => null)),
  );

  for (let i = 0; i < MY_FRAME_SLOTS.length; i++) {
    const slot = MY_FRAME_SLOTS[i];
    const img = loadedPhotos[i];
    if (!img) continue;

    const imageRatio = img.width / img.height;
    const targetRatio = slot.width / slot.height;
    let sx = 0,
      sy = 0,
      sw = img.width,
      sh = img.height;

    if (imageRatio > targetRatio) {
      sw = img.height * targetRatio;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / targetRatio;
      sy = (img.height - sh) / 2;
    }

    ctx.save();
    ctx.filter = filter || "none";

    // Bo góc ảnh
    ctx.beginPath();
    const r = slot.borderRadius || 2;
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(slot.x, slot.y, slot.width, slot.height, r);
    } else {
      ctx.rect(slot.x, slot.y, slot.width, slot.height);
    }
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, slot.x, slot.y, slot.width, slot.height);
    ctx.restore();

    // VIỀN VECTOR KHÓA MÉP TRÊN CANVAS (Khử 100% vết xước cắt ảnh)
    ctx.save();
    ctx.strokeStyle = "#D4AF37"; // Màu viền vàng kim
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(slot.x, slot.y, slot.width, slot.height, r);
    } else {
      ctx.rect(slot.x, slot.y, slot.width, slot.height);
    }
    ctx.stroke();
    ctx.restore();
  }

  // 4. Phủ lớp Overlay HD 2x
  try {
    const overlay = await loadImage("/frames/my-frame@2x.png");
    ctx.drawImage(overlay, 0, 0, 571, 1024);
  } catch {
    const overlayFallback = await loadImage("/frames/my-frame.png");
    ctx.drawImage(overlayFallback, 0, 0, 571, 1024);
  }

  // 5. Vẽ Chữ ký kỷ niệm đồng bộ 100% với Preview
  if (customText) {
    const label = formatSignatureLabel(
      customText,
      sticker ?? null,
      stickerPosition,
    );
    ctx.fillStyle = signatureColor || "#D4AF37";
    ctx.font = `900 ${signatureSize}px ${signatureFontFamily || "Arial, sans-serif"}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = "0.05em";
    }
    ctx.fillText(label, 285.5, 984);
  }

  ctx.restore();
}
```

---

### BƯỚC 5: Đăng ký Frame vào `src/frames/registry.ts`

Thêm định nghĩa khung vào mảng `FRAME_TEMPLATES`:

```ts
{
  id: "my-frame",
  name: "My Frame Title",
  description: "Mô tả ngắn gọn về khung",
  category: "holiday",
  cutCount: 3,
  width: 571,
  height: 1024,
  aspectRatio: "571 / 1024",
  slots: MY_FRAME_SLOTS,
  renderMode: "image",
  hasImageFallback: false,
  overlayImage: "/frames/my-frame.png",
  previewImage: "/frames/my-frame.jpg",
  defaultCustomText: "MY_FRAME_SNAP",
  theme: {
    bgPreview: "bg-[#FDF6E2]",
    textColor: "text-[#B91C1C]",
    textHexColor: "#B91C1C",
    accentColor: "#D4AF37",
    badgeText: "3 Ô • ĐẶC BIỆT",
  },
  signaturePosition: {
    x: 285.5,
    y: 984,
    align: "center",
  },
  Component: MyFrame,
  drawCanvas: drawMyFrameCanvas,
}
```

---

## 4. BẢNG CHECKLIST KIỂM ĐỊNH CHẤT LƯỢNG (QA CHECKLIST)

Trước khi đưa khung ảnh mới vào sử dụng, hãy kiểm tra 5 tiêu chí sau:

- [x] **Không có quầng xám/trắng ở mép**: Khi ảnh chụp hiển thị, mép ô ảnh tiếp giáp với khung liền mạch, phẳng phiu.
- [x] **Vật thể đè tự nhiên**: Cành hoa, bánh chưng, nơ trang trí đè lên trên viền ảnh một cách tự nhiên, sắc nét.
- [x] **Độ phân giải xuất file nét 2x**: Tải file PNG về và phóng to 200%, đường viền và chữ ký vẫn mịn màng, không bị vỡ hạt.
- [x] **Đồng bộ Live Preview & Canvas**: Vị trí chữ ký, màu sắc và cỡ chữ khi xem trước ở bước Edit khớp 100% với ảnh PNG tải về.
- [x] **Responsive mượt mà**: Khung co giãn tốt trên cả màn hình điện thoại iPhone/Android và máy tính để bàn.
