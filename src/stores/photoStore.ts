import { create } from "zustand";
export type CutMode = "2cut" | "4cut";
interface PhotoState {
  // Capture
  cutMode: CutMode;
  photos: string[];

  // Edit
  frameBg: string;
  frameText: string;
  filter: string;
  customText: string;

  // Result
  finalImage: string | null;

  // Actions
  setCutMode: (mode: CutMode) => void;
  addPhoto: (photo: string) => void;
  removePhoto: (index: number) => void;
  setFrame: (bg: string, text: string) => void;
  setFilter: (filter: string) => void;
  setCustomText: (text: string) => void;
  setFinalImage: (image: string | null) => void;
  clearPhotos: () => void;
  clearSession: () => void;
}
const INITIAL_STATE = {
  cutMode: "4cut" as CutMode,
  photos: [],
  frameBg: "bg-pink-300",
  frameText: "text-pink-900",
  filter: "none",
  customText: "Y2K_LIFE4CUT",
  finalImage: null,
};
export const usePhotoStore = create<PhotoState>((set) => ({
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
  removePhoto: (index) =>
    set((state) => ({
      photos: state.photos.filter((_, i) => i !== index),
    })),

  // Edit
  setFrame: (bg, text) =>
    set({
      frameBg: bg,
      frameText: text,
    }),
  setFilter: (filter) =>
    set({
      filter,
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
