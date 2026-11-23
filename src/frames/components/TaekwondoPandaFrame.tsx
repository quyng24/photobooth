import React from "react";
import type { FramePreviewProps, DrawCanvasOptions, FrameSlot } from "../types";
import { formatSignatureLabel } from "@/lib/formatSignatureLabel";
import { drawPhotoInSlot, PHOTO_BLEED } from "@/lib/drawPhotoInSlot";
import { SIGNATURE_FONTS } from "@/config/signature";

/**
 * 3 ô ảnh có kích thước HOÀN TOÀN BẰNG NHAU (Uniform 516 x 260 px)
 * Chiều rộng: 516px (lề trái và phải đều nhau 83px)
 * Chiều cao: 260px đồng đều 100% cho cả 3 ô
 * Khoảng cách giữa các ô: 15px đồng đều
 * Bo góc viền: 16px
 */
export const TAEKWONDO_PANDA_SLOTS: FrameSlot[] = [
  { x: 83, y: 136, width: 516, height: 260, borderRadius: 16 },
  { x: 83, y: 411, width: 516, height: 260, borderRadius: 16 },
  { x: 83, y: 686, width: 516, height: 260, borderRadius: 16 },
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
 * Taekwondo Panda Frame - Chuẩn HD 100% khớp nét vẽ gốc
 * Các ô ảnh kích thước đồng nhất, các chú gấu trúc võ thuật ôm viền sắc nét, 100% đặc không bị trong suốt
 */
export function TaekwondoPandaFrame({
  photos,
  filterClass = "",
  customText,
  signatureFont,
  signatureColor = "#181715",
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
      className={`relative w-full aspect-682/1024 rounded-2xl overflow-hidden select-none shadow-[8px_8px_0px_0px_#000] border-3 border-black bg-[#FEFDFB] ${className}`}
      style={{ backgroundColor: "#FEFDFB", containerType: "inline-size" }}
    >
      {/* 3 PHOTO SLOTS - KÍCH THƯỚC ĐỒNG NHẤT 100% (516 x 260) */}
      {TAEKWONDO_PANDA_SLOTS.map((slot, index) => {
        const photo = photos[index];
        const leftPercent = ((slot.x - PHOTO_BLEED) / 682) * 100;
        const topPercent = ((slot.y - PHOTO_BLEED) / 1024) * 100;
        const widthPercent = ((slot.width + PHOTO_BLEED * 2) / 682) * 100;
        const heightPercent = ((slot.height + PHOTO_BLEED * 2) / 1024) * 100;

        return (
          <div
            key={index}
            className="absolute overflow-hidden"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-900/40 font-mono text-xs font-black">
                <span>0{index + 1}</span>
                <span className="text-[9px] uppercase tracking-wider">
                  WAITING
                </span>
              </div>
            )}

            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] font-mono px-1 rounded z-6">
              0{index + 1}
            </span>
          </div>
        );
      })}

      {/* OVERLAY KHUNG TAEKWONDO PANDA CHẤT LƯỢNG CAO NHẤT */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/frames/taekwondo-panda.png"
        alt="Taekwondo Panda Frame HD"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
      />

      {/* CHỮ KÝ KỶ NIỆM (Đồng bộ 1:1 cả vị trí, cỡ chữ, font chữ và màu sắc với Canvas kết quả) */}
      {signatureLabel && (
        <div
          className="absolute z-20 pointer-events-none select-none uppercase"
          style={{
            right: "14.2%",
            top: "95.7%",
            transform: "translateY(-50%)",
            textAlign: "right",
            color: signatureColor,
            fontFamily,
            fontSize: `calc(${signatureSize} * 100cqi / 682)`,
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
 * Hàm vẽ Canvas xuất file PNG chất lượng cao chuẩn HD (1364 x 2048)
 */
export async function drawTaekwondoPandaCanvas(
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

  // Xuất ở độ phân giải siêu nét HD 1364 x 2048 (Scale 2x)
  canvas.width = 1364;
  canvas.height = 2048;
  const scale = 2;

  ctx.save();
  ctx.scale(scale, scale);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 1. Vẽ nền kem sáng
  ctx.fillStyle = "#FEFDFB";
  ctx.fillRect(0, 0, 682, 1024);

  // 2. Vẽ 3 bức ảnh vào 3 ô có kích thước đồng nhất
  const loadedPhotos = await Promise.all(
    photos.slice(0, 3).map((src) => loadImage(src).catch(() => null)),
  );

  for (let i = 0; i < TAEKWONDO_PANDA_SLOTS.length; i++) {
    const slot = TAEKWONDO_PANDA_SLOTS[i];
    const img = loadedPhotos[i];

    if (!img) continue;

    // Vẽ ảnh tràn mép (bleed) dưới overlay: không clip/stroke nên mép luôn mịn, không lộ nền
    drawPhotoInSlot(ctx, img, slot, { filter, scale });
  }

  // 3. Phủ khung ảnh overlay Taekwondo Panda HD lên trên
  try {
    const overlay = await loadImage("/frames/taekwondo-panda@2x.png");
    ctx.drawImage(overlay, 0, 0, 682, 1024);
  } catch {
    const overlayFallback = await loadImage("/frames/taekwondo-panda.png");
    ctx.drawImage(overlayFallback, 0, 0, 682, 1024);
  }

  // 4. Vẽ Chữ ký kỷ niệm (Khớp 100% với Live Preview)
  if (customText) {
    const label = formatSignatureLabel(
      customText,
      sticker ?? null,
      stickerPosition,
    );
    ctx.fillStyle = signatureColor || "#181715";
    ctx.font = `900 ${signatureSize}px ${signatureFontFamily || "Arial, Helvetica, sans-serif"}`;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) {
      (ctx as unknown as { letterSpacing: string }).letterSpacing = "0.05em";
    }
    ctx.fillText(label, 585, 980);
  }

  ctx.restore();
}
