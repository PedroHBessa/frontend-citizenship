import { create, StoreApi, UseBoundStore } from 'zustand';

type BaseLayoutStore = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const APP_BAR_OPENED = 250;
export const APP_BAR_CLOSED = 68;

export const useBaseLayoutStore: UseBoundStore<StoreApi<BaseLayoutStore>> =
  create((set) => ({
    isOpen: false,
    setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
  }));
