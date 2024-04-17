import PushPinIcon from '@mui/icons-material/PushPin';
import { IconButton, LinearProgress } from '@mui/material';
import { useTabStore } from 'components/stores/useTabStore';
import { Helmet } from 'react-helmet-async';
import styled, { css } from 'styled-components';
import { customColor } from '../../theme/variants';
import { NewButton } from '../atoms/NewButton';
import { useFamily } from '../hooks/useFamily';
import { usePinned } from '../hooks/usePinned';
import { Header } from '../molecules/Header';
import { FamilyTree } from '../organisms/FamilyTree';

type PinButtonProps = {
  checked?: boolean;
};

const PinButton = styled(IconButton)<PinButtonProps>`
  && {
    margin-left: 1rem;
  }

  ${(props) =>
    props.checked &&
    css`
      && {
        background: ${customColor[600]};
        color: ${customColor[50]};
        &:hover {
          background: ${customColor[600]};
          color: ${customColor[50]};
        }
      }
    `}
`;

export function Family() {
  const {
    family,
    loading,
    openModal: isOpened,
    setOpenModal: setIsOpened,
  } = useFamily();
  const { pinned, togglePinned } = usePinned();
  const isPinned = pinned.some((pin) => family._id === pin.id);
  const setCurrentMemberId = useTabStore((state) => state.setCurrentMemberId);
  const setCurrentId = useTabStore((state) => state.setCurrentId);

  const handleNewMember = () => {
    setIsOpened?.(true);
    setCurrentMemberId(null);
    setCurrentId('1');
  };

  return (
    <>
      <Helmet title='Families' />
      <Header
        actionButton={
          <NewButton onClick={handleNewMember}>New Member</NewButton>
        }
      >
        <>
          {`Family | ${family.familyName ?? ''}`}
          <PinButton
            checked={isPinned}
            onClick={() =>
              togglePinned({ id: family._id, label: family.familyName })
            }
          >
            <PushPinIcon />
          </PinButton>
        </>
      </Header>
      {loading && <LinearProgress color='secondary' sx={{ height: '1px' }} />}

      <FamilyTree
        onClose={() => setIsOpened?.(false)}
        open={isOpened ?? false}
      />
    </>
  );
}
