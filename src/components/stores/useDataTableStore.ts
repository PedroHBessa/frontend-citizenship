import { create, StoreApi, UseBoundStore } from 'zustand';

type State = number | string | (string | number | boolean)[];

type DataTableStore = {
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  selected: number[];
  actions: {
    setState: (key: string, value: State) => void;
  };
};
export const ROWS_PER_PAGE = 100;
export const useDataTableStore: UseBoundStore<StoreApi<DataTableStore>> =
  create((set) => ({
    page: 0,
    rowsPerPage: ROWS_PER_PAGE,
    order: 'desc',
    orderBy: 'createdAt',
    selected: [],
    actions: {
      setState: (key: string, value: State) => set(() => ({ [key]: value })),
    },
  }));
