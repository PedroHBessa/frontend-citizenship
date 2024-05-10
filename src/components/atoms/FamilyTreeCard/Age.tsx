import { Skeleton, Typography } from '@mui/material';

export function Age({ age }: { age: number | null }) {
  return age ? (
    <Typography component='span' variant='h6'>
      {`${age} years`}
    </Typography>
  ) : (
    <Skeleton sx={{ width: '120px', height: '25px', margin: '1rem 0.5rem' }} />
  );
}
