import { UPLOAD_STATES } from 'components/hooks/useUpload';
import { create } from 'zustand';

export type ProgressFile = File & {
  progress?: number;
};

type UploadStore = {
  files: ProgressFile[];
  state: UPLOAD_STATES.IDLE | UPLOAD_STATES.UPLOADING | UPLOAD_STATES.COMPLETED;
  completed: boolean;
  setFiles: (files: ProgressFile[]) => void;
  setCompleted: (completed: boolean) => void;
  setState: (state: UPLOAD_STATES) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  state: UPLOAD_STATES.IDLE,
  completed: false,
  setFiles: (files: ProgressFile[]) => set(() => ({ files })),
  setState: (state: UPLOAD_STATES) => set(() => ({ state })),
  setCompleted: (completed: boolean) => set(() => ({ completed })),
  reset: () => set(() => ({ files: [], completed: false })),
}));
