import React from 'react';
import { AlertContext } from '../contexts/AlertContext';

export const useAlert = () => {
  const context = React.useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within a AlertContextProvider');
  }

  return context;
};
