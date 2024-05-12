import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MuiMenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, GridProps, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconButtonNavigation } from '../atoms/IconButtonNavigation';
import {
  APP_BAR_CLOSED,
  APP_BAR_OPENED,
  useBaseLayoutStore,
} from '../stores/useBaseLayoutStore';

const Container = styled.div`
  height: 100%;
  background-color: #52333b;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  box-sizing: border-box;
  transition: ease all 0.2s;
  position: fixed;
  z-index: 9999;
`;

const MenuIcon = styled(MuiMenuIcon)`
  color: white;
`;

const ItemMenu = (props: GridProps) => (
  <Grid display='flex' item justifyContent='center' mb={4} xs={12} {...props}>
    {props.children}
  </Grid>
);

export function AppBar() {
  const { isOpen, setIsOpen } = useBaseLayoutStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Container
      style={{
        width: isOpen ? `${APP_BAR_OPENED}px` : `${APP_BAR_CLOSED}px`,
      }}
    >
      <Grid container>
        <ItemMenu
          mt={1.5}
          sx={{ ...(isOpen ? { justifyContent: 'start' } : {}) }}
        >
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon />
          </IconButton>
        </ItemMenu>
        <ItemMenu>
          <IconButtonNavigation
            description='Get metrics and insights about the families'
            isOpen={isOpen}
            onClick={() => navigate('/dashboard')}
            selected={pathname === '/dashboard'}
            title='Dashboard'
          >
            <DashboardIcon />
          </IconButtonNavigation>
        </ItemMenu>
        <ItemMenu>
          <IconButtonNavigation
            description='Create Family trees and their documents'
            isOpen={isOpen}
            onClick={() => navigate('/families')}
            selected={pathname.startsWith('/families')}
            title='Families'
          >
            <FamilyRestroomIcon />
          </IconButtonNavigation>
        </ItemMenu>
        <ItemMenu>
          <IconButtonNavigation
            description='Generate the reports to analise the collected data'
            isOpen={isOpen}
            onClick={() => navigate('/reports')}
            selected={pathname.startsWith('/reports')}
            title='Reports'
          >
            <ArticleIcon />
          </IconButtonNavigation>
        </ItemMenu>
      </Grid>
      <Grid container sx={{ marginTop: 'auto' }}>
        <ItemMenu>
          <IconButtonNavigation
            description='Set your preferences'
            isOpen={isOpen}
            onClick={() => navigate('/settings')}
            selected={pathname.startsWith('/settings')}
            title='Settings'
          >
            <SettingsIcon />
          </IconButtonNavigation>
        </ItemMenu>
      </Grid>
    </Container>
  );
}
