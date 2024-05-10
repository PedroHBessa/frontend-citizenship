import { Alert, Box, FormLabel, Grid } from '@mui/material';
import { useUploadTab } from 'components/hooks/useUploadTab';
import { Gender } from 'components/molecules/FamilyTree/Form/Gender';
import { MemberType } from 'components/molecules/FamilyTree/Form/MemberType';
import { Parents } from 'components/molecules/FamilyTree/Form/Parents';
import UploadBox from '../../../atoms/UploadBox';
import UploadedFile from '../../../atoms/UploadedFile';

export function UploadTab() {
  const {
    control,
    files,
    formRef,
    handleFiles,
    handleSubmit,
    members,
    nextStep,
  } = useUploadTab();

  return (
    <>
      {!members.length && (
        <Alert severity='warning'>
          You must add the highest ancestor before adding the other ones
        </Alert>
      )}
      <Box mt={5} px={4}>
        <form onSubmit={handleSubmit(nextStep)} ref={formRef}>
          <Grid container spacing={10}>
            <Parents control={control} required={members.length > 0} />
            <MemberType control={control} />
            <Gender control={control} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box my={5}>
                <FormLabel>Documents</FormLabel>
              </Box>
              <Box my={5}>
                <UploadBox onDrop={handleFiles} />
              </Box>
              <Grid container my={5} spacing={6}>
                {files.map((file) => (
                  <Grid item key={`file-${file.name}`} xs={6}>
                    <UploadedFile
                      fileName={file.name}
                      fileSize={`${Math.round(file.size / 1024)} KB`}
                      progress={file.progress}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
