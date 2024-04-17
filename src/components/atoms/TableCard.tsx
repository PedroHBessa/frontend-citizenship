/* eslint-disable indent */
import { Card, Checkbox, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BoyIcon from '@mui/icons-material/Boy';
import { FamilyState } from '../../types/State';
import { statusColor } from '../../theme/variants';
import { Operator } from '../../types/data';
import { FamilyStatus } from './DataTable/Status';

export interface TableCardProps {
  creationDate: string;
  creator: Operator;
  familyName: string;
  id: string;
  reference: string;
  name: string;
  status: FamilyStatus;
  onSelected?: (selected: number) => void;
  onNavigate?: (id: number) => void;
}

const Container = styled.div<{ status: string }>`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border-left: 11px solid
    ${(props) => {
      switch (props?.status?.toUpperCase()) {
        case FamilyState.FINISHED:
          return statusColor[FamilyState.FINISHED];
        case FamilyState.ON_PROGRESS:
          return statusColor[FamilyState.ON_PROGRESS];
        default:
          return statusColor[FamilyState.CREATED];
      }
    }};

  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 2px 2px 10px 5px rgba(0, 0, 0, 0.08);
  }
`;

const CardContent = styled(Grid)`
  padding: 0.5rem 0.75rem;
  justify-content: space-between;
  height: 100%;
`;
const Column = styled(Grid)<{ left?: string }>`
  color: ${(props) => (props.left ? 'unset' : '#787878')};
  justify-content: space-between;
  align-items: ${(props) => (props.left ? 'flex-start' : 'flex-end')};
`;

export const HasIconWrapper = styled.div`
  display: flex;
  color: #787878;
`;

const TableCard: React.FC<TableCardProps> = ({
  status,
  reference,
  familyName,
  creator,
  creationDate,
  name,
  id,
  onSelected,
  onNavigate,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkRef = React.useRef<HTMLButtonElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    if (checkRef.current?.contains(e.target as Node)) {
      return;
    }
    onNavigate && onNavigate(id as unknown as number);
  };

  const handleSelected = () => {
    setIsChecked(!isChecked);
    onSelected && onSelected(id as unknown as number);
  };

  return (
    <Container status={status}>
      <Card
        onClick={handleCardClick}
        sx={{
          backgroundColor: '#e7e7e7',
          cursor: 'pointer',
          height: '100%',
        }}
      >
        <CardContent container display='flex'>
          <Column
            display='flex'
            flexDirection='column'
            item
            left='true'
            sm={6}
            xs={12}
          >
            <Typography component='div' mb={3} variant='h4'>
              {reference}
            </Typography>
            <Typography mb={3} variant='h6'>
              {familyName}
            </Typography>
            <HasIconWrapper>
              <PermIdentityIcon />
              <Typography sx={{ ml: 1 }} variant='h6'>
                {creator?.userId?.email.split('@')[0]}
              </Typography>
            </HasIconWrapper>
          </Column>
          <Column display='flex' flexDirection='column' item sm={6} xs={12}>
            <Checkbox
              checked={isChecked}
              component='span'
              onChange={handleSelected}
              ref={checkRef}
              sx={{ m: 0, p: 0 }}
            />
            <Typography variant='h5'>
              {new Date(creationDate).toLocaleDateString()}
            </Typography>
            <HasIconWrapper>
              <Typography variant='h6'>{name}</Typography>
              <BoyIcon />
            </HasIconWrapper>
          </Column>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TableCard;
