import React, { createContext, ReactNode, useCallback, useEffect } from 'react';
import { useFamiliesStore } from '../stores/useFamiliesStore';
import Configuration from '../../config/Configuration';
import { Api } from '../../api/Api';
import { Data } from '../../types/data';
import { useAlert } from '../hooks/useAlert';
import { MessageType } from './AlertContext';

type FamiliesContextType = {
  rows: Data[];
  loading: boolean;
  initialized: boolean;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  addNew: (data: Data) => void;
  deleteData: (rows: number[]) => Promise<void>;
};

const FamiliesContext = createContext<FamiliesContextType | null>({
  rows: [],
  loading: false,
  initialized: false,
  openModal: false,
  setOpenModal: () => {},
  addNew: () => {},
  deleteData: () => {
    return Promise.resolve();
  },
});

type FamiliesApiResponse = {
  families: Data[];
};
const api = new Api();

function FamiliesContextProvider({ children }: { children: ReactNode }) {
  const rows = useFamiliesStore((state) => state.rows);
  const setRows = useFamiliesStore((state) => state.setRows);
  const loading = useFamiliesStore((state) => state.loading);
  const setLoading = useFamiliesStore((state) => state.setLoading);
  const initialized = useFamiliesStore((state) => state.initialized);
  const setInitialized = useFamiliesStore((state) => state.setInitialized);
  const openModal = useFamiliesStore((state) => state.openModal);
  const setOpenModal = useFamiliesStore((state) => state.setOpenModal);

  const { setAlertMessage } = useAlert();

  const config = new Configuration();

  /**
   * Fetch families data from the API
   */
  const fetchData = useCallback(() => {
    setLoading(true);
    api
      .get(config.endpoint.get.families)
      .then((response) => {
        setRows((response.data as FamiliesApiResponse).families);
      })
      .finally(() => {
        setLoading(false);
        setInitialized(true);
      });
  }, [setLoading, config.endpoint.get.families, setRows, setInitialized]);

  /**
   * Add a new family
   * @param data
   */
  const addNew = async (data: Data) => {
    setLoading(true);
    try {
      await api.post(config.endpoint.post.family, data);
      setAlertMessage({
        type: MessageType.success,
        message: 'Adding a new entry is successful',
      });
      fetchData();
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: MessageType.error,
        message: 'Error on adding a new entry',
      });
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  const deleteData = async (rows: number[]) => {
    setLoading(true);
    try {
      await Promise.all(
        rows.map(async (row) =>
          api.delete(`${config.endpoint.delete.family}/${row}`)
        )
      );
      setAlertMessage({
        type: MessageType.success,
        message: 'Deleting entries is successful',
      });
      fetchData();
    } catch (error) {
      console.error(error);
      setAlertMessage({
        type: MessageType.error,
        message: 'Error on deleting entries',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch families data from the API
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <FamiliesContext.Provider
      value={{
        rows,
        loading,
        initialized,
        openModal,
        setOpenModal,
        addNew,
        deleteData,
      }}
    >
      {children}
    </FamiliesContext.Provider>
  );
}

export { FamiliesContext, FamiliesContextProvider };
