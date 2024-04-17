import { Alert, Box, Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { setDocumentTypesRequest } from '../../../../api/FamilyMemberAPI';
import Configuration from '../../../../config/Configuration';
import SetDocumentTypePreview from '../../../atoms/SetDocumentTypePreview';
import { useDocuments } from '../../../hooks/useDocuments';
import { useFamily } from '../../../hooks/useFamily';
import { useTab } from '../../../hooks/useTab';

export function DocumentTab() {
  const { family } = useFamily();
  const { setCurrentId, currentMemberId, onSubmit } = useTab();
  const { documents, setDocumentType } = useDocuments();

  const setDocumentsTypes = useCallback(async () => {
    const config = new Configuration();

    if (!currentMemberId) return;

    const targetUrl = config.getRouteWithVars(
      config.endpoint.patch.documentsType,
      {
        familyId: family._id,
        memberId: currentMemberId,
      }
    );

    await setDocumentTypesRequest({
      url: targetUrl,
      documents: Object.values(documents).map((document) => {
        return {
          documentId: document._id,
          documentType: document.documentType,
        };
      }),
    });
    setCurrentId('3');
  }, [setCurrentId, currentMemberId, documents, family._id]);

  useEffect(() => {
    if (onSubmit) onSubmit.current = setDocumentsTypes;
  }, [setDocumentsTypes, onSubmit]);

  return (
    <Box mt={5} px={4}>
      {documents.some((document) => document.processing) && (
        <Alert severity='info' sx={{ marginBottom: '1rem' }}>
          We are converting your image(s) to text, please wait a moment
        </Alert>
      )}

      <Grid container spacing={5}>
        {Object.values(documents).map((document) => {
          return (
            <Grid item key={document._id} xs={4}>
              <SetDocumentTypePreview
                setDocumentType={setDocumentType}
                {...document}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
