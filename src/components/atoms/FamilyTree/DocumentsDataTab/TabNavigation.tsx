import { Grid } from '@mui/material';
import { TextButtonTab } from 'components/atoms/TextButtonTab';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import styled from 'styled-components';
import { grayScale } from 'theme/variants';

const TabNavigationComponent = styled.div`
  border-bottom: 1px solid ${grayScale[50]};
`;

export function TabNavigation({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: {
    id: string;
    icon: ReactNode;
    label: string;
  }[];
  currentTab: string | null;
  setCurrentTab: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <TabNavigationComponent>
      <Grid container display='flex' spacing={2}>
        {tabs.map((tab) => (
          <Grid item key={`icon-item-${tab.id}`}>
            <TextButtonTab
              // active={currentTab === tab.id}
              onClick={() => setCurrentTab(tab.id)}
              selected={currentTab === tab.id}
              startIcon={tab.icon}
            >
              {tab.label}
            </TextButtonTab>
          </Grid>
        ))}
      </Grid>
    </TabNavigationComponent>
  );
}
