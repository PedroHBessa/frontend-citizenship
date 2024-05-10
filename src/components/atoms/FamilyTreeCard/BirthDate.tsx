import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Skeleton, Typography } from '@mui/material';
import styled from 'styled-components';

export const CardFooterDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export function BirthDate({ birthDate }: { birthDate: Date | null }) {
  return birthDate ? (
    <CardFooterDate>
      <StarOutlineIcon style={{ fontSize: 14 }} />
      <Typography
        color='text.secondary'
        component='span'
        sx={{ mt: 2, mb: 2, ml: 1, fontSize: 12 }}
        variant='h6'
      >
        {birthDate?.toLocaleDateString()}
      </Typography>
    </CardFooterDate>
  ) : (
    <Skeleton sx={{ width: '150px', height: '20px', margin: '0.25rem 0' }} />
  );
}
