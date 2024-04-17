import { Button, ButtonProps, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { SpacingProps } from '@mui/system';
import React from 'react';

export interface ButtonSpacingProps extends SpacingProps {
  component?: string;
  loading?: boolean;
}

const StyledButton = styled(Button)`
  && {
    text-transform: uppercase;
  }
`;

export function CustomButton(props: ButtonProps & ButtonSpacingProps) {
  const { loading, ...buttonProps } = props;

  if (loading) {
    return (
      <StyledButton {...buttonProps} disabled>
        <CircularProgress
          color='secondary'
          size={18}
          sx={{ marginRight: '1rem' }}
        />
        {props.children}
      </StyledButton>
    );
  }

  return <StyledButton {...buttonProps} />;
}
