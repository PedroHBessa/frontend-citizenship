import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosProgressEvent } from 'axios';
import { useDocuments } from 'components/hooks/useDocuments';
import { useTabStore } from 'components/stores/useTabStore';
import React, { createContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../api/Api';
import Configuration from '../../config/Configuration';
import { Data } from '../../types/data';
import { useFamilyStore } from '../stores/useFamilyStore';

export type FamilyTreeMember = {
  id?: string;
  _id?: string;
  name: string;
  spouses: FamilyTreeMember[];
  status: string;
  parents: FamilyTreeMember[];
};

type NewMemberProps = {
  gender: string;
  parents: string;
};

type NewMemberApiResponse = {
  newFamilyMemberId: string;
};

type UploadFormProps = {
  url: string;
  formData: FormData;
  onProgress: (progress: number) => void;
};

type FamilyContext = {
  family: Data;
  members: Data[];
  tree: Node[] & FamilyTreeMember[];
  loading: boolean;
  initialized: boolean;
  openModal?: boolean;
  isUploading?: boolean;
  setOpenModal: (value: boolean) => void;
  update: () => void;
  createNewMember: (data: NewMemberProps) => Promise<unknown>;
  uploadForm: (data: UploadFormProps) => void;
  deleteMember: (memberId: string) => void;
};
// eslint-disable-next-line
const FamilyContext = createContext<FamilyContext | null>({
  family: {},
  members: [],
  loading: false,
  initialized: false,
  isUploading: false,
  tree: [],
  update: () => {},
  setOpenModal: () => {},
  createNewMember: async (_: NewMemberProps) => {}, // Fix: Update the type and add async keyword
  uploadForm: () => {},
  deleteMember: () => {},
});

type FamilyApiResponse = {
  family: Data;
  familyTree: Node[] & FamilyTreeMember[];
};
const api = new Api();
const config = new Configuration();

function FamilyContextProvider({ children }: { children: React.ReactNode }) {
  const { id: familyId } = useParams();
  const { invalidate: invalidateDocumentsQuery } = useDocuments();

  const openModal = useFamilyStore((state) => state.openModal);
  const setOpenModal = useFamilyStore((state) => state.setOpenModal);
  const currentMemberId = useTabStore((state) => state.currentMemberId);
  const setCurrentMemberId = useTabStore((state) => state.setCurrentMemberId);

  const queryKey = ['families', familyId];
  const queryClient = useQueryClient();

  /**
   * Fetches family data from the API and provides it to the component.
   * @returns An object containing the loading state, initialization state, fetched data, and a function to refetch the data.
   */
  const {
    isLoading: loading,
    isFetched: initialized,
    data,
    refetch: fetchData,
  } = useQuery<FamilyApiResponse>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(
        `${config.endpoint.get.families}/${familyId}`
      );

      return response.data as FamilyApiResponse;
    },
  });

  /**
   * Creates a new member using the provided gender and parent IDs.
   *
   * @param {Object} props - The properties for creating a new member.
   * @param {string} props.gender - The gender of the new member.
   * @param {string[]} props.parents - The IDs of the parents of the new member.
   * @returns {Promise<void>} - A promise that resolves when the new member is created.
   */
  const { mutateAsync: createNewMember } = useMutation({
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    mutationFn: async ({
      gender,
      parents,
    }: NewMemberProps): Promise<string> => {
      const targetUrl = config.getRouteWithVars(config.endpoint.post.member, {
        familyId: family._id,
      });

      const [primaryParentId, marriageCertificateId] = parents.split(',');

      const response = await api.post(targetUrl, {
        gender,
        primaryParentId,
        ...(marriageCertificateId ? { marriageCertificateId } : {}),
      });

      return (response.data as NewMemberApiResponse).newFamilyMemberId;
    },
    onSuccess: (newFamilyMemberId: string) => {
      setCurrentMemberId(newFamilyMemberId);
    },
  });

  /**
   * Uploads a form using the provided URL, form data, and progress callback.
   *
   * @param url - The URL to send the form data to.
   * @param formData - The form data to be sent.
   * @param onProgress - A callback function to track the upload progress.
   * @returns A Promise that resolves to the response from the server.
   */
  const { mutate: uploadForm, isPending: isUploading } = useMutation({
    onSettled: async () => {
      currentMemberId && (await invalidateDocumentsQuery(currentMemberId));

      return queryClient.invalidateQueries({ queryKey });
    },
    mutationFn: async ({ url, formData, onProgress }: UploadFormProps) => {
      return api.post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress =
            (progressEvent.loaded / (progressEvent.total ?? 100)) * 100;

          onProgress(progress);
        },
      });
    },
  });

  const { mutate: deleteMember } = useMutation({
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    mutationFn: async (memberId: string) => {
      const targetUrl = config.getRouteWithVars(config.endpoint.delete.member, {
        familyId: family._id,
        memberId,
      });

      return api.delete(targetUrl);
    },
  });

  /**
   * Returns the family tree data with lineage members sorted by the number of parents they have.
   * @returns {Node[] & FamilyTreeMember[]} The sorted family tree data.
   */
  const tree = useMemo(() => {
    if (!data?.familyTree) {
      return [];
    }

    const onlyLineage = data?.familyTree
      .filter(
        (person: FamilyTreeMember | Node) =>
          (person as FamilyTreeMember).status.length > 0
      )
      .sort(
        (a, b) =>
          (a as unknown as FamilyTreeMember).parents.length -
          (b as unknown as FamilyTreeMember).parents.length
      );

    const rest = data?.familyTree.filter(
      (person: FamilyTreeMember | Node) =>
        (person as FamilyTreeMember).status.length === 0
    );

    return [...onlyLineage, ...rest] as Node[] & FamilyTreeMember[];
  }, [data?.familyTree]);

  const family = useMemo(() => data?.family || {}, [data]);
  const members = family?.members || [];

  return (
    <FamilyContext.Provider
      value={{
        createNewMember,
        deleteMember,
        family,
        initialized,
        isUploading,
        loading,
        members,
        openModal,
        setOpenModal,
        tree,
        update: fetchData,
        uploadForm,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export { FamilyContext, FamilyContextProvider };
