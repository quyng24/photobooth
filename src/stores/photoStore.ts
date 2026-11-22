import { create } from "zustand";
import type {
  CutMode,
  FilterConfig,
  FilterStyle,
  FrameConfig,
  FrameStyle,
  PhotoStoreState,
  SignatureColor,
  SignatureFont,
  StickerId,
  StickerPosition,
  TimerOption,
} from "@/types";
import { getFrame, DEFAULT_FRAME_ID } from "@/frames/registry";
export {
  SIGNATURE_FONTS,
  SIGNATURE_COLORS,
  SIGNATURE_STICKERS,
  FRAME_STICKERS,
} from "@/config/signature";

export const getFrameConfig = (style: FrameStyle): FrameConfig => {
  const f = getFrame(style);
  return {
    id: f.id as FrameStyle,
    name: f.name,
    background: f.theme.bgPreview,
    textColor: f.theme.textColor,
    textHexColor: f.theme.textHexColor,
    accentColor: f.theme.accentColor,
  };
};

export const FILTER_STYLES: Record<FilterStyle, FilterConfig> = {
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
  cutMode: "3cut" as CutMode,
  photos: [],
  frameStyle: DEFAULT_FRAME_ID as FrameStyle,
  filterStyle: "none" as FilterStyle,
  customText: "WE_BARE_BEARS",
  signatureFont: "mono" as SignatureFont,
  signatureColor: "frame" as SignatureColor,
  signatureSize: 36,
  stickerId: "none" as StickerId,
  stickerPosition: "before" as StickerPosition,
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
      const frame = getFrame(state.frameStyle);
      const maxPhoto = frame.slots.length;
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
  setFrameStyle: (style) =>
    set((state) => {
      const prevFrame = getFrame(state.frameStyle);
      const newFrame = getFrame(style);
      const isDefaultText =
        !state.customText ||
        state.customText === prevFrame.defaultCustomText ||
        state.customText === "WE_BARE_BEARS" ||
        state.customText === "TAEKWONDO_PANDA" ||
        state.customText === "MERRY_CHRISTMAS" ||
        state.customText === "CHÚC_MỪNG_NĂM_MỚI";

      return {
        frameStyle: style,
        cutMode: `${newFrame.cutCount}cut` as CutMode,
        customText: isDefaultText
          ? (newFrame.defaultCustomText ?? "")
          : state.customText,
      };
    }),
  setFilterStyle: (style) => set({ filterStyle: style }),
  setTimer: (timer) =>
    set({
      timer,
    }),
  setCustomText: (customText) =>
    set({
      customText,
    }),
  setSignatureFont: (signatureFont) => set({ signatureFont }),
  setSignatureColor: (signatureColor) => set({ signatureColor }),
  setSignatureSize: (signatureSize) => set({ signatureSize }),
  setStickerId: (stickerId) => set({ stickerId }),
  setStickerPosition: (stickerPosition) => set({ stickerPosition }),

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
