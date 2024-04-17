import { useFamily } from 'components/hooks/useFamily';
import { CustomJsonForm } from 'components/molecules/CustomJsonForm';
import { useForm } from 'react-hook-form';
import birthCertificateSchema from 'schemas/birthCertificate';
import {
  IBirthCertificateData,
  IDeathCertificateData,
  IMarriageCertificateData,
  MemberDocumentType,
} from 'types/document';

import Form, { IChangeEvent } from '@rjsf/core';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import deathCertificateSchema from 'schemas/deathCertificate';
import marriageCertificateSchema from 'schemas/marriagehCertificate';
import styled from 'styled-components';

const CustomForm = styled(CustomJsonForm)`
  && {
    padding-bottom: 4rem;
    box-sizing: border-box;
  }
`;

interface IDocumentDataFormProps {
  documentData:
    | IBirthCertificateData
    | IDeathCertificateData
    | IMarriageCertificateData;
  last: boolean;
  onSubmit: ({
    data,
  }: {
    data: IChangeEvent;
  }) => Promise<AxiosResponse | undefined>;
}

const DocumentDataForm = React.forwardRef<Form, IDocumentDataFormProps>(
  ({ documentData, onSubmit }: IDocumentDataFormProps, ref) => {
    const { members, family } = useFamily();

    const { handleSubmit, control, getValues } = useForm({
      defaultValues: documentData,
    });

    useEffect(() => {
      if (documentData.documentType === MemberDocumentType.BIRTH_CERTIFICATE)
        console.log({
          defaultValues: documentData,
        });
    }, [members, family, control, documentData, getValues, handleSubmit]);

    return (
      <CustomForm
        columns={{ xs: 6, lg: 4, xl: 3 }}
        formData={documentData}
        onSubmit={(data) => {
          return onSubmit({ data });
        }}
        ref={ref}
        schema={
          documentData.documentType === MemberDocumentType.BIRTH_CERTIFICATE
            ? birthCertificateSchema
            : documentData.documentType === MemberDocumentType.DEATH_CERTIFICATE
              ? deathCertificateSchema
              : documentData.documentType ===
                  MemberDocumentType.MARRIAGE_CERTIFICATE
                ? marriageCertificateSchema
                : birthCertificateSchema
        }
        spacing={4}
      >
        {' '}
        {''}
        {/* <DialogActions>
        <CustomButton
          endIcon={<KeyboardDoubleArrowRightIcon />}
          loading={false}
          size='large'
          type='submit'
          variant='contained'
        >
          {last ? '' : 'Next'}
        </CustomButton>
      </DialogActions> */}
      </CustomForm>
    );
  }
);

DocumentDataForm.displayName = 'DocumentDataForm';

export default DocumentDataForm;
