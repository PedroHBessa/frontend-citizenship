import { Skeleton, Typography } from '@mui/material';
import { FamilyMemberStatus } from 'types/State';

type NameProps = {
  name: string;
  status: string;
};
export function Name({ name, status }: NameProps) {
  return name.length > 0 ? (
    <Typography
      color={
        status === FamilyMemberStatus.NOT_FROM_LINEAGE
          ? 'text.disabled'
          : 'text.primary'
      }
      gutterBottom
      sx={{ mt: 4, mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      variant='h4'
    >
      {name}
    </Typography>
  ) : (
    <div>
      <Skeleton sx={{ width: '170px', height: '25px', margin: '0.33rem' }} />
    </div>
  );
}
