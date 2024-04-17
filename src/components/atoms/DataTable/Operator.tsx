import { useDataTableItemContext } from '../../contexts/DataTableItemContext';
import React from 'react';
import { Family } from '../../../types/data';

export function Operator() {
  const { item } = useDataTableItemContext();
  const { createdBy } = item as unknown as Family;

  return <>{createdBy?.userId?.email}</>;
}
