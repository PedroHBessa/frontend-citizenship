import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const TextFormField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
    return <TextField ref={ref} {...props} />;
  }
);

TextFormField.displayName = 'TextFormField';
