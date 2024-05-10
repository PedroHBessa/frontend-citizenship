import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import { customColor, familyMemberStatusColor } from 'theme/variants';
import { FamilyMemberStatus } from 'types/State';

type ActionsProps = {
  mouseOver: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
};

const EditMember = styled.div`
  position: absolute;
  top: 22%;
  transform: translateY(-50%);
  left: 60px;
  z-index: 99999;
`;

const EditMemberButton = styled(IconButton)`
  && {
    background: ${customColor[500]};
    color: white;
    pointer-events: all;
    &:hover {
      background: ${customColor[800]};
      color: white;
    }
  }
`;

const DeleteMember = styled.div`
  position: absolute;
  top: 22%;
  transform: translateY(-50%);
  right: 60px;
  z-index: 99999;
`;

const DeleteMemberButton = styled(IconButton)`
  && {
    background: ${familyMemberStatusColor[FamilyMemberStatus.ERRORS]};
    color: white;
    pointer-events: all;
    &:hover {
      background: ${customColor[800]};
      color: white;
    }
  }
`;

export function Actions({ mouseOver, handleDelete, handleEdit }: ActionsProps) {
  return mouseOver ? (
    <>
      <DeleteMember>
        <DeleteMemberButton onClick={handleDelete} size='small'>
          <ClearIcon />
        </DeleteMemberButton>
      </DeleteMember>
      <EditMember>
        <EditMemberButton onClick={handleEdit} size='small'>
          <EditIcon />
        </EditMemberButton>
      </EditMember>
    </>
  ) : (
    <></>
  );
}
