import { useDataTableItemContext } from '../../contexts/DataTableItemContext';
import React from 'react';
import { Family } from '../../../types/data';

export function Applicant() {
  const { item } = useDataTableItemContext();
  const { personalInformation } = item as unknown as Family;

  return (
    <>
      {personalInformation?.firstName} {personalInformation?.lastName}
    </>
  );
}
