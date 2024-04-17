import { Grid, GridProps, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { grayScale } from '../../theme/variants';

type HeaderProps = {
  actionButton?: React.ReactNode;
};

const Container = styled(Grid)`
  border-bottom: 1px solid ${grayScale[50]};
  padding: 1rem 0;
`;

export function Header(props: GridProps & HeaderProps) {
  const { actionButton, ...rest } = props;

  return (
    <Container container {...rest}>
      <Grid item xs={8}>
        <Typography variant='h1'>{props.children}</Typography>
      </Grid>
      {actionButton && (
        <Grid
          alignItems='center'
          display='flex'
          justifyContent='center'
          marginLeft='auto'
        >
          {actionButton}
        </Grid>
      )}
    </Container>
  );
}
