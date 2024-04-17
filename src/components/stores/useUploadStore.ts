import { create } from 'zustand';

type UploadStore = {
  files: File[];
  completed: boolean;
  setFiles: (files: File[]) => void;
  setCompleted: (completed: boolean) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  completed: false,
  setFiles: (files: File[]) => set(() => ({ files })),
  setCompleted: (completed: boolean) => set(() => ({ completed })),
  reset: () => set(() => ({ files: [], completed: false })),
}));
