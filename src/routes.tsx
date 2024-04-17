// import { AuthLayout } from './components/layouts/AuthLayout';
import React from 'react';
import { Login } from './components/pages/Login';

import AuthGuard from './components/guards/AuthGuard';
import { BaseAppLayout } from './components/layouts/BaseAppLayout';
import { Dashboard } from './components/pages/Dashboard';
import { AuthLayout } from './components/layouts/AuthLayout';
import { Family } from './components/pages/Family';
import { Families } from './components/pages/Families';
import { Reports } from './components/pages/Reports';
import { FamiliesContextProvider } from './components/contexts/FamiliesContext';
import { FamilyContextProvider } from './components/contexts/FamilyContext';

const routes = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <BaseAppLayout>
          <Dashboard />
        </BaseAppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/families/:id',
    element: (
      <AuthGuard>
        <BaseAppLayout>
          <FamilyContextProvider>
            <Family />
          </FamilyContextProvider>
        </BaseAppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/families',
    element: (
      <AuthGuard>
        <BaseAppLayout>
          <FamiliesContextProvider>
            <Families />
          </FamiliesContextProvider>
        </BaseAppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/reports',
    element: (
      <AuthGuard>
        <BaseAppLayout>
          <FamiliesContextProvider>
            <Reports />
          </FamiliesContextProvider>
        </BaseAppLayout>
      </AuthGuard>
    ),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
    ],
  },
];

export default routes;
