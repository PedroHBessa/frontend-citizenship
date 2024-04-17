import { MemberDocumentType } from '../types/document';
import { Api } from './Api';

const familyMemberAPI = new Api();

export const setDocumentTypesRequest = async ({
  url,
  documents,
}: {
  url: string;
  documents: { documentId: string; documentType: MemberDocumentType }[];
}) => {
  await familyMemberAPI.patch(
    url,
    {
      documents,
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  );
};
