import { useTabStore } from 'components/stores/useTabStore';
import React, { MutableRefObject, createContext, useEffect } from 'react';
import { useFamily } from '../hooks/useFamily';

export type Tab = {
  id: string;
  title: string;
  content: string;
};

export enum TABS {
  'FIRST' = '1',
  'SECOND' = '2',
  'THIRD' = '3',
  'FOURTH' = '4',
}

type Submit = (id: string) => Promise<void> | null;

export type TypeComponent = {
  tabs: Tab[];
  currentId: string;
  currentMemberId: string | null;
  currentMarriageId: string[] | null;
  onSubmit?: MutableRefObject<Submit>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  setCurrentId: (id: string) => void;
  setCurrentMemberId: (id: string | null) => void;
  setCurrentMarriageId: (id: string[]) => void;
};

const TabContext = createContext<TypeComponent>({
  tabs: [],
  currentMemberId: null,
  setCurrentMemberId: () => {},
  currentId: '',
  setCurrentId: () => {},
  currentMarriageId: null,
  setCurrentMarriageId: () => {},
  contentRef: { current: null },
});

function TabContextProvider({
  children,
  id = '',
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { members } = useFamily();

  const currentId = useTabStore((state) => state.currentId);
  const currentMemberId = useTabStore((state) => state.currentMemberId);
  const currentMarriageId = useTabStore((state) => state.currentMarriageId);
  const setCurrentMemberId = useTabStore((state) => state.setCurrentMemberId);

  const setCurrentMarriageId = useTabStore(
    (state) => state.setCurrentMarriageId
  );

  const setCurrentId = useTabStore((state) => state.setCurrentId);

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const onSubmit = React.useRef(null as unknown as Submit); // eslint-disable-line @typescript-eslint/no-empty-function

  useEffect(() => {
    if (members.length === 0) {
      setCurrentMemberId(null);
    }
  }, [members, setCurrentMemberId]);

  useEffect(() => {
    if (id) {
      setCurrentId(id);
    }
  }, [id, setCurrentId]);

  return (
    <TabContext.Provider
      value={{
        tabs: [],
        currentId,
        setCurrentId,
        currentMemberId,
        setCurrentMemberId,
        onSubmit,
        currentMarriageId,
        setCurrentMarriageId,
        contentRef,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export { TabContext, TabContextProvider };
