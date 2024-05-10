import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { create } from 'jss';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { AlertContextProvider } from './components/contexts/AlertContext';
import { AuthProvider } from './components/contexts/JWTContext';
import useTheme from './components/hooks/useTheme';
import routes from './routes';
import createTheme from './theme';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
