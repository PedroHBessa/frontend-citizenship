import { Alert, Grid, LinearProgress } from '@mui/material';
import DocumentDataForm from 'components/molecules/DocumantDataForm/DocumentDataForm';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styled } from 'styled-components';
import { useDocuments } from '../../../hooks/useDocuments';

import DescriptionIcon from '@mui/icons-material/Description';
import Form, { IChangeEvent } from '@rjsf/core';
import { Api } from 'api/Api';
import { TextButtonTab } from 'components/atoms/TextButtonTab';
import { useFamily } from 'components/hooks/useFamily';
import { useTab } from 'components/hooks/useTab';
import Configuration from 'config/Configuration';
import { grayScale } from 'theme/variants';
import { MemberDocument } from 'types/document';

interface TabContentProps {
  id: string;
  children: React.ReactNode;
  selected: boolean;
  processing?: boolean;
}

const Component = styled.div<{ selected?: boolean; processing?: boolean }>`
  display: ${(props) => (props.selected ? 'block' : 'none')};
  pointer-events: ${(props) => (props.processing ? 'none' : 'all')};
  opacity: ${(props) => (props.processing ? 0.5 : 1)};
  overflow-y: auto;
`;

export function TabContent(props: TabContentProps) {
  return props.selected ? (
    <Component processing={props.processing} selected={props.selected}>
      <>{props.children}</>
    </Component>
  ) : (
    <></>
  );
}

const TabNavigationComponent = styled.div`
  /* box-sizing: border-box;
  top: -75px;
  position: absolute;
  left: 0;
  height: 70px;
  z-index: 2; */
  border-bottom: 1px solid ${grayScale[50]};
`;

export function TabNavigation({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: {
    id: string;
    icon: ReactNode;
    label: string;
  }[];
  currentTab: string | null;
  setCurrentTab: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <TabNavigationComponent>
      <Grid container display='flex' spacing={2}>
        {tabs.map((tab) => (
          <Grid item key={`icon-item-${tab.id}`}>
            <TextButtonTab
              // active={currentTab === tab.id}
              onClick={() => setCurrentTab(tab.id)}
              selected={currentTab === tab.id}
              startIcon={tab.icon}
            >
              {tab.label}
            </TextButtonTab>
          </Grid>
        ))}
      </Grid>
    </TabNavigationComponent>
  );
}

const DocumentsDataTabComponent = styled.div`
  position: relative;
  display: flex;
`;

const api = new Api();
const config = new Configuration();

export function DocumentsDataTab() {
  const { family, update: updateFamily } = useFamily();
  const { currentMemberId, onSubmit, setCurrentId, contentRef } = useTab();
  const { documents, processing } = useDocuments();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<Form>(null);

  useEffect(() => {
    if (currentTab === null && Object.values(documents)[0])
      setCurrentTab(Object.values(documents)[0]._id);
  }, [documents, currentTab]);

  const handleSubmit = async ({
    data,
    document,
  }: {
    data: IChangeEvent;
    document: MemberDocument;
  }) => {
    if (!currentMemberId) return;
    const targetUrl = config.getRouteWithVars(
      config.endpoint.patch.documentData,
      {
        familyId: family._id,
        memberId: currentMemberId,
        documentId: document._id,
      }
    );

    const response = await api.patch(targetUrl, {
      data: data.formData,
    });

    return response;
  };

  // const handleSubmitAll = useCallback(async () => {
  //   const map = new Map();

  //   forms.current.forEach((form) => {
  //     if (form) {
  //       map.set(form?.props.schema.title, form?.submit);
  //     }
  //   });

  //   console.log(forms.current, map);

  //   try {
  //     const values = Array.from(map.values());

  //     for (let i = 0; i < values.length; i++) {
  //       await values[i]();
  //     }

  //     setCurrentId('4');
  //     updateFamily();
  //   } catch (error) {
  //     console.error(error);
  //     setError('There are some errors in the form, please check again');
  //   }
  // }, [forms, setCurrentId, updateFamily]);

  const handleSubmitForms = useCallback(async () => {
    if (!currentMemberId) return;

    const forms = formRef.current;

    if (!forms) return;

    try {
      const currentIndex = documents.findIndex(
        (document) => document._id === currentTab
      );

      await forms.submit();

      if (currentIndex === documents.length - 1) {
        setCurrentTab(null);
        setCurrentId('4');
      } else {
        contentRef.current?.scrollTo(0, 0);
        setCurrentTab(documents[currentIndex + 1]?._id || null);
      }

      setTimeout(() => {
        updateFamily();
      }, 1500);
    } catch (error) {
      console.error(error);
      setError('There are some errors in the form, please check again');
    }
  }, [
    contentRef,
    currentMemberId,
    currentTab,
    documents,
    setCurrentId,
    updateFamily,
  ]);

  useEffect(() => {
    if (onSubmit) onSubmit.current = handleSubmitForms;
  }, [handleSubmitForms, onSubmit]);

  return (
    <DocumentsDataTabComponent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {documents.some((document) => document.processing) && (
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
            tabs={Object.values(documents).map((document) => {
              return {
                id: document._id,
                icon: <DescriptionIcon />,
                label: document.documentType,
              };
            })}
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
          {documents.map((document) => {
            return (
              <TabContent
                id={document._id}
                key={`document-tab-${document._id}`}
                processing={processing}
                selected={document._id === currentTab}
              >
                <DocumentDataForm
                  documentData={document}
                  last={false}
                  onSubmit={async ({ data }: { data: IChangeEvent }) => {
                    return handleSubmit({ data, document });
                  }}
                  ref={formRef}
                />
              </TabContent>
            );
          })}
        </Grid>
      </Grid>
    </DocumentsDataTabComponent>
  );
}
