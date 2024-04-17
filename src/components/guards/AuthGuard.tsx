import * as React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }: AuthGuardType) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isAuthenticated && isInitialized) {
    return <Navigate to='/auth/login' />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
