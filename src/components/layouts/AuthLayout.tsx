import React, { ReactNode } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import BlueBackground from '../../assets/blue-bg.png';
import TreeBackground from '../../assets/tree-bg.png';

const WrapperRight = styled(Grid)`
  background: #0A3C66 url(${BlueBackground}) no-repeat left center;
  background-size: cover;
  background-position: center;
`;

const WrapperLeft = styled(Grid)`
  &:before {
    background-size: cover;
    background: url(${TreeBackground}) no-repeat top left;
    opacity: 1;
    filter: grayscale(1);
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  align-items: center;
  justify-content: center;
  display: flex;
`;

export function AuthLayout({ children }: { children?: ReactNode }) {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.up('xs'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <React.Fragment>
      <Helmet title='Login' />
      <Grid
        container
        px={!isDesktop ? 6 : 0}
        spacing={2}
        sx={{ height: '100%' }}
      >
        <WrapperLeft item sm={7} xs={12}>
          {children}
        </WrapperLeft>
        {isDesktop && <WrapperRight item xs={5} />}
      </Grid>
    </React.Fragment>
  );
  // return <><Box sx={{ width: '100%', height: '100%' }}>{children}</Box></>;
}
