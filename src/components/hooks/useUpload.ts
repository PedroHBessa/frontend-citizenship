import { ProgressFile } from 'components/stores/useUploadStore';
import Configuration from 'config/Configuration';
import { useFamily } from './useFamily';

const config = new Configuration();

export enum UPLOAD_STATES {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  COMPLETED = 'completed',
}

export const useUpload = () => {
  const { family, uploadForm } = useFamily();

  const uploadFiles = async ({
    files,
    memberId,
    onProgress,
  }: {
    files: ProgressFile[];
    memberId: string;
    onProgress: ({
      file,
      progress,
    }: {
      file: ProgressFile;
      progress: number;
    }) => void;
  }) => {
    return Promise.all(
      files.map(async (file: ProgressFile) => {
        const formData = new FormData();

        formData.append('files[]', file);

        const targetUrl = config.getRouteWithVars(config.endpoint.post.upload, {
          familyId: family._id,
          memberId,
        });

        return uploadForm({
          url: targetUrl,
          formData,
          onProgress: (progress) => {
            onProgress({
              progress,
              file,
            });
          },
        });
      })
    );
  };

  return { uploadForm, uploadFiles };
};
