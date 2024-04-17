import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface SelectFormFieldProps {
  options: { value: string; label: string }[];
  label: string;
  setSelectedFamily: React.Dispatch<React.SetStateAction<any>>;
}

export const SelectFormField = React.forwardRef<
  HTMLSelectElement,
  SelectFormFieldProps
>(({ options, label, setSelectedFamily, ...props }, ref) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='select-form-field-label'>{label}</InputLabel>
      <Select
        onChange={(e) => {
          setSelectedFamily(e.target.value);
        }}
        {...props}
        ref={ref}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

SelectFormField.displayName = 'SelectFormField';
