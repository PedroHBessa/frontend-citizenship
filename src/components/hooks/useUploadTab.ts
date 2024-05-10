import { TABS } from 'components/contexts/TabContext';
import { useUploadStore } from 'components/stores/useUploadStore';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useFamily } from './useFamily';
import { useTab } from './useTab';
import { useUpload } from './useUpload';

/**
 * Custom hook for managing the upload tab functionality.
 * This hook provides functions and data related to handling file uploads and managing the state of the upload tab.
 * It uses other custom hooks like `useFamily`, `useTab`, and `useUpload` to handle specific aspects of the upload process.
 * @returns An object containing the necessary functions and data for the upload tab.
 */
export function useUploadTab() {
  const { members, createNewMember } = useFamily();
  const { setCurrentId, currentMemberId, onSubmit, currentMarriageId } =
    useTab();

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      gender: 'female',
      type: !members.length ? 'highest' : 'member',
      parents: currentMarriageId?.join(',') ?? '',
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const { uploadFiles } = useUpload();

  const files = useUploadStore((state) => state.files);
  const setFiles = useUploadStore((state) => state.setFiles);

  /**
   * Function to handle the selection of files.
   * Adds the selected files to the list of files to be uploaded.
   * @param _files - The files to be added to the upload list.
   */
  const handleFiles = (_files: File[]) => {
    setFiles([...files, ..._files]);
  };

  /**
   * Function to handle the next step in the upload process.
   * If there are no files selected, the function returns early.
   * If there is a current member ID, it uses that ID. Otherwise, it creates a new member and uses the returned ID.
   * It then uploads the files, updating the progress for each file, and finally sets the current ID to the second tab.
   */
  const nextStep = useCallback(async () => {
    if (files.length === 0) {
      return;
    }

    const memberId =
      currentMemberId ??
      ((await createNewMember({
        gender: getValues('gender'),
        parents: getValues('parents'),
      })) as string);

    uploadFiles({
      files,
      memberId,
      onProgress: ({ progress, file }) => {
        setFiles(
          files.map((_file) => {
            if (_file === file) {
              file.progress = progress;
            }

            return file;
          })
        );
      },
    }).then(() => {
      setCurrentId(TABS.SECOND);
    });
  }, [
    files,
    currentMemberId,
    createNewMember,
    getValues,
    uploadFiles,
    setFiles,
    setCurrentId,
  ]);

  if (onSubmit) {
    onSubmit.current = async () => {
      handleSubmit(nextStep)();
    };
  }

  useEffect(() => {
    setFiles([]);
  }, [setFiles]);

  return {
    control,
    files,
    formRef,
    handleFiles,
    handleSubmit,
    members,
    nextStep,
  };
}
