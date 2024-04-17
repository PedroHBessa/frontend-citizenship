import { create, StoreApi, UseBoundStore } from 'zustand';
import { Data } from '../../types/data';
import _ from 'lodash';

type DataViewType = 'table' | 'cards';

type DataViewStore = {
  type: DataViewType;
  data: Data[];
  filtered: Data[];
  search: string;
  selected: number[];
  setSelected: (value: number[]) => void;
  setSearch: (value: string) => void;
  setData: (value: Data[]) => void;
  setType: (value: 'table' | 'cards') => void;
};

const LOCAL_STORAGE_TYPE_KEY = 'dataViewType';

export const useDataViewStore: UseBoundStore<StoreApi<DataViewStore>> = create(
  (set) => {
    const type =
      (localStorage.getItem(LOCAL_STORAGE_TYPE_KEY) as DataViewType) ?? 'table';

    return {
      type,
      data: [],
      filtered: [],
      search: '',
      selected: [],
      setData: (value: Data[]) => set(() => ({ data: value, filtered: value })),
      setSelected: (value: number[]) => set(() => ({ selected: value })),
      setSearch: (value: string) =>
        set((state) => {
          const valueFiltered = _.filter(state.data, (item: Data) =>
            _.some(Object.values(item), (objectValue: string) =>
              _.includes(
                String(objectValue).toLowerCase(),
                value.toLowerCase().toString()
              )
            )
          );

          return {
            search: value,
            filtered: valueFiltered,
          };
        }),
      setType: (value: 'table' | 'cards') =>
        set(() => {
          localStorage?.setItem(LOCAL_STORAGE_TYPE_KEY, value);

          return { type: value };
        }),
    };
  }
);
