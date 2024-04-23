import styled from 'styled-components';
import React, { HTMLProps } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography } from '@mui/material';
import { grayScale } from '../../theme/variants';

const Component = styled.div`
  height: 40px;
  width: 100%;
  margin-top: auto;
  bottom: 0;
  border-top: 1px solid ${grayScale[50]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Footer(props: HTMLProps<HTMLDivElement>) {
  return (
    <Component {...props}>
      <Typography variant='body1'>
        CONSUL IT @ Brazil - Made With{' '}
        <FavoriteBorderIcon style={{ height: '16px' }} />
      </Typography>
    </Component>
  );
}
