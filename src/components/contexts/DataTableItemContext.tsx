import React, { createContext, ReactNode } from 'react';
import { Data } from '../../types/data';

type DataTableItemContextType = {
  item: Data;
};

const DataTableItemContext = createContext<DataTableItemContextType | null>(
  null
);

const useDataTableItemContext = () => {
  const context = React.useContext(DataTableItemContext);

  if (!context) {
    throw new Error(
      'useDataTableItemContext must be used within a DataTableItemContextProvider'
    );
  }

  return context;
};

function DataTableItemContextProvider({
  children,
  item,
}: {
  children: ReactNode;
  item: Data;
}) {
  return (
    <DataTableItemContext.Provider value={{ item }}>
      {children}
    </DataTableItemContext.Provider>
  );
}

export {
  DataTableItemContext,
  DataTableItemContextProvider,
  useDataTableItemContext,
};
