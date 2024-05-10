import { create, StoreApi, UseBoundStore } from 'zustand';

type TabStore = {
  currentId: string;
  currentMemberId: string | null;
  currentMarriageId: string[] | null;
  setCurrentId: (id: string) => void;
  setCurrentMemberId: (id: string | null) => void;
  setCurrentMarriageId: (id: string[] | null) => void;
};

export const useTabStore: UseBoundStore<StoreApi<TabStore>> = create((set) => {
  return {
    currentId: '',
    currentMemberId: null,
    currentMarriageId: null,
    setCurrentId: (id: string) => set(() => ({ currentId: id })),
    setCurrentMemberId: (id: string | null) =>
      set(() => ({ currentMemberId: id })),
    setCurrentMarriageId: (id: string[] | null) =>
      set(() => ({ currentMarriageId: id })),
  };
});
