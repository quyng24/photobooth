import type { StickerPosition } from "@/types";

export function formatSignatureLabel(
  customText: string,
  sticker: string | null,
  stickerPosition: StickerPosition,
): string {
  const signature = (customText || "Y2K_LIFE4CUT").toUpperCase();

  if (!sticker) return signature;

  if (stickerPosition === "before") return `${sticker} ${signature}`;
  if (stickerPosition === "after") return `${signature} ${sticker}`;
  return `${sticker} ${signature} ${sticker}`;
}
