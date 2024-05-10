import { Box, FormLabel, Grid } from '@mui/material';
import FormCore, { FormProps } from '@rjsf/core';
import Form from '@rjsf/mui';
import {
  ObjectFieldTemplateProps,
  RJSFSchema,
  RegistryFieldsType,
} from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { TextFieldMaskField } from 'components/atoms/TextFieldMask';
import React from 'react';

interface Columns {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export type ErrorForm = RJSFSchema & { addError: (message: string) => void };

interface CustomJsonFormProps {
  formData?: object;
  columns?: Columns;
  schema: RJSFSchema;
  spacing?: number;
  onChange?: FormProps['onChange'];
  onSubmit?: FormProps['onSubmit'];
  onError?: FormProps['onError'];
  children?: React.ReactNode;
  customValidation?: (formData: object, errors: ErrorForm) => RJSFSchema;
}

const CustomJsonForm = React.forwardRef<FormCore, CustomJsonFormProps>(
  (
    {
      schema,
      columns,
      spacing,
      children,
      customValidation,
      ...rest
    }: CustomJsonFormProps,
    ref
  ) => {
    function CustomFieldTemplate(props: ObjectFieldTemplateProps) {
      return (
        <>
          <>
            <Box>
              <FormLabel>{props.title}</FormLabel>
              {props.description}
            </Box>
            <Grid container my={2} spacing={spacing}>
              {props.properties?.map((element) => (
                <Grid
                  item
                  key={`form-element-${element.name}`}
                  {...(element.content.props.schema.type !== 'object'
                    ? columns
                    : { xs: 12 })}
                >
                  {element.content}
                </Grid>
              ))}
            </Grid>
          </>
        </>
      );
    }

    const customValidate = customValidation
      ? (formData: object, errors: ErrorForm) => {
          const result = customValidation(formData, errors);

          return result as ErrorForm;
        }
      : undefined;

    const fields: RegistryFieldsType = { cpf: TextFieldMaskField };

    return (
      <Form
        {...rest}
        customValidate={customValidate}
        fields={fields}
        ref={ref}
        schema={schema}
        templates={{ ObjectFieldTemplate: CustomFieldTemplate }}
        validator={validator}
      >
        {children}
      </Form>
    );
  }
);

CustomJsonForm.displayName = 'CustomJsonForm';

export { CustomJsonForm };
