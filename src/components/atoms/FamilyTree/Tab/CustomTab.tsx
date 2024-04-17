import React from 'react';
import styled from 'styled-components';
import { TabContextProvider } from '../../../contexts/TabContext';

const TabWrapper = styled.div``;

export function CustomTab({
  children,
  defaultId = '',
}: {
  children: React.ReactNode;
  defaultId: string;
}) {
  return (
    <TabContextProvider id={defaultId}>
      <TabWrapper>{children}</TabWrapper>
    </TabContextProvider>
  );
}
