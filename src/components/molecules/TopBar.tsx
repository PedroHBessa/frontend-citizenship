import PushPinIcon from '@mui/icons-material/PushPin';
import { Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Auth } from '../../config/Auth';
import { customColor } from '../../theme/variants';
import { CustomButton } from '../atoms/CustomButton';
import { usePinned } from '../hooks/usePinned';

const Container = styled.div`
  width: 100%;
  background-color: ${customColor[900]};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 0.5rem;
  box-sizing: border-box;
`;

export function TopBar() {
  const { username } = Auth.getCredentials();
  const { pinned } = usePinned();
  const navigate = useNavigate();
  const pins = Array.from(pinned);

  return (
    <Container>
      {pins.length > 0 && (
        <Box mr={5}>
          {pins.map((pin) => (
            <CustomButton
              color='secondary'
              key={`pin-${pin.id}`}
              onClick={() => navigate(`/families/${pin.id}`)}
              size='small'
              startIcon={<PushPinIcon />}
              sx={{ margin: '0 0.5rem' }}
            >
              {pin.label}
            </CustomButton>
          ))}
        </Box>
      )}
      <div id='background-processes' /> {/** Background processes  **/}
      {username && <Avatar>{username.substring(0, 2).toUpperCase()}</Avatar>}
    </Container>
  );
}
