import AddIcon from '@mui/icons-material/Add'; //TODO: Create a custom icon for this
import { IconButton } from '@mui/material';
import { useFamily } from 'components/hooks/useFamily';
import { useTab } from 'components/hooks/useTab';
import styled, { css } from 'styled-components';
import { customColor } from 'theme/variants';
import { FamilyMemberStatus } from 'types/State';

interface AddMemberProps {
  status?: string;
  hasSpouses?: boolean;
  id?: string;
  spouses?: { id: string };
}

const Component = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasSpouses',
})<AddMemberProps>`
  position: absolute;
  z-index: 99999;
  ${(props) =>
    props.hasSpouses
      ? css`
          top: 50%;
          right: -20px;
          transform: translateY(-50%);
        `
      : css`
          bottom: 10px;
          left: 50;
        `}
`;

const AddMemberButton = styled(IconButton)`
  && {
    background: ${customColor[700]};
    color: white;
    pointer-events: all;
    &:hover {
      background: ${customColor[800]};
      color: white;
    }
  }
`;

export function AddMember({ status, hasSpouses, spouses, id }: AddMemberProps) {
  const { setOpenModal: setIsOpened } = useFamily();
  const { setCurrentId, setCurrentMemberId, setCurrentMarriageId } = useTab();
  const handleClick = () => {
    setCurrentMemberId(null);
    setCurrentId('1');
    setIsOpened(true);
    id && setCurrentMarriageId([id, ...(spouses ? [spouses.id] : [])]);
  };

  return status !== FamilyMemberStatus.NOT_FROM_LINEAGE ? (
    <Component hasSpouses={hasSpouses}>
      <AddMemberButton color='primary' onClick={handleClick} size='small'>
        <AddIcon />
      </AddMemberButton>
    </Component>
  ) : (
    <></>
  );
}
