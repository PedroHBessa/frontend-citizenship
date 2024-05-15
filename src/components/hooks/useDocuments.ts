import { IChangeEvent } from '@rjsf/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { Api } from '../../api/Api';
import Configuration from '../../config/Configuration';
import { MemberDocument } from '../../types/document';
import { useFamily } from './useFamily';
import { useTab } from './useTab';

export type DocumentsResponse = {
  documents: MemberDocument[];
};

export type DocumentsRequest = {
  documentId: string;
  documentType: string;
};

export type DocumentRequest = {
  data: IChangeEvent;
  document: MemberDocument;
};

const INTERVAL_TIME = 1000;

const api = new Api();
const config = new Configuration();

export function useDocuments() {
  const { family, update: updateFamily } = useFamily();
  const { currentMemberId: memberId } = useTab();
  const timeout = useRef<number | null>(null);

  const queryKey = ['documents', memberId];
  const queryClient = useQueryClient();

  /**
   * Function to invalidate the documents query.
   */
  const invalidate = useCallback(
    async (memberId: string) => {
      queryClient.invalidateQueries({ queryKey: ['documents', memberId] });
    },
    [queryClient]
  );

  const {
    isLoading: loading,
    data: documents,
    refetch: fetchData,
  } = useQuery<MemberDocument[]>({
    queryKey,
    // enabled: !!memberId,
    queryFn: async () => {
      if (!memberId) {
        return [];
      }
      const response = await api.get(
        config.getRouteWithVars(config.endpoint.get.documents, {
          familyId: family._id,
          memberId: memberId,
        })
      );

      return (response.data as DocumentsResponse).documents;
    },
  });

  /**
   * Custom hook for setting document types.
   * @returns {Object} - The mutate function for setting document types.
   */
  const { mutate: setDocumentsTypes } = useMutation({
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: async () => {
      updateFamily();
    },
    mutationFn: async (documents: DocumentsRequest[]) => {
      if (!memberId) return;

      const targetUrl = config.getRouteWithVars(
        config.endpoint.patch.documentsType,
        {
          familyId: family._id,
        }
      );

      await api.patch(targetUrl, { documents });
    },
  });

  /**
   * Custom hook for updating document data.
   * @returns A function to update document data.
   */
  const { mutateAsync: updateDocumentData } = useMutation({
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: async () => {
      updateFamily();
    },
    mutationFn: async ({ data, document }: DocumentRequest) => {
      if (!memberId) {
        return;
      }

      const targetUrl = config.getRouteWithVars(
        config.endpoint.patch.documentData,
        {
          familyId: family._id,
          memberId,
          documentId: document._id,
        }
      );

      const response = await api.patch(targetUrl, {
        data: data.formData,
      });

      return response;
    },
  });

  /**
   * Custom hook for updating document data.
   * @returns A function to update document data.
   */
  const { mutateAsync: deleteDocument } = useMutation({
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: async () => {
      updateFamily();
    },
    mutationFn: async (id: string) => {
      if (!memberId) {
        return;
      }

      const targetUrl = config.getRouteWithVars(
        config.endpoint.delete.document,
        {
          familyId: family._id,
          memberId,
          documentId: id,
        }
      );

      const response = await api.delete(targetUrl);

      return response;
    },
  });

  const processing =
    documents?.some((document) => document.processing) ?? false;

  /**
   * Check if any documents are processing and invalidate the query if they are.
   */
  useEffect(() => {
    timeout.current = window.setInterval(() => {
      if (documents?.some((document) => document.processing)) {
        memberId && invalidate(memberId);
      }
    }, INTERVAL_TIME);

    return () => {
      if (timeout.current) {
        clearInterval(timeout.current);
      }
    };
  }, [documents, fetchData, invalidate, memberId]);

  console.log(documents, 'documents');

  return {
    documents,
    loading,
    fetchData,
    processing,
    setDocumentsTypes,
    invalidate,
    updateDocumentData,
    deleteDocument,
  };
}
