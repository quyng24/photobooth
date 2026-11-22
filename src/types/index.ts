export type CutMode = "2cut" | "3cut" | "4cut" | string;

export type TimerOption = 3 | 5 | 10;

export type FrameStyle = "we-bare-bears" | "taekwondo-panda" | "merry-christmas" | "tet-holiday" | (string & {});

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

export interface FrameSlot {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}

export interface FrameSignaturePosition {
  x: number;
  y: number;
  align?: "center" | "left" | "right";
}

export interface FrameTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  cutCount: number;
  width: number;
  height: number;
  slots: FrameSlot[];
  overlayImage: string;
  previewImage?: string;
  background?: string;
  backgroundHex?: string;
  textColor?: string;
  textHexColor?: string;
  accentColor?: string;
  signaturePosition?: FrameSignaturePosition;
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
  frameId?: string;
  frameTemplate?: FrameTemplate;
  frameBg?: string;
  filter: string;
  customText: string;
  signatureColor: string;
  signatureFontFamily: string;
  signatureSize: number;
  sticker: string | null;
  stickerPosition: StickerPosition;
}
