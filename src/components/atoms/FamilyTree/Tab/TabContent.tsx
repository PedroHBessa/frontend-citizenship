import React from 'react';
import styled from 'styled-components';
import { useTab } from '../../../hooks/useTab';

interface TabContentProps {
  id: string;
  children: React.ReactNode;
}

const Component = styled.div<{ selected?: boolean }>`
  overflow-y: auto;
`;

export function TabContent(props: TabContentProps) {
  const { id } = props;
  const { currentId } = useTab();

  return currentId === id ? (
    <Component>
      <>{props.children}</>
    </Component>
  ) : (
    <></>
  );
}
