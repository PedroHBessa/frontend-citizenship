import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export function Gender({
  control,
}: {
  control: Control<{ gender: string; type: string; parents: string }>;
}) {
  return (
    <>
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
          rules={{ required: 'You must select a gender' }}
        />
      </Grid>
    </>
  );
}
