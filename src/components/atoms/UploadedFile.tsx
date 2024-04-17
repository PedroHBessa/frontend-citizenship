import { Box, BoxProps, Grid, LinearProgress, Typography } from '@mui/material';
import { forwardRef } from 'react';
import styled from 'styled-components';
import UploadDefaultImage from '../../assets/upload-default-image.png';

interface UploadedFileProps {
  fileName?: string;
  fileSize?: string;
  progress?: number;
}

const Container = styled(Box)``;
const FileData = styled(Grid)``;

function shortenFilename(filename: string, maxLength: number = 15): string {
  const extension = filename.slice(filename.lastIndexOf('.'));

  const maxNameLength = maxLength - extension.length - 3; // 3 for the ellipsis

  if (filename.length - extension.length > maxNameLength) {
    return filename.slice(0, maxNameLength) + '...' + extension;
  }

  return filename;
}

const UploadedFile = forwardRef<BoxProps, UploadedFileProps>(
  ({ fileName, fileSize, progress = 0 }, ref) => {
    return (
      <Container component='section' ref={ref}>
        <FileData container spacing={5}>
          <Grid display='flex' item>
            <img src={UploadDefaultImage} />
            <Box ml={2}>
              <Typography variant='h6'>{`${shortenFilename(fileName ?? '')}`}</Typography>
              <Typography
                sx={{ whiteSpace: 'nowrap', mr: '1rem' }}
                variant='body1'
              >{`Size: ${fileSize}`}</Typography>
            </Box>
          </Grid>
          <Grid alignItems='center' display='flex' item lg={8} xs={6}>
            {progress > 0 && (
              <LinearProgress
                color='secondary'
                sx={{ height: '7px', width: '100%', borderRadius: '20px' }}
                value={progress}
                variant='determinate'
              />
            )}
          </Grid>
        </FileData>
      </Container>
    );
  }
);

UploadedFile.displayName = 'UploadedFile';

export default UploadedFile;
