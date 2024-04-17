import { useCallback, useEffect, useState } from 'react';
import { Api } from '../../api/Api';
import Configuration from '../../config/Configuration';
import { MemberDocument, MemberDocumentType } from '../../types/document';
import { useFamily } from './useFamily';
import { useTab } from './useTab';

type DocumentsResponse = {
  data: {
    documents: MemberDocument[];
  };
};

type DocumentResponse = {
  data: {
    document: MemberDocument[];
  };
};

export function useDocuments() {
  const { family, update: updateFamily } = useFamily();
  const [documents, setDocuments] = useState<MemberDocument[]>([]);
  const [queue, setQueue] = useState(new Set<string>());
  const [loading, setLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const { currentMemberId: memberId } = useTab();

  const fetchData = useCallback(async () => {
    if (!memberId) {
      return;
    }

    const api = new Api();
    const config = new Configuration();

    setLoading(true);
    const response = await api.get(
      config.getRouteWithVars(config.endpoint.get.documents, {
        familyId: family._id,
        memberId: memberId,
      })
    );

    setDocuments((response as unknown as DocumentsResponse).data.documents);
    setLoading(false);
  }, [memberId, family._id]);

  const processingQueue = useCallback(
    async (documentId: string) => {
      if (!memberId) {
        return;
      }
      const api = new Api();
      const config = new Configuration();

      setProcessing(true);

      const response = await api.get(
        config.getRouteWithVars(config.endpoint.get.document, {
          familyId: family._id,
          memberId: memberId,
          documentId: documentId,
        })
      );

      const document = (response as unknown as DocumentResponse).data
        .document as unknown as MemberDocument;

      if (document.processing === true) {
        // add a sleep here
        setTimeout(() => {
          processingQueue(documentId);
        }, 5 * 1000);
      } else {
        setProcessing(false);
        setQueue((prevQueue) => {
          prevQueue.delete(documentId);

          return new Set(prevQueue);
        });
        fetchData();
        updateFamily();
      }
    },
    [memberId, family._id, fetchData, updateFamily]
  );

  const setDocumentType = useCallback(
    async (documentId: string, documentType: MemberDocumentType) => {
      const document = documents.find(
        (document) => document._id === documentId
      );

      if (!document) {
        return;
      }

      document.documentType = documentType;
      setDocuments([...documents]);
    },
    [documents]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, memberId]);

  useEffect(() => {
    if (queue.size === 0) {
      return;
    }

    queue.forEach((documentId) => {
      processingQueue(documentId);
    });
  }, [queue, processingQueue]);

  useEffect(() => {
    if (!documents.length) {
      return;
    }

    setQueue(
      new Set(
        documents
          .filter((document) => document.processing === true)
          .map((document) => document._id)
      )
    );
  }, [documents]);

  return { documents, loading, fetchData, setDocumentType, processing };
}
