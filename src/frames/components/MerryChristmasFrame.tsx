import React from "react";
import type { FramePreviewProps, DrawCanvasOptions, FrameSlot } from "../types";
import { formatSignatureLabel } from "@/lib/formatSignatureLabel";
import { SIGNATURE_FONTS } from "@/config/signature";

/**
 * 3 ô ảnh Giáng Sinh có kích thước HOÀN TOÀN BẰNG NHAU (Uniform 272 x 247 px)
 * Chiều rộng: 272px (lề trái 150px, lề phải 149px cân đối 100%)
 * Chiều cao: 247px đồng đều 100% cho cả 3 ô
 * Khoảng cách giữa các ô đồng đều
 * Bo góc viền nhẹ: 2px
 */
export const MERRY_CHRISTMAS_SLOTS: FrameSlot[] = [
  { x: 150, y: 118, width: 272, height: 247, borderRadius: 2 },
  { x: 150, y: 396, width: 272, height: 247, borderRadius: 2 },
  { x: 150, y: 676, width: 272, height: 247, borderRadius: 2 },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Không thể load ảnh: ${src}`));
    img.src = src;
  });
}

/**
 * Merry Christmas Frame - Chuẩn HD 100% nét vẽ gốc Giáng Sinh
 * Các ô ảnh kích thước đồng nhất, các vật thể lễ hội (Mũ Noel, Vớ Giáng Sinh, Cây Thông, Hộp Quà)
 * nằm đè lên viền ảnh sắc nét, 100% đặc không bị trong suốt
 */
export function MerryChristmasFrame({
  photos,
  filterClass = "",
  customText,
  signatureFont,
  signatureColor = "#8e2a2b",
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
    : "Arial, Helvetica, sans-serif";

  return (
    <div
      className={`relative w-full aspect-[571/1024] rounded-2xl overflow-hidden select-none shadow-[8px_8px_0px_0px_#000] border-3 border-black bg-[#F7F1E1] ${className}`}
      style={{ backgroundColor: "#F7F1E1", containerType: "inline-size" }}
    >
      {/* 3 PHOTO SLOTS - KÍCH THƯỚC ĐỒNG NHẤT 100% (272 x 247) */}
      {MERRY_CHRISTMAS_SLOTS.map((slot, index) => {
        const photo = photos[index];
        const leftPercent = (slot.x / 571) * 100;
        const topPercent = (slot.y / 1024) * 100;
        const widthPercent = (slot.width / 571) * 100;
        const heightPercent = (slot.height / 1024) * 100;

        return (
          <div
            key={index}
            className="absolute overflow-hidden bg-zinc-200"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
              borderRadius: "1%",
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={`Snap ${index + 1}`}
                className={`w-full h-full object-cover ${filterClass}`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-900/40 font-mono text-xs font-black">
                <span>0{index + 1}</span>
                <span className="text-[9px] uppercase tracking-wider">WAITING</span>
              </div>
            )}
            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-mono px-1 rounded">
              0{index + 1}
            </span>
          </div>
        );
      })}

      {/* OVERLAY KHUNG MERRY CHRISTMAS CHẤT LƯỢNG CAO NHẤT */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/frames/merry-christmas.png"
        alt="Merry Christmas Frame HD"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
      />

      {/* CHỮ KÝ KỶ NIỆM (Đồng bộ 1:1 cả vị trí, cỡ chữ, font chữ và màu sắc với Canvas kết quả) */}
      {signatureLabel && (
        <div
          className="absolute z-20 pointer-events-none select-none uppercase"
          style={{
            left: "50%",
            top: "94.5%",
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

/**
 * Hàm vẽ Canvas xuất file PNG chất lượng cao chuẩn HD (1142 x 2048)
 */
export async function drawMerryChristmasCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  options: DrawCanvasOptions
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

  // Xuất ở độ phân giải siêu nét HD 1142 x 2048 (Scale 2x)
  canvas.width = 1142;
  canvas.height = 2048;
  const scale = 2;

  ctx.save();
  ctx.scale(scale, scale);

  // 1. Vẽ nền kem sáng vintage
  ctx.fillStyle = "#F7F1E1";
  ctx.fillRect(0, 0, 571, 1024);

  // 2. Vẽ 3 bức ảnh vào 3 ô có kích thước đồng nhất
  const loadedPhotos = await Promise.all(
    photos.slice(0, 3).map((src) => loadImage(src).catch(() => null))
  );

  for (let i = 0; i < MERRY_CHRISTMAS_SLOTS.length; i++) {
    const slot = MERRY_CHRISTMAS_SLOTS[i];
    const img = loadedPhotos[i];

    if (!img) continue;

    // Cắt ảnh chuẩn tỉ lệ khung (272 / 247)
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

    // Bo góc ảnh mượt mà
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
  }

  // 3. Phủ khung ảnh overlay Merry Christmas HD lên trên
  try {
    const overlay = await loadImage("/frames/merry-christmas@2x.png");
    ctx.drawImage(overlay, 0, 0, 571, 1024);
  } catch {
    const overlayFallback = await loadImage("/frames/merry-christmas.png");
    ctx.drawImage(overlayFallback, 0, 0, 571, 1024);
  }

  // 4. Vẽ Chữ ký kỷ niệm (Khớp 100% với Live Preview)
  if (customText) {
    const label = formatSignatureLabel(customText, sticker ?? null, stickerPosition);
    ctx.fillStyle = signatureColor || "#8e2a2b";
    ctx.font = `900 ${signatureSize}px ${signatureFontFamily || "Arial, Helvetica, sans-serif"}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = "0.05em";
    }
    ctx.fillText(label, 285.5, 968);
  }

  ctx.restore();
}
