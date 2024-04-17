import { create, StoreApi, UseBoundStore } from 'zustand';
import { Data } from '../../types/data';

type FamiliesStore = {
  initialized: boolean;
  loading: boolean;
  openModal: boolean;
  rows: Data[];
  setInitialized: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setOpenModal: (value: boolean) => void;
  setRows: (value: Data[]) => void;
};

export const useFamiliesStore: UseBoundStore<StoreApi<FamiliesStore>> = create(
  (set) => ({
    initialized: false,
    loading: false,
    openModal: false,
    rows: [],
    setInitialized: (value: boolean) => set(() => ({ initialized: value })),
    setLoading: (value: boolean) => set(() => ({ loading: value })),
    setOpenModal: (value: boolean) => set(() => ({ openModal: value })),
    setRows: (value: Data[]) => set(() => ({ rows: value })),
  })
);
