import { create, StoreApi, UseBoundStore } from 'zustand';

type Store = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const useAppStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) =>
    set(() => ({ isAuthenticated: value })),
}));
