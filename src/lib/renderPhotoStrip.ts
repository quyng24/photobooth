import type { RenderPhotoStripOptions } from "@/types";
import { getFrame, DEFAULT_FRAME_ID } from "@/frames/registry";

export async function renderPhotoStrip(
  options: RenderPhotoStripOptions & { renderMode?: "code" | "image" }
): Promise<string> {
  const {
    photos,
    frameId,
    frameBg,
    filter,
    customText,
    signatureColor,
    signatureFontFamily,
    signatureSize,
    sticker,
    stickerPosition,
    renderMode = "code",
  } = options;

  // Tìm frame template
  let targetFrameId = frameId;
  if (!targetFrameId && frameBg) {
    if (frameBg.includes("pink")) targetFrameId = "y2k-pink";
    else if (frameBg.includes("cyan")) targetFrameId = "cyber-cyan";
    else if (frameBg.includes("yellow")) targetFrameId = "neon-yellow";
    else if (frameBg.includes("zinc") || frameBg.includes("black")) targetFrameId = "retro-black";
  }

  const frame = getFrame(targetFrameId || DEFAULT_FRAME_ID);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không thể tạo Canvas context");

  // Gọi hàm vẽ Canvas riêng của từng frame
  await frame.drawCanvas(ctx, canvas, {
    photos,
    filter,
    customText,
    signatureColor,
    signatureFontFamily,
    signatureSize,
    sticker,
    stickerPosition,
    renderMode,
  });

  return canvas.toDataURL("image/png");
}
