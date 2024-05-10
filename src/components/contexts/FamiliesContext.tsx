import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode, createContext } from 'react';
import { Api } from '../../api/Api';
import Configuration from '../../config/Configuration';
import { Data } from '../../types/data';
import { useAlert } from '../hooks/useAlert';
import { useFamiliesStore } from '../stores/useFamiliesStore';
import { MessageType } from './AlertContext';

type FamiliesContextType = {
  rows: Data[];
  loading: boolean;
  initialized: boolean;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  addNew: (data: Data) => void;
  deleteData: (rows: number[]) => void;
};

const FamiliesContext = createContext<FamiliesContextType | null>({
  rows: [],
  loading: false,
  initialized: false,
  openModal: false,
  setOpenModal: () => {},
  addNew: () => {},
  deleteData: () => {},
});

type FamiliesApiResponse = {
  families: Data[];
};

const api = new Api();

function FamiliesContextProvider({ children }: { children: ReactNode }) {
  const openModal = useFamiliesStore((state) => state.openModal);
  const setOpenModal = useFamiliesStore((state) => state.setOpenModal);
  const { setAlertMessage } = useAlert();

  const queryKey = ['families'];
  const queryClient = useQueryClient();

  const config = new Configuration();

  const {
    isLoading: loading,
    isFetched: initialized,
    data: rows,
  } = useQuery<Data[]>({
    queryKey,
    queryFn: async () => {
      const response = await api.get(config.endpoint.get.families);

      return (response.data as FamiliesApiResponse).families;
    },
  });

  const { mutate: addNew } = useMutation({
    mutationFn: async (data: Data) => {
      return api.post(config.endpoint.post.family, data);
    },
    onSuccess: () => {
      setAlertMessage({
        type: MessageType.success,
        message: 'Adding a new entry is successful',
      });
      setOpenModal(false);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      setAlertMessage({
        type: MessageType.error,
        message: 'Error on adding a new entry',
      });
    },
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: async (rows: number[]) => {
      return Promise.all(
        rows.map(async (row) =>
          api.delete(`${config.endpoint.delete.family}/${row}`)
        )
      );
    },
    onSuccess: () => {
      setAlertMessage({
        type: MessageType.success,
        message: 'Deleting entries is successful',
      });
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      setAlertMessage({
        type: MessageType.error,
        message: 'Error on deleting entries',
      });
    },
  });

  return (
    <FamiliesContext.Provider
      value={{
        rows: rows ?? [],
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
