export type CutMode = "2cut" | "4cut";

export type TimerOption = 3 | 5 | 10;

export type FrameStyle =
  | "y2k-pink"
  | "cyber-cyan"
  | "neon-yellow"
  | "retro-black";

export type FilterStyle = "none" | "vintage" | "bw" | "pop";

export type SignatureFont = "mono" | "sans" | "serif";

export type SignatureColor = "frame" | "pink" | "cyan" | "yellow" | "white";

export type StickerId = "none" | "sparkle" | "star" | "heart" | "flower";

export type StickerPosition = "before" | "after" | "both";

export interface FrameStickerConfig {
  emoji: string;
  x: number;
  y: number;
  fontSize: number;
}

export interface FrameConfig {
  id: FrameStyle;
  name: string;
  background: string;
  textColor: string;
  textHexColor: string;
  accentColor: string;
}

export interface FilterConfig {
  id: FilterStyle;
  name: string;
  className: string;
  filter: string;
}

export interface PhotoStoreState {
  cutMode: CutMode;
  photos: string[];

  frameStyle: FrameStyle;
  filterStyle: FilterStyle;
  customText: string;
  signatureFont: SignatureFont;
  signatureColor: SignatureColor;
  signatureSize: number;
  stickerId: StickerId;
  stickerPosition: StickerPosition;
  timer: TimerOption;

  finalImage: string | null;

  setCutMode: (mode: CutMode) => void;
  addPhoto: (photo: string) => void;
  replacePhoto: (index: number, photo: string) => void;
  removePhoto: (index: number) => void;

  setFrameStyle: (style: FrameStyle) => void;
  setFilterStyle: (style: FilterStyle) => void;
  setTimer: (timer: TimerOption) => void;
  setCustomText: (text: string) => void;
  setSignatureFont: (font: SignatureFont) => void;
  setSignatureColor: (color: SignatureColor) => void;
  setSignatureSize: (size: number) => void;
  setStickerId: (stickerId: StickerId) => void;
  setStickerPosition: (position: StickerPosition) => void;
  setFinalImage: (image: string | null) => void;

  clearPhotos: () => void;
  clearSession: () => void;
}

export interface RenderPhotoStripOptions {
  photos: string[];
  frameBg: string;
  filter: string;
  customText: string;
  signatureColor: string;
  signatureFontFamily: string;
  signatureSize: number;
  sticker: string | null;
  stickerPosition: StickerPosition;
}