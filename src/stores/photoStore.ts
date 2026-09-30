import { create } from 'zustand';

interface PhotoState {
  photos: string[];
  frameBg: string;
  frameText: string;
  filter: string;
  customText: string;
  
  addPhoto: (photo: string) => void;
  setFrame: (bg: string, text: string) => void;
  setFilter: (filter: string) => void;
  setCustomText: (text: string) => void;
  clearSession: () => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  photos: [],
  frameBg: 'bg-pink-300',
  frameText: 'text-pink-900',
  filter: 'none',
  customText: 'Y2K_LIFE4CUT',
  
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  setFrame: (bg, text) => set({ frameBg: bg, frameText: text }),
  setFilter: (filter) => set({ filter }),
  setCustomText: (customText) => set({ customText }),
  clearSession: () => set({ photos: [], frameBg: 'bg-pink-300', frameText: 'text-pink-900', filter: 'none', customText: 'Y2K_LIFE4CUT' }),
}));