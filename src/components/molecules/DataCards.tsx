import { Data, Family, Operator } from '../../types/data';
import { Grid, LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import TableCard from '../atoms/TableCard';
import Divider from '@mui/material/Divider';
import { FamilyStatus } from '../atoms/DataTable/Status';

export interface DataCardsProps {
  data: Data[];
  loading?: boolean;
  onSelected?: (selected: number[]) => void;
  onNavigate?: (id: number) => void;
}
export function DataCards(props: DataCardsProps) {
  const { loading, data, onSelected, onNavigate } = props;
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleSelected = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    onSelected && onSelected(selected);
  }, [selected, onSelected]);

  return (
    <>
      {loading ? (
        <LinearProgress color='secondary' sx={{ height: '1px' }} />
      ) : (
        <Divider sx={{ margin: '1rem 0' }} />
      )}

      <Grid container mx={-5}>
        {data.map((item, index) => {
          const { personalInformation } = item as unknown as Family;

          return (
            <Grid
              item
              key={`${item.id}-${index}`}
              lg={3}
              mb={4}
              md={4}
              px={4}
              sm={6}
              xl={2}
              xs={12}
            >
              <TableCard
                creationDate={item.createdAt as string}
                creator={item.createdBy as unknown as Operator}
                familyName={item.familyName as string}
                id={item._id as string}
                name={personalInformation?.firstName as string}
                onNavigate={onNavigate}
                onSelected={handleSelected}
                reference={item.id as string}
                status={item.familyStatus as FamilyStatus}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
;
