import AddIcon from '@mui/icons-material/Add'; //TODO: Create a custom icon for this
import { Typography } from '@mui/material';
import { CardFooterDate } from './BirthDate';

export function DeathDate({ deathDate }: { deathDate: Date | null }) {
  return (
    deathDate && (
      <CardFooterDate>
        <AddIcon style={{ fontSize: 14 }} />
        <Typography
          color='text.secondary'
          component='span'
          sx={{ mt: 2, mb: 2, ml: 1, fontSize: 12 }}
          variant='h6'
        >
          {deathDate?.toLocaleDateString()}
        </Typography>
      </CardFooterDate>
    )
  );
}
