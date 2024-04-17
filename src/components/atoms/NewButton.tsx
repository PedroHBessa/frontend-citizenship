import { ButtonSpacingProps, CustomButton } from './CustomButton';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { ButtonProps } from '@mui/material';

export function NewButton(props: ButtonProps & ButtonSpacingProps) {
  return (
    <CustomButton
      fullWidth
      size='large'
      startIcon={<AddIcon />}
      type='submit'
      variant='contained'
      {...props}
    >
      {props.children}
    </CustomButton>
  );
}
