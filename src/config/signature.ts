import type { SignatureFont, SignatureColor, StickerId } from "@/types";

export const SIGNATURE_FONTS: Record<
  SignatureFont,
  { name: string; family: string }
> = {
  mono: { name: "Mono", family: '"Courier New", monospace' },
  sans: { name: "Sans", family: "Arial, Helvetica, sans-serif" },
  serif: { name: "Serif", family: "Georgia, serif" },
};

export const SIGNATURE_COLORS: Record<
  SignatureColor,
  { name: string; hex: string | null }
> = {
  frame: { name: "Theo frame", hex: null },
  pink: { name: "Hồng", hex: "#831843" },
  cyan: { name: "Cyan", hex: "#083344" },
  yellow: { name: "Vàng", hex: "#713f12" },
  white: { name: "Trắng", hex: "#ffffff" },
};

export const SIGNATURE_STICKERS: Record<
  StickerId,
  { name: string; emoji: string | null }
> = {
  none: { name: "Không dùng", emoji: null },
  sparkle: { name: "Lấp lánh", emoji: "✨" },
  star: { name: "Ngôi sao", emoji: "⭐" },
  heart: { name: "Trái tim", emoji: "💖" },
  flower: { name: "Bông hoa", emoji: "🌸" },
};

export const FRAME_STICKERS = [
  { emoji: "✨", x: 80, y: 75, fontSize: 36 },
  { emoji: "💖", x: 720, y: 75, fontSize: 36 },
] as const;
