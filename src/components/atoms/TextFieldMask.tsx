import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps } from '@rjsf/utils';
import React, { HTMLProps } from 'react';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy', {
  minYear: 1900,
  maxYear: 2099,
});

function TextMaskCustom(props: HTMLProps<HTMLInputElement>) {
  const { inputRef, ...other } = props as {
    inputRef: (ref: HTMLInputElement | null) => void;
  };

  return (
    <MaskedInput
      {...other}
      guide
      keepCharPositions
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      pipe={autoCorrectedDatePipe}
      placeholderChar={'\u2000'}
      ref={(ref) => {
        inputRef(ref ? (ref.inputElement as HTMLInputElement) : null);
      }}
    />
  );
}

export const TextFieldMask = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props: TextFieldProps, ref) => {
    return (
      <TextField
        InputProps={{
          inputComponent: TextMaskCustom,
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

export const TextFieldMaskField = (props: FieldProps) => {
  console.log(props);

  return <TextFieldMask onChange={props.onChange} />;
};

TextFieldMask.displayName = 'TextFieldMask';
