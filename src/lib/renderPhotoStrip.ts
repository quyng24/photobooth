export interface RenderPhotoStripOptions {
  photos: string[];
  frameBg: string;
  filter: string;
  customText: string;
}

const FRAME_COLORS: Record<string, string> = {
  "bg-pink-300": "#f9a8d4",
  "bg-cyan-300": "#67e8f9",
  "bg-yellow-300": "#fde047",
  "bg-zinc-900": "#18181b",
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Không thể load ảnh: ${src}`));
    img.src = src;
  });
}

export async function renderPhotoStrip({
  photos,
  frameBg,
  filter,
  customText,
}: RenderPhotoStripOptions): Promise<string> {
  const FRAME_WIDTH = 800;
  const PHOTO_WIDTH = 720;
  const PHOTO_HEIGHT = 540;

  const PADDING = 40;
  const PHOTO_GAP = 24;
  const HEADER_HEIGHT = 70;
  const FOOTER_HEIGHT = 80;

  const canvas = document.createElement("canvas");
  canvas.width = FRAME_WIDTH;
  canvas.height =
    PADDING * 2 +
    HEADER_HEIGHT +
    photos.length * PHOTO_HEIGHT +
    (photos.length - 1) * PHOTO_GAP +
    FOOTER_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không thể tạo Canvas context");

  ctx.fillStyle = FRAME_COLORS[frameBg] ?? "#f9a8d4";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // =========================
  // Header
  // =========================
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 24px Arial";
  ctx.fillText("★ Y2K SNAP ★", FRAME_WIDTH / 2, PADDING + 30);
  // Header dashed line
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  ctx.moveTo(PADDING, PADDING + HEADER_HEIGHT);
  ctx.lineTo(FRAME_WIDTH - PADDING, PADDING + HEADER_HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);
  // =========================
  // Photos
  // =========================
  const images = await Promise.all(photos.map(loadImage));
  let currentY = PADDING + HEADER_HEIGHT + 20;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const x = (FRAME_WIDTH - PHOTO_WIDTH) / 2;
    // Border
    ctx.fillStyle = "#000000";
    ctx.fillRect(x - 4, currentY - 4, PHOTO_WIDTH + 8, PHOTO_HEIGHT + 8);
    // Photo background
    ctx.fillStyle = "#e4e4e7";
    ctx.fillRect(x, currentY, PHOTO_WIDTH, PHOTO_HEIGHT);
    // Apply filter
    ctx.save();
    ctx.filter = filter || "none";
    // Crop image to fill 4:3 area
    const imageRatio = img.width / img.height;
    const targetRatio = PHOTO_WIDTH / PHOTO_HEIGHT;
    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = img.width;
    let sourceHeight = img.height;
    if (imageRatio > targetRatio) {
      // Image is wider
      sourceWidth = img.height * targetRatio;
      sourceX = (img.width - sourceWidth) / 2;
    } else {
      // Image is taller
      sourceHeight = img.width / targetRatio;
      sourceY = (img.height - sourceHeight) / 2;
    }
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x,
      currentY,
      PHOTO_WIDTH,
      PHOTO_HEIGHT,
    );
    ctx.restore();
    // Photo number
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(x + PHOTO_WIDTH - 45, currentY + PHOTO_HEIGHT - 28, 35, 22);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText(
      `0${i + 1}`,
      x + PHOTO_WIDTH - 27,
      currentY + PHOTO_HEIGHT - 17,
    );
    currentY += PHOTO_HEIGHT + PHOTO_GAP;
  }
  // =========================
  // Footer
  // =========================
  const footerY = canvas.height - PADDING - 35;
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  ctx.moveTo(PADDING, footerY - 25);
  ctx.lineTo(FRAME_WIDTH - PADDING, footerY - 25);
  ctx.stroke();
  ctx.setLineDash([]);
  // Footer text color
  const textColorMap: Record<string, string> = {
    "bg-pink-300": "#831843",
    "bg-cyan-300": "#083344",
    "bg-yellow-300": "#713f12",
    "bg-zinc-900": "#f472b6",
  };
  ctx.fillStyle = textColorMap[frameBg] ?? "#831843";
  ctx.font = "900 24px monospace";
  ctx.textAlign = "center";
  ctx.fillText(customText || "Y2K_LIFE4CUT", FRAME_WIDTH / 2, footerY + 10);
  // =========================
  // Export PNG
  // =========================
  return canvas.toDataURL("image/png");
}
