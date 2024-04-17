import { useDataTableItemContext } from '../../contexts/DataTableItemContext';
import React from 'react';
import styled from 'styled-components';
import { statusColor } from '../../../theme/variants';
import { FamilyState, FamilyStateLabel } from '../../../types/State';

const Container = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;
const StatusBullet = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
`;

export type FamilyStatus =
  | FamilyState.CREATED
  | FamilyState.ON_PROGRESS
  | FamilyState.FINISHED;

export function Status({ keyName }: { keyName: string }) {
  const { item } = useDataTableItemContext();

  const colorName = item[keyName] as string;
  const color = statusColor[colorName.toUpperCase() as FamilyStatus];
  const label = FamilyStateLabel[colorName.toUpperCase() as FamilyStatus];

  return (
    <Container>
      <StatusBullet color={color} /> {label}
    </Container>
  );
}
