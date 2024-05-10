import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useFamily } from 'components/hooks/useFamily';
import { Control, Controller } from 'react-hook-form';

export function MemberType({
  control,
}: {
  control: Control<{ gender: string; type: string; parents: string }>;
}) {
  const { members } = useFamily();

  return (
    <>
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
    </>
  );
}
