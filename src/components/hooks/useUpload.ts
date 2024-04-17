import { AxiosProgressEvent } from 'axios';
import { useState } from 'react';
import { Api } from '../../api/Api';

const api = new Api();

export const useUpload = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadForm = async (url: string, formData: FormData) => {
    await api.post(url, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const progress =
          (progressEvent.loaded / (progressEvent.total ?? 100)) * 100;

        setProgress(progress);
      },
      // onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
      //   const progress =
      //     50 + (progressEvent.loaded / (progressEvent?.total ?? 100)) * 50;

      //   setProgress(progress);
      // },
    });
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, progress };
};
