import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

interface RadioFormFieldProps extends FormControlLabelProps {
  options: { value: string; label: string }[];
  label: string;
}

export const RadioFormField = React.forwardRef<
  HTMLInputElement,
  RadioFormFieldProps
>(({ options, label, ...props }, ref) => {
  return (
    <FormControl ref={ref}>
      <FormLabel id='radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup
        aria-labelledby='radio-buttons-group-label'
        defaultValue='female'
        name='radio-buttons-group'
      >
        {options.map((option, index) => (
          <FormControlLabel
            {...props}
            control={<Radio />}
            key={`form-control-label-${index}-${option.value}`}
            label={option.label}
            value={option.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
});

RadioFormField.displayName = 'RadioFormField';
