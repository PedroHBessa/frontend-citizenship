import Form from '@rjsf/core';
import { TABS } from 'components/contexts/TabContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDocuments } from './useDocuments';
import { useFamily } from './useFamily';
import { useTab } from './useTab';

export function useDocumentsTab() {
  const { update: updateFamily } = useFamily();
  const { currentMemberId, onSubmit, setCurrentId, contentRef } = useTab();
  const {
    documents,
    processing,
    updateDocumentData: handleUpdateDocument,
    deleteDocument: handleDeleteDocument,
  } = useDocuments();
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<Form>(null);

  const handleSubmitForms = useCallback(async () => {
    if (!currentMemberId) {
      return;
    }

    const forms = formRef.current;

    if (!forms || !documents) {
      return;
    }

    try {
      const currentIndex = documents?.findIndex(
        (document) => document._id === currentTab
      );

      const errors = forms.validateForm();

      if (!errors) {
        return;
      }

      await forms.submit();

      if (currentIndex === documents.length - 1) {
        setCurrentTab(null);
        setCurrentId(TABS.FOURTH);
      } else {
        contentRef.current?.scrollTo(0, 0);
        setCurrentTab(documents?.[currentIndex + 1]?._id || null);
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
    if (documents && currentTab === null && Object.values(documents)[0]) {
      setCurrentTab(Object.values(documents)[0]._id);
    }
  }, [documents, currentTab]);

  if (onSubmit) {
    onSubmit.current = handleSubmitForms;
  }

  return {
    currentTab,
    documents,
    error,
    formRef,
    handleUpdateDocument,
    handleDeleteDocument,
    onSubmit,
    processing,
    setCurrentTab,
  };
}
