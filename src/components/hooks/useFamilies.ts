import React from 'react';
import { FamiliesContext } from '../contexts/FamiliesContext';

export const useFamilies = () => {
  const context = React.useContext(FamiliesContext);

  if (!context) {
    throw new Error(
      'useFamilies must be used within a FamiliesContextProvider'
    );
  }

  return context;
};
