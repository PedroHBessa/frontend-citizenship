import React, { createContext, useCallback, useEffect } from 'react';
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

type FamilyContext = {
  family: Data;
  members: Data[];
  tree: Node[] & FamilyTreeMember[];
  loading: boolean;
  initialized: boolean;
  openModal?: boolean;
  setOpenModal: (value: boolean) => void;
  update: () => void;
};

const FamilyContext = createContext<FamilyContext | null>({
  family: {},
  members: [],
  loading: false,
  initialized: false,
  tree: [],
  update: () => {},
  setOpenModal: () => {},
});

type FamilyApiResponse = {
  family: Data;
  familyTree: Node[] & FamilyTreeMember[];
};
const api = new Api();

function FamilyContextProvider({ children }: { children: React.ReactNode }) {
  const family = useFamilyStore((state) => state.family);
  const members = useFamilyStore((state) => state.members);
  const loading = useFamilyStore((state) => state.loading);
  const initialized = useFamilyStore((state) => state.initialized);
  const tree = useFamilyStore((state) => state.tree);
  const openModal = useFamilyStore((state) => state.openModal);
  const setOpenModal = useFamilyStore((state) => state.setOpenModal);
  const setFamily = useFamilyStore((state) => state.setFamily);
  const setMembers = useFamilyStore((state) => state.setMembers);
  const setLoading = useFamilyStore((state) => state.setLoading);
  const setInitialized = useFamilyStore((state) => state.setInitialized);
  const setTree = useFamilyStore((state) => state.setTree);

  const config = new Configuration();
  const { id: familyId } = useParams();
  /**
   * Fetch families data from the API
   */
  const fetchData = useCallback(() => {
    setLoading(true);
    api
      .get(`${config.endpoint.get.families}/${familyId}`)
      .then((response) => {
        const _family = (response.data as FamilyApiResponse).family;

        const onlyLineage = (response.data as FamilyApiResponse).familyTree
          .filter(
            (person: FamilyTreeMember | Node) =>
              (person as FamilyTreeMember).status.length > 0
          )
          .sort(
            (a, b) =>
              (a as unknown as FamilyTreeMember).parents.length -
              (b as unknown as FamilyTreeMember).parents.length
          );

        const rest = (response.data as FamilyApiResponse).familyTree.filter(
          (person: FamilyTreeMember | Node) =>
            (person as FamilyTreeMember).status.length === 0
        );

        setFamily(_family);
        setMembers(_family.members);
        setTree([...onlyLineage, ...rest] as Node[] & FamilyTreeMember[]);
      })
      .finally(() => {
        setLoading(false);
        setInitialized(true);
      });
  }, [
    setLoading,
    setMembers,
    config.endpoint.get.families,
    familyId,
    setFamily,
    setInitialized,
    setTree,
  ]);

  /**
   * Fetch families data from the API
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <FamilyContext.Provider
      value={{
        family,
        members,
        loading,
        initialized,
        tree,
        update: fetchData,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export { FamilyContext, FamilyContextProvider };
