import React from 'react';
import { TabContext } from '../contexts/TabContext';

export const useTab = () => {
  const context = React.useContext(TabContext);

  if (!context) {
    throw new Error('useTab must be used within a TabContextProvider');
  }

  return context;
};
