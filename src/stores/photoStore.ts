import { create } from "zustand";
import type {
  CutMode,
  FilterConfig,
  FilterStyle,
  FrameConfig,
  FrameStyle,
  PhotoStoreState,
  TimerOption,
} from "@/types";

const FRAME_CONFIGS: Record<FrameStyle, FrameConfig> = {
  "y2k-pink": {
    id: "y2k-pink",
    name: "Y2K Pink",
    background: "bg-pink-300",
    textColor: "text-pink-900",
    accentColor: "#ec4899",
  },
  "cyber-cyan": {
    id: "cyber-cyan",
    name: "Cyber Cyan",
    background: "bg-cyan-300",
    textColor: "text-cyan-950",
    accentColor: "#06b6d4",
  },
  "neon-yellow": {
    id: "neon-yellow",
    name: "Neon Yellow",
    background: "bg-yellow-300",
    textColor: "text-yellow-950",
    accentColor: "#eab308",
  },
  "retro-black": {
    id: "retro-black",
    name: "Retro Black",
    background: "bg-zinc-900",
    textColor: "text-pink-400",
    accentColor: "#f472b6",
  },
};

export const FRAME_STYLES = Object.values(FRAME_CONFIGS);
export const getFrameConfig = (style: FrameStyle) => FRAME_CONFIGS[style];

export const FILTER_STYLES: Record<
  FilterStyle,
  FilterConfig
> = {
  none: {
    id: "none",
    name: "Normal",
    className: "filter-none",
    filter: "none",
  },
  vintage: {
    id: "vintage",
    name: "Y2K Film",
    className: "filter-vintage",
    filter: "sepia(0.3) contrast(1.1) saturate(1.3) hue-rotate(-10deg)",
  },
  bw: {
    id: "bw",
    name: "B&W Film",
    className: "filter-bw",
    filter: "grayscale(1) contrast(1.2)",
  },
  pop: {
    id: "pop",
    name: "Pop Punch",
    className: "filter-pop",
    filter: "saturate(1.45) contrast(1.15) hue-rotate(8deg)",
  },
};

const INITIAL_STATE = {
  cutMode: "4cut" as CutMode,
  photos: [],
  frameStyle: "y2k-pink" as FrameStyle,
  filterStyle: "none" as FilterStyle,
  customText: "Y2K_LIFE4CUT",
  timer: 3 as TimerOption,
  finalImage: null,
};
export const usePhotoStore = create<PhotoStoreState>((set) => ({
  ...INITIAL_STATE,

  // Capture
  setCutMode: (mode) =>
    set({
      cutMode: mode,
    }),
  addPhoto: (photo) =>
    set((state) => {
      const maxPhoto = state.cutMode === "2cut" ? 2 : 4;
      if (state.photos.length >= maxPhoto) {
        return state;
      }
      return {
        photos: [...state.photos, photo],
      };
    }),
  replacePhoto: (index, photo) =>
    set((state) => ({
      photos: state.photos.map((item, i) => (i === index ? photo : item)),
    })),
  removePhoto: (index) =>
    set((state) => ({
      photos: state.photos.filter((_, i) => i !== index),
    })),

  // Edit
  setFrameStyle: (style) => set({ frameStyle: style }),
  setFilterStyle: (style) => set({ filterStyle: style }),
  setTimer: (timer) =>
    set({
      timer,
    }),
  setCustomText: (customText) =>
    set({
      customText,
    }),

  // Result
  setFinalImage: (image) =>
    set({
      finalImage: image,
    }),

  // Reset photos only
  clearPhotos: () =>
    set({
      photos: [],
      finalImage: null,
    }),

  // Reset entire session
  clearSession: () =>
    set({
      ...INITIAL_STATE,
    }),
}));
