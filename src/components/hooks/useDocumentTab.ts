import { TABS } from 'components/contexts/TabContext';
import { useCallback, useEffect, useState } from 'react';
import { MemberDocumentType } from 'types/document';
import { DocumentsRequest, useDocuments } from './useDocuments';
import { useTab } from './useTab';

/**
 * Custom hook for managing the document tab functionality.
 * This hook handles the document types and the next step in the document tab.
 * @returns An object containing the documents and the handleDocumentType function.
 */
export function useDocumentTab() {
  const { setCurrentId, currentMemberId, onSubmit } = useTab();
  const {
    documents: _documents,
    setDocumentsTypes,
    deleteDocument,
  } = useDocuments();

  const [documents, setDocuments] = useState(_documents ?? []);

  const hasSameType =
    new Set(Object.values(documents).map((doc) => doc.documentType)).size !==
    documents?.length;
  const hasUnknown = documents?.some(
    (document) => document.documentType === MemberDocumentType.UNKNOWN
  );
  const hasBirthCertificate = documents?.some(
    (document) => document.documentType === MemberDocumentType.BIRTH_CERTIFICATE
  );

  /**
   * Updates the document type for a specific document.
   * @param id - The ID of the document.
   * @param type - The new document type.
   */
  const handleDocumentType = useCallback(
    async (id: string, type: MemberDocumentType) => {
      setDocuments((documents) =>
        documents.map((document) => ({
          ...document,
          ...(document._id === id ? { documentType: type } : {}),
        }))
      );
    },
    []
  );

  /**
   * Function that handles the next step in the document tab.
   * It checks if the current member ID is available and if there are any documents with an unknown document type.
   * If all conditions are met, it sets the document types and updates the current ID to the third tab.
   */
  const nextStep = useCallback(async () => {
    if (
      !currentMemberId ||
      hasUnknown ||
      !hasBirthCertificate ||
      (!hasUnknown && hasSameType)
    )
      return;

    setDocumentsTypes(
      Object.values(documents).map((document) => {
        return {
          documentId: document._id,
          documentType: document.documentType,
        } as DocumentsRequest;
      })
    );

    setCurrentId(TABS.THIRD);
  }, [
    currentMemberId,
    hasUnknown,
    hasBirthCertificate,
    hasSameType,
    setDocumentsTypes,
    documents,
    setCurrentId,
  ]);

  useEffect(() => {
    if (!_documents) {
      return;
    }
    setDocuments(_documents);
  }, [_documents]);

  if (onSubmit) {
    onSubmit.current = nextStep;
  }

  return {
    documents,
    handleDocumentType,
    deleteDocument,
    hasSameType,
    hasUnknown,
    hasBirthCertificate,
  };
}
