import React from "react";
import type { FramePreviewProps, DrawCanvasOptions, FrameSlot } from "../types";
import { formatSignatureLabel } from "@/lib/formatSignatureLabel";
import { SIGNATURE_FONTS } from "@/config/signature";

/**
 * 3 ô ảnh có kích thước HOÀN TOÀN GIỐNG NHAU (Uniform 388 x 250 px)
 * Chiều rộng: 388px (thu hẹp cân đối, chừa chỗ cho Panda và Ice Bear)
 * Chiều cao: 250px
 * Bo góc viền: 16px
 */
export const WE_BARE_BEARS_SLOTS: FrameSlot[] = [
  { x: 52, y: 135, width: 388, height: 250, borderRadius: 16 },
  { x: 52, y: 400, width: 388, height: 250, borderRadius: 16 },
  { x: 52, y: 665, width: 388, height: 250, borderRadius: 16 },
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
 * We Bare Bears Frame - Chuẩn HD 100% khớp nét vẽ gốc
 * Các ô ảnh có kích thước đồng nhất, các chú gấu ôm viền tự nhiên, Ice Bear 100% opaque không bị trong suốt
 */
export function WeBareBearsFrame({
  photos,
  filterClass = "",
  customText,
  signatureFont,
  signatureColor = "#543018",
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
      className={`relative w-full aspect-1/2 rounded-2xl overflow-hidden select-none shadow-[8px_8px_0px_0px_#000] border-3 border-black bg-[#FFFDF8] ${className}`}
      style={{ backgroundColor: "#FFFDF8", containerType: "inline-size" }}
    >
      {/* 3 PHOTO SLOTS - KÍCH THƯỚC ĐỒNG NHẤT 100% (388 x 250) */}
      {WE_BARE_BEARS_SLOTS.map((slot, index) => {
        const photo = photos[index];
        const leftPercent = (slot.x / 512) * 100;
        const topPercent = (slot.y / 1024) * 100;
        const widthPercent = (slot.width / 512) * 100;
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
              borderRadius: "4%",
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-amber-900/40 font-mono text-xs font-black">
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

      {/* OVERLAY KHUNG WE BARE BEARS CHẤT LƯỢNG CAO NHẤT (Gấu trắng Ice Bear 100% đặc, nét vẽ chuẩn gốc) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/frames/we-bare-bears.png"
        alt="We Bare Bears Frame HD"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
      />

      {/* CHỮ KÝ KỶ NIỆM (Đồng bộ 1:1 cả vị trí, cỡ chữ, font chữ và màu sắc với Canvas kết quả) */}
      {signatureLabel && (
        <div
          className="absolute z-20 pointer-events-none select-none uppercase"
          style={{
            right: "8.2%",
            top: "96.7%",
            transform: "translateY(-50%)",
            textAlign: "right",
            color: signatureColor,
            fontFamily,
            fontSize: `calc(${signatureSize} * 100cqi / 512)`,
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
 * Hàm vẽ Canvas xuất file PNG chất lượng cao chuẩn HD (1024 x 2048)
 */
export async function drawWeBareBearsCanvas(
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

  // Xuất ở độ phân giải siêu nét HD 1024 x 2048 (Scale 2x)
  canvas.width = 1024;
  canvas.height = 2048;
  const scale = 2;

  ctx.save();
  ctx.scale(scale, scale);

  // 1. Vẽ nền kem ấm
  ctx.fillStyle = "#FFFDF8";
  ctx.fillRect(0, 0, 512, 1024);

  // 2. Vẽ 3 bức ảnh vào 3 ô có kích thước đồng nhất
  const loadedPhotos = await Promise.all(
    photos.slice(0, 3).map((src) => loadImage(src).catch(() => null))
  );

  for (let i = 0; i < WE_BARE_BEARS_SLOTS.length; i++) {
    const slot = WE_BARE_BEARS_SLOTS[i];
    const img = loadedPhotos[i];

    if (!img) continue;

    // Cắt ảnh chuẩn tỉ lệ khung (388 / 250)
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
    const r = slot.borderRadius || 16;
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(slot.x, slot.y, slot.width, slot.height, r);
    } else {
      ctx.rect(slot.x, slot.y, slot.width, slot.height);
    }
    ctx.clip();

    ctx.drawImage(img, sx, sy, sw, sh, slot.x, slot.y, slot.width, slot.height);
    ctx.restore();
  }

  // 3. Phủ khung ảnh overlay We Bare Bears HD lên trên
  try {
    const overlay = await loadImage("/frames/we-bare-bears@2x.png");
    ctx.drawImage(overlay, 0, 0, 512, 1024);
  } catch {
    const overlayFallback = await loadImage("/frames/we-bare-bears.png");
    ctx.drawImage(overlayFallback, 0, 0, 512, 1024);
  }

  // 4. Vẽ Chữ ký kỷ niệm (Khớp 100% với Live Preview)
  if (customText) {
    const label = formatSignatureLabel(customText, sticker ?? null, stickerPosition);
    ctx.fillStyle = signatureColor || "#543018";
    ctx.font = `900 ${signatureSize}px ${signatureFontFamily || "Arial, Helvetica, sans-serif"}`;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = "0.05em";
    }
    ctx.fillText(label, 470, 990);
  }

  ctx.restore();
}
