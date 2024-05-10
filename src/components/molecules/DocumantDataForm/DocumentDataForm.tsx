import { CustomJsonForm } from 'components/molecules/CustomJsonForm';
import birthCertificateSchema from 'schemas/birthCertificate';
import {
  IBirthCertificateData,
  IDeathCertificateData,
  IMarriageCertificateData,
  MemberDocumentType,
} from 'types/document';

import Form, { IChangeEvent } from '@rjsf/core';
import { AxiosResponse } from 'axios';
import React from 'react';
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
      </CustomForm>
    );
  }
);

DocumentDataForm.displayName = 'DocumentDataForm';

export default DocumentDataForm;
