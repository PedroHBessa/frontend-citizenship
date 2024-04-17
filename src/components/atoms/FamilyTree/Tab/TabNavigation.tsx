import AddReactionIcon from '@mui/icons-material/AddReaction';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import { useTab } from '../../../hooks/useTab';
import { IconButtonTab } from '../../IconButtonTab';

const Component = styled.div`
  box-sizing: border-box;
  left: -60px;
  min-height: 200px;
  position: absolute;
  top: 0;
  width: 60px;
  z-index: 2;
`;

export function TabNavigation() {
  const { setCurrentId, currentId } = useTab();

  const tabs = [
    {
      id: '1',
      icon: <SendIcon />,
    },
    {
      id: '2',
      icon: <InsertPhotoIcon />,
    },
    {
      id: '3',
      icon: <DescriptionIcon />,
    },
    {
      id: '4',
      icon: <AddReactionIcon />,
    },
  ];

  return (
    <Component>
      <Grid container>
        {tabs.map((tab) => (
          <Grid item key={`icon-item-${tab.id}`} mb={1} xs={12}>
            <IconButtonTab
              active={tab.id === currentId}
              onClick={() => setCurrentId(tab.id)}
              selected={tab.id === currentId}
            >
              {tab.icon}
            </IconButtonTab>
          </Grid>
        ))}
      </Grid>
    </Component>
  );
}
