import {
  Alert,
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { FamilyTreeMember } from 'components/contexts/FamilyContext';
import { SyntheticEvent, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Configuration from '../../../../config/Configuration';
import UploadBox from '../../../atoms/UploadBox';
import UploadedFile from '../../../atoms/UploadedFile';
import { useFamily } from '../../../hooks/useFamily';
import { useTab } from '../../../hooks/useTab';
import { useUpload } from '../../../hooks/useUpload';
import { useUploadStore } from '../../../stores/useUploadStore';

export function UploadTab() {
  const { members, family, tree } = useFamily();
  const {
    createNewMember,
    setCurrentId,
    currentMemberId,
    onSubmit,
    currentMarriageId,
    setCurrentMarriageId,
  } = useTab();
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      gender: 'female',
      type: !members.length ? 'highest' : 'member',
      parents: currentMarriageId ?? '',
    },
  });

  const { uploadForm, progress } = useUpload();

  const files = useUploadStore((state) => state.files);
  const setFiles = useUploadStore((state) => state.setFiles);

  const handleFiles = (_files: File[]) => {
    setFiles([...files, ..._files]);
  };

  const uploadFiles = useCallback(async () => {
    const config = new Configuration();

    if (files.length === 0) {
      return;
    }

    const memberId = currentMemberId
      ? currentMemberId
      : await createNewMember({
          gender: getValues('gender'),
          parents: getValues('parents'),
        });

    await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();

        formData.append('files[]', file);
        const targetUrl = config.getRouteWithVars(config.endpoint.post.upload, {
          familyId: family._id,
          memberId,
        });

        await uploadForm(targetUrl, formData);
      })
    );

    setCurrentId('2');
  }, [
    files,
    currentMemberId,
    createNewMember,
    getValues,
    family._id,
    uploadForm,
    setCurrentId,
  ]);

  useEffect(() => {
    if (onSubmit) onSubmit.current = uploadFiles;
  }, [uploadFiles, onSubmit]);

  const parents = members
    .map((member) => {
      const fromTree = tree?.find(
        (familyMember: FamilyTreeMember) => member._id === familyMember.id
      );

      return {
        ...fromTree,
        ...member,
      };
    })
    .filter(
      (member) => member.status !== 'notFromLineage'
    ) as FamilyTreeMember[];

  return (
    <>
      {!members.length && (
        <Alert severity='warning'>
          You must add the highest ancestor before adding the other ones
        </Alert>
      )}
      <Box mt={5} px={4}>
        <form onSubmit={handleSubmit(() => onSubmit && onSubmit.current)}>
          <Grid container spacing={10}>
            {!!parents.length && (
              <Grid item xs={12}>
                <FormLabel>Ancestor</FormLabel>
                <Controller
                  control={control}
                  name='parents'
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Grid container>
                        {parents.map((member) => (
                          <Grid item key={`${member._id}`}>
                            <FormControlLabel
                              control={<Radio />}
                              label={member.name}
                              onChange={(e: SyntheticEvent) => {
                                setCurrentMarriageId(
                                  (e.target as unknown as { value: string })
                                    .value
                                );
                              }}
                              value={member._id}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </RadioGroup>
                  )}
                />
              </Grid>
            )}
            <Grid item xs={6}>
              <FormLabel>Type</FormLabel>
              <Controller
                control={control}
                name='type'
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <Grid container>
                      <Grid item>
                        <FormControlLabel
                          control={<Radio />}
                          disabled={!!members.length}
                          label='Highest Ancestor'
                          value='highest'
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={<Radio />}
                          disabled={!members.length}
                          label='Member Family'
                          value='member'
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={<Radio />}
                          disabled={!members.length}
                          label='Applicant'
                          value='applicant'
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Gender</FormLabel>
              <Controller
                control={control}
                name='gender'
                render={({ field }) => (
                  <RadioGroup defaultValue='female' {...field}>
                    <Grid container>
                      <Grid item>
                        <FormControlLabel
                          control={<Radio />}
                          label='Female'
                          value='female'
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={<Radio />}
                          label='Male'
                          value='male'
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                )}
              />
            </Grid>
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
                      progress={progress}
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
