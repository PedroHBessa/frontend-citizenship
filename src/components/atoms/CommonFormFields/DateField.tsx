import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DateFormField = React.forwardRef<HTMLInputElement>(
  (props, ref) => {
    return <DatePicker {...props} ref={ref} />;
  }
);

DateFormField.displayName = 'DateFormField';
