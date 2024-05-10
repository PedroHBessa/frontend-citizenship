import { Box } from '@mui/material';
import { ReactNode } from 'react';
import styled from 'styled-components';
import TreeBackground from '../../assets/tree-bg.png';
import { Breadcrumb } from '../atoms/Breadcrumb';
import { PinnedContextProvider } from '../contexts/PinnedContext';
import { AppBar } from '../molecules/AppBar';
import { Footer } from '../molecules/Footer';
import { TopBar } from '../molecules/TopBar';
import {
  APP_BAR_CLOSED,
  APP_BAR_OPENED,
  useBaseLayoutStore,
} from '../stores/useBaseLayoutStore';

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Container = styled.div`
  width: calc(100% - 49px);
  transition: all ease 0.2s;
  display: flex;
  flex-direction: column;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background: url(${TreeBackground}) no-repeat top left;
    position: absolute;
    pointer-events: none;
    filter: blur(6px);
    opacity: 0.9;
  }
`;

export function BaseAppLayout({ children }: { children?: ReactNode }) {
  const { isOpen } = useBaseLayoutStore();

  return (
    <Root>
      <PinnedContextProvider>
        <AppBar />
        <Container
          style={{
            width: `calc(100% - ${isOpen ? APP_BAR_OPENED : APP_BAR_CLOSED}px)`,
            marginLeft: (isOpen ? APP_BAR_OPENED : APP_BAR_CLOSED) + 'px',
          }}
        >
          <TopBar
            style={{
              width: `calc(100% - ${isOpen ? APP_BAR_OPENED : APP_BAR_CLOSED}px)`,
            }}
          />
          <Box pt={18} px={4}>
            <Breadcrumb />
            {children}
          </Box>
          <Footer />
        </Container>
      </PinnedContextProvider>
    </Root>
  );
}
