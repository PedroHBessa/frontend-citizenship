import React from 'react';
import { PinnedContext } from '../contexts/PinnedContext';

export const usePinned = () => {
  const context = React.useContext(PinnedContext);

  if (!context) {
    throw new Error('usePinned must be used within a PinnedContextProvider');
  }

  return context;
};
