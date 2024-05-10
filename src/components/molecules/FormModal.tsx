import { DialogActions } from '@mui/material';
import { RJSFSchema } from '@rjsf/utils';
import React from 'react';
import styled from 'styled-components';
import { grayScale, themeBackgroundColor } from '../../theme/variants';
import { Data } from '../../types/data';
import { CustomButton } from '../atoms/CustomButton';
import { CustomRightDialog } from '../atoms/CustomRightDialog';
import { CustomJsonForm, ErrorForm } from './CustomJsonForm';

interface FormModalProps {
  schema: RJSFSchema;
  submitLabel: string;
  startIcon?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  loading?: boolean;
  onSubmit?: (data: Data) => void;
}

const Actions = styled(DialogActions)`
  && {
    justify-content: flex-start;
    border-top: 1px solid ${grayScale[25]};
    padding: 0.75rem 2rem;
    box-sizing: border-box;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${themeBackgroundColor};
    z-index: 9;
  }
`;

const Form = styled(CustomJsonForm)`
  && {
    padding-bottom: 4rem;
    box-sizing: border-box;
  }
`;

const Dialog = styled(CustomRightDialog)`
  && {
  }
`;

export function FormModal({
  schema,
  submitLabel,
  startIcon,
  open = false,
  loading = false,
  onClose,
  onSubmit,
}: FormModalProps) {
  const submitButton = (
    <CustomButton
      loading={loading}
      size='large'
      startIcon={startIcon}
      type='submit'
      variant='contained'
    >
      {submitLabel}
    </CustomButton>
  );

  const handleValidation = (formData: Data, errors: ErrorForm) => {
    console.log(formData);

    return errors;
  };

  return (
    <Dialog fullScreen onClose={onClose} open={open} title='Add new Family'>
      <Form
        columns={{ xs: 6, lg: 4, xl: 3 }}
        customValidation={(formData: object, errors: ErrorForm) =>
          handleValidation(formData as Data, errors)
        }
        onSubmit={(data) => {
          onSubmit?.(data.formData as Data);
        }}
        schema={schema}
        spacing={4}
      >
        {submitLabel && <Actions>{submitButton}</Actions>}
      </Form>
    </Dialog>
  );
}
