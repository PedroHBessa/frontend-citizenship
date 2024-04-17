import { FamilyTreeMember } from 'components/contexts/FamilyContext';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { Data } from '../../types/data';

type FamilyStore = {
  loading: boolean;
  initialized: boolean;
  family: Data;
  members: Data[];
  tree: Node[] & FamilyTreeMember[];
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  setTree: (value: Node[] & FamilyTreeMember[]) => void;
  setLoading: (value: boolean) => void;
  setInitialized: (value: boolean) => void;
  setFamily: (value: Data) => void;
  setMembers: (value: Data[]) => void;
};

export const useFamilyStore: UseBoundStore<StoreApi<FamilyStore>> = create(
  (set) => ({
    loading: false,
    initialized: false,
    family: {},
    members: [],
    tree: [],
    openModal: false,
    setOpenModal: (value: boolean) => set(() => ({ openModal: value })),
    setTree: (value: Node[] & FamilyTreeMember[]) =>
      set(() => ({ tree: value })),
    setLoading: (value: boolean) => set(() => ({ loading: value })),
    setInitialized: (value: boolean) => set(() => ({ initialized: value })),
    setFamily: (value: Data) => set(() => ({ family: value })),
    setMembers: (value: Data[]) => set(() => ({ members: value })),
  })
);
