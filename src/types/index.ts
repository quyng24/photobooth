export type CutMode = "2cut" | "4cut";

export type TimerOption = 3 | 5 | 10;

export type FrameStyle =
  | "y2k-pink"
  | "cyber-cyan"
  | "neon-yellow"
  | "retro-black";

export type FilterStyle = "none" | "vintage" | "bw" | "pop";

export interface FrameConfig {
  id: FrameStyle;
  name: string;
  background: string;
  textColor: string;
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
  setFinalImage: (image: string | null) => void;

  clearPhotos: () => void;
  clearSession: () => void;
}

export interface RenderPhotoStripOptions {
  photos: string[];
  frameBg: string;
  filter: string;
  customText: string;
}