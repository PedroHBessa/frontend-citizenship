import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import routes from './routes';
import { AuthProvider } from './components/contexts/JWTContext';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import StylesProvider from '@mui/styles/StylesProvider';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import createTheme from './theme';
import useTheme from './components/hooks/useTheme';
import jssPreset from '@mui/styles/jssPreset';
import { create } from 'jss';
import { ThemeProvider } from 'styled-components';
import { AlertContextProvider } from './components/contexts/AlertContext';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')!,
});

function App() {
  const { theme } = useTheme();
  const router = createBrowserRouter(routes);

  return (
    <HelmetProvider>
      <Helmet defaultTitle='Prodoc App Interface' titleTemplate='%s | Prodoc' />
      <StylesProvider jss={jss}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={createTheme(theme)}>
            <ThemeProvider theme={createTheme(theme)}>
              <AlertContextProvider>
                <AuthProvider>
                  <RouterProvider router={router} />
                </AuthProvider>
              </AlertContextProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </HelmetProvider>
  );
}

export default App;
