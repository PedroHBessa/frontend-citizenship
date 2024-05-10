import { Alert, Grid, LinearProgress } from '@mui/material';
import DocumentDataForm from 'components/molecules/DocumantDataForm/DocumentDataForm';
import { styled } from 'styled-components';

import DescriptionIcon from '@mui/icons-material/Description';
import { IChangeEvent } from '@rjsf/core';
import { TabContent } from 'components/atoms/FamilyTree/DocumentsDataTab/TabContent';
import { TabNavigation } from 'components/atoms/FamilyTree/DocumentsDataTab/TabNavigation';
import { useDocumentsTab } from 'components/hooks/useDocumentsTab';

const DocumentsDataTabComponent = styled.div`
  position: relative;
  display: flex;
`;

export function DocumentsDataTab() {
  const {
    currentTab,
    documents,
    error,
    formRef,
    handleUpdateDocument,
    processing,
    setCurrentTab,
  } = useDocumentsTab();

  return (
    <DocumentsDataTabComponent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {documents?.some((document) => document.processing) && (
            <Alert severity='info' sx={{ marginBottom: '1rem' }}>
              We are finding the fields in your document, please wait a moment
            </Alert>
          )}
          {error && <Alert severity='error'>{error}</Alert>}
        </Grid>
        <Grid item xs={12}>
          <TabNavigation
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tabs={
              documents
                ? Object.values(documents).map((document) => {
                    return {
                      id: document._id,
                      icon: <DescriptionIcon />,
                      label: document.documentType,
                    };
                  })
                : []
            }
          />
        </Grid>
        <Grid item xs={12}>
          {processing && (
            <LinearProgress
              color='secondary'
              sx={{ height: '1px', marginTop: '-9px' }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {documents?.map((document) => (
            <TabContent
              id={document._id}
              key={`document-tab-${document._id}`}
              processing={document.processing}
              selected={document._id === currentTab}
            >
              <DocumentDataForm
                documentData={document}
                last={false}
                onSubmit={async ({ data }: { data: IChangeEvent }) => {
                  return handleUpdateDocument({ data, document });
                }}
                ref={formRef}
              />
            </TabContent>
          ))}
        </Grid>
      </Grid>
    </DocumentsDataTabComponent>
  );
}
