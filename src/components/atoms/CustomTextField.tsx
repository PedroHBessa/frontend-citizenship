import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const CustomTextField = React.forwardRef<
  HTMLInputElement,
  TextFieldProps
>((props: TextFieldProps, ref) => {
  return <TextField ref={ref} {...props} />;
});

CustomTextField.displayName = 'CustomTextField';
