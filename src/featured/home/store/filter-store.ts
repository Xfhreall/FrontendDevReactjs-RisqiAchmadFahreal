import { create } from "zustand";

interface FilterState {
  isOpenNow: boolean;
  price: number | null;
  categoryId: string | null;
  setIsOpenNow: (isOpen: boolean) => void;
  setPrice: (price: number | null) => void;
  setCategory: (categoryId: string | null) => void;
  clearAll: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  isOpenNow: false,
  price: null,
  categoryId: null,
  setIsOpenNow: (isOpen) => set({ isOpenNow: isOpen }),
  setPrice: (price) => set({ price }),
  setCategory: (categoryId) => set({ categoryId }),
  clearAll: () =>
    set({ isOpenNow: false, price: null, categoryId: null }),
}));
