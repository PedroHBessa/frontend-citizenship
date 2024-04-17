import React from 'react';
import { FamilyContext } from '../contexts/FamilyContext';

export const useFamily = () => {
  const context = React.useContext(FamilyContext);

  if (!context) {
    throw new Error('useFamily must be used within a FamilyContextProvider');
  }

  return context;
};
