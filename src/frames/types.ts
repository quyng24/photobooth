import type React from "react";
import type { FilterStyle, SignatureFont, StickerId, StickerPosition } from "@/types";

export interface FrameSlot {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}

/**
 * QUY CHUẨN KÍCH THƯỚC ĐỒNG NHẤT CHO TẤT CẢ CÁC KHUNG PHOTOBOOTH (3-CUT)
 * 1. Khung (Frame): Width = 512px, Height = 1024px (Tỉ lệ 1:2 chuẩn Photostrip)
 * 2. Xuất HD 2x: Width = 1024px, Height = 2048px
 * 3. 3 Ô ảnh (Photo Slots): Đồng nhất 388 x 250px
 */
export const STANDARD_FRAME_WIDTH = 512;
export const STANDARD_FRAME_HEIGHT = 1024;
export const STANDARD_FRAME_ASPECT = "512 / 1024";

export const STANDARD_PHOTO_SLOTS: FrameSlot[] = [
  { x: 52, y: 135, width: 388, height: 250, borderRadius: 16 },
  { x: 52, y: 400, width: 388, height: 250, borderRadius: 16 },
  { x: 52, y: 665, width: 388, height: 250, borderRadius: 16 },
];

export interface FramePreviewProps {
  photos: string[];
  filterStyle?: FilterStyle;
  filterClass?: string;
  customText?: string;
  signatureFont?: SignatureFont;
  signatureColor?: string;
  signatureSize?: number;
  stickerId?: StickerId;
  sticker?: string | null;
  stickerPosition?: StickerPosition;
  className?: string;
  renderMode?: "code" | "image";
}

export interface DrawCanvasOptions {
  photos: string[];
  filter: string;
  customText: string;
  signatureColor: string;
  signatureFontFamily: string;
  signatureSize: number;
  sticker: string | null;
  stickerPosition: StickerPosition;
  renderMode?: "code" | "image";
}

export interface FrameTemplate {
  id: string;
  name: string;
  description: string;
  category: "cartoon" | "y2k" | "korean" | "minimal" | "retro" | string;
  cutCount: number;
  width: number;
  height: number;
  aspectRatio: string;
  slots: FrameSlot[];
  renderMode: "code" | "image";
  hasImageFallback?: boolean;
  overlayImage?: string;
  previewImage?: string;
  defaultCustomText?: string;
  theme: {
    bgPreview: string;
    textColor: string;
    textHexColor: string;
    accentColor: string;
    badgeText?: string;
  };
  signaturePosition?: {
    x: number;
    y: number;
    align?: "center" | "left" | "right";
  };
  Component: React.ComponentType<FramePreviewProps>;
  drawCanvas: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    options: DrawCanvasOptions
  ) => Promise<void>;
}
