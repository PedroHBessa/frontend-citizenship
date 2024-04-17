import React, { createContext, ReactNode } from 'react';

type Pin = {
  id: string;
  label: string;
};

type PinnedContextType = {
  pinned: Pin[];
  togglePinned: (item: Pin) => void;
};

const PinnedContext = createContext<PinnedContextType | null>({
  pinned: [],
  togglePinned: () => {},
});

const LOCAL_STORAGE_KEY = 'pinned';

function PinnedContextProvider({ children }: { children: ReactNode }) {
  const [pinned, setPinned] = React.useState(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
      : []
  );

  const togglePinned = ({ id, label }: Pin) => {
    let newPinned = [...pinned];

    if (newPinned.some((item) => item.id === id)) {
      newPinned = newPinned.filter((item) => item.id !== id);
    } else {
      newPinned.push({ id, label });
    }
    setPinned(newPinned.reverse().slice(0, 3));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPinned));
  };

  return (
    <PinnedContext.Provider value={{ pinned, togglePinned }}>
      {children}
    </PinnedContext.Provider>
  );
}

export { PinnedContext, PinnedContextProvider };
