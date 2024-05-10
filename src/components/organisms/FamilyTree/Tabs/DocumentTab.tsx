import { Alert, Box, Grid } from '@mui/material';
import { useDocumentTab } from 'components/hooks/useDocumentTab';
import SetDocumentTypePreview from '../../../atoms/SetDocumentTypePreview';

export function DocumentTab() {
  const {
    documents,
    handleDocumentType,
    deleteDocument: handleDeleteDocument,
    hasSameType,
    hasUnknown,
    hasBirthCertificate,
  } = useDocumentTab();

  return (
    <Box mt={5} px={4}>
      {documents?.some((document) => document.processing) && (
        <Alert severity='info' sx={{ marginBottom: '1rem' }}>
          We are converting your image(s) to text, please wait a moment
        </Alert>
      )}

      {!hasUnknown && hasSameType && (
        <Alert severity='error' sx={{ margin: '1rem 0' }}>
          You must select only one document type
        </Alert>
      )}

      {hasUnknown && (
        <Alert severity='warning' sx={{ margin: '1rem 0' }}>
          You should select all the document types
        </Alert>
      )}

      {documents.length && !hasBirthCertificate && (
        <Alert severity='warning' sx={{ margin: '1rem 0' }}>
          It&apos;s necessary to have a birth certificate
        </Alert>
      )}

      <Grid container spacing={5}>
        {documents &&
          Object.values(documents).map((document) => {
            return (
              <Grid item key={document._id} xs={4}>
                <SetDocumentTypePreview
                  onDelete={(id) => handleDeleteDocument(id)}
                  setDocumentType={handleDocumentType}
                  {...document}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
