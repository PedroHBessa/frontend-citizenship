import { useDataTableItemContext } from '../../contexts/DataTableItemContext';
import React from 'react';

export function DateTime({ keyName }: { keyName: string }) {
  const { item } = useDataTableItemContext();
  const date = new Date(item[keyName] as string);

  if (!item[keyName]) {
    return <></>;
  }

  return (
    <>
      {date.toLocaleDateString()} {date.toLocaleTimeString()}
    </>
  );
}
