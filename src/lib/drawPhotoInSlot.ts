import type { FrameSlot } from "@/frames/types";

/** Phần ảnh vẽ tràn ra ngoài ô (đơn vị px logic) để overlay che mép, không lộ nền. */
export const PHOTO_BLEED = 3;

function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

/**
 * Thu nhỏ ảnh chất lượng cao: giảm dần từng bước 1/2 rồi mới về đúng kích thước đích,
 * tránh răng cưa khi nguồn lớn hơn đích nhiều lần.
 */
function resizeHighQuality(
  src: CanvasImageSource,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dw: number,
  dh: number,
  filter: string
): HTMLCanvasElement {
  let cur: CanvasImageSource = src;
  let cx = sx;
  let cy = sy;
  let cw = sw;
  let ch = sh;

  while (cw / 2 > dw && ch / 2 > dh) {
    const w = Math.max(dw, Math.round(cw / 2));
    const h = Math.max(dh, Math.round(ch / 2));
    const step = makeCanvas(w, h);
    const g = step.getContext("2d");
    if (!g) break;
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = "high";
    g.drawImage(cur, cx, cy, cw, ch, 0, 0, step.width, step.height);
    cur = step;
    cx = 0;
    cy = 0;
    cw = step.width;
    ch = step.height;
  }

  const out = makeCanvas(dw, dh);
  const g = out.getContext("2d");
  if (!g) return out;
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  // Áp filter trên canvas phụ (vùng chữ nhật đầy đủ) để không bị quầng sáng ở mép clip.
  if (filter && filter !== "none") g.filter = filter;
  g.drawImage(cur, cx, cy, cw, ch, 0, 0, out.width, out.height);
  return out;
}

/**
 * Vẽ ảnh vào ô theo kiểu "cover", tràn ra ngoài ô `bleed` px để overlay khung che mép.
 * Không dùng clip()/stroke() nên không còn mép răng cưa, viền trắng hay lẹm mép.
 *
 * @param scale Hệ số phóng của ctx (ví dụ 2 khi xuất HD 2x) để canvas phụ khớp đúng pixel thật.
 */
export function drawPhotoInSlot(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource & { width: number; height: number },
  slot: Pick<FrameSlot, "x" | "y" | "width" | "height">,
  options: { filter?: string; scale?: number; bleed?: number } = {}
) {
  const { filter = "none", scale = 2, bleed = PHOTO_BLEED } = options;

  const dx = slot.x - bleed;
  const dy = slot.y - bleed;
  const dw = slot.width + bleed * 2;
  const dh = slot.height + bleed * 2;

  // Cắt "cover" theo tỉ lệ vùng đích, làm tròn để không mờ mép do toạ độ lẻ
  const targetRatio = dw / dh;
  const imageRatio = img.width / img.height;
  let sw = img.width;
  let sh = img.height;
  if (imageRatio > targetRatio) {
    sw = img.height * targetRatio;
  } else {
    sh = img.width / targetRatio;
  }
  sw = Math.round(sw);
  sh = Math.round(sh);
  const sx = Math.floor((img.width - sw) / 2);
  const sy = Math.floor((img.height - sh) / 2);

  const resized = resizeHighQuality(
    img,
    sx,
    sy,
    sw,
    sh,
    dw * scale,
    dh * scale,
    filter
  );

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(resized, dx, dy, dw, dh);
  ctx.restore();
}
