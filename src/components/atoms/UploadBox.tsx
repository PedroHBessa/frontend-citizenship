import { Box, Typography } from '@mui/material';
import { forwardRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import FolderIcon from '../../assets/folder-icon.png';
import { grayScale } from '../../theme/variants';

interface UploadBoxProps {
  // define your props here
  onDrop?: (acceptedFiles: File[]) => void;
}

const Container = styled(Box)`
  padding: 2rem;
  margin: 1rem 0;
  border: 2px dashed ${grayScale[50]};
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${grayScale[25]};
  width: 100%;
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const UploadBox = forwardRef<HTMLInputElement, UploadBoxProps>(
  ({ onDrop }, ref) => {
    const handleDrop = useCallback(
      (acceptedFiles: File[]) => {
        onDrop?.(acceptedFiles);
      },
      [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
    });

    return (
      <Container component='section' {...getRootProps()}>
        <input {...getInputProps()} ref={ref} />
        <img src={FolderIcon} alt='/' />
        {isDragActive ? (
          <Typography color='#343434' variant='body2'>
            Drop the files here ...
          </Typography>
        ) : (
          <Typography color='#343434' variant='body2'>
            Drag &apos;n&apos; drop some files here, or click to select files
          </Typography>
        )}
      </Container>
    );
  }
);

UploadBox.displayName = 'UploadBox';

export default UploadBox;
