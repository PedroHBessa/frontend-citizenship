import { useTabStore } from 'components/stores/useTabStore';
import React, { MutableRefObject, createContext, useEffect } from 'react';
import { Api } from '../../api/Api';
import Configuration from '../../config/Configuration';
import { useFamily } from '../hooks/useFamily';

export type Tab = {
  id: string;
  title: string;
  content: string;
};

type Submit = (id: string) => Promise<void> | null;

export type TypeComponent = {
  tabs: Tab[];
  currentId: string;
  currentMemberId: string | null;
  currentMarriageId: string | null;
  onSubmit?: MutableRefObject<Submit>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  setCurrentId: (id: string) => void;
  setCurrentMemberId: (id: string | null) => void;
  createNewMember: (value: {
    gender: string;
    parents: string;
  }) => Promise<string>;
  setCurrentMarriageId: (id: string) => void;
};

interface NewMemberApiResponse {
  newFamilyMemberId: string;
}

const api = new Api();

const TabContext = createContext<TypeComponent>({
  tabs: [],
  currentMemberId: null,
  setCurrentMemberId: () => {},
  currentId: '',
  setCurrentId: () => {},
  createNewMember: async () => '',
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
  const config = new Configuration();
  const { family, members } = useFamily();

  const currentId = useTabStore((state) => state.currentId);
  const currentMemberId = useTabStore((state) => state.currentMemberId);
  const currentMarriageId = useTabStore((state) => state.currentMarriageId);

  const setCurrentMarriageId = useTabStore(
    (state) => state.setCurrentMarriageId
  );
  const setCurrentMemberId = useTabStore((state) => state.setCurrentMemberId);
  const setCurrentId = useTabStore((state) => state.setCurrentId);

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const onSubmit = React.useRef(null as unknown as Submit); // eslint-disable-line @typescript-eslint/no-empty-function

  const createNewMember = async ({
    gender,
    parents,
  }: {
    gender: string;
    parents: string;
  }) => {
    const targetUrl = config.getRouteWithVars(config.endpoint.post.member, {
      familyId: family._id,
    });

    const response = await api.post(targetUrl, {
      gender,
      primaryParentId: parents,
      // secondaryParentId: parentsIds[1],
    });

    const memberId = (response.data as NewMemberApiResponse).newFamilyMemberId;

    setCurrentMemberId(memberId);

    return memberId;
  };

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
        createNewMember,
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
