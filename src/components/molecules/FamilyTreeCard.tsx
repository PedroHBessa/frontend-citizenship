import AddIcon from '@mui/icons-material/Add'; //TODO: Create a custom icon for this
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Card, IconButton, Skeleton, Typography } from '@mui/material';
import { useTab } from 'components/hooks/useTab';
import React from 'react';
import styled from 'styled-components';
import { Api } from '../../api/Api';
import Configuration from '../../config/Configuration';
import {
  customColor,
  familyMemberStatusColor,
  grayScale,
} from '../../theme/variants';
import { FamilyMemberStatus } from '../../types/State';
import { useFamily } from '../hooks/useFamily';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface FamilyTreeCardProps {
  name: string;
  age: number | null;
  status: string | null;
  gender: Gender;
  birthDate: Date | null;
  deathDate: Date | null;
  country: string;
  avatar?: string;
  allowAddMembers?: boolean;
  id: string;
  spouses: { id: string }[];
  onClickAddMember?: () => void;
}

const Component = styled(Card)`
  && {
    width: 320px;
    height: 250px;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'statusColor',
})<{ statusColor: string }>`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding-top: 2.813rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.statusColor};
  border-top: 5px solid ${(props) => props.statusColor};
  background: white;
`;

const CardDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  box-sizing: border-box;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  overflow: hidden;
  border-top: 1px solid ${grayScale[25]};
`;

const CardFooterDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Avatar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'dataDeath',
})<{ dataDeath: boolean }>`
  position: absolute;
  transform: translateY(-50%);
  & > img {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    border: 10px solid #fff;
    filter: grayscale(${(props) => (props.dataDeath ? 1 : 0)});
  }
`;

const Flag = styled.div`
  width: 32px;
  height: 22px;
  position: absolute;
  overflow: hidden;
  bottom: 10px;
  right: 10px;
  border: 1px solid white;
  background: white;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  & img {
    margin-top: -5px;
  }
`;

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

const AddMember = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -18px;
  z-index: 99999;
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

const config = new Configuration();
const api = new Api();

const FamilyTreeCard: React.FC<FamilyTreeCardProps> = ({
  name,
  age,
  gender,
  birthDate,
  deathDate,
  status,
  country,
  avatar,
  allowAddMembers,
  // onClickAddMember,
  spouses,
  id,
}) => {
  const { setCurrentId, setCurrentMemberId, setCurrentMarriageId } = useTab();
  const statusColor =
    familyMemberStatusColor[status ?? FamilyMemberStatus.ON_PROGRESS];

  const [mouseOver, setMouseOver] = React.useState(false);
  const { family, update, setOpenModal: setIsOpened } = useFamily();

  const handleDelete = async () => {
    const targetUrl = config.getRouteWithVars(config.endpoint.delete.member, {
      familyId: family._id,
      memberId: id,
    });

    await api.delete(targetUrl);
    update();
  };

  return (
    <Component
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <AvatarContainer>
        {mouseOver && (
          <>
            <DeleteMember>
              <DeleteMemberButton onClick={handleDelete} size='small'>
                <ClearIcon />
              </DeleteMemberButton>
            </DeleteMember>
            <EditMember>
              <EditMemberButton
                onClick={() => {
                  setCurrentMemberId(id);
                  setCurrentId('1');
                  setIsOpened(true);
                }}
                size='small'
              >
                <EditIcon />
              </EditMemberButton>
            </EditMember>
          </>
        )}

        {allowAddMembers && (
          <AddMember>
            <AddMemberButton
              color='primary'
              // onClick={onClickAddMember}
              onClick={() => {
                setCurrentMemberId(null);
                setCurrentId('1');
                setIsOpened(true);
                setCurrentMarriageId(`${id},${spouses[0].id}`);
              }}
              size='small'
            >
              <AddIcon />
            </AddMemberButton>
          </AddMember>
        )}

        {avatar && (
          <Avatar dataDeath={!!deathDate}>
            <img alt='Avatar' src={avatar} />
            {country && (
              <Flag>
                <img
                  alt='Flag'
                  src={`https://flagsapi.com/${country.substring(0, 2).toLocaleUpperCase()}/flat/32.png`}
                />
              </Flag>
            )}
          </Avatar>
        )}
      </AvatarContainer>
      <CardContent statusColor={statusColor}>
        {name.length > 0 ? (
          <Typography
            color='text.primary'
            gutterBottom
            sx={{ mt: 4, mb: 4, fontWeight: 'bold', textAlign: 'center' }}
            variant='h4'
          >
            {name}
          </Typography>
        ) : (
          <div>
            <Skeleton
              sx={{ width: '170px', height: '25px', margin: '0.33rem' }}
            />
          </div>
        )}
        <CardDescription>
          {age ? (
            <Typography component='span' variant='h6'>
              {`${age} years`}
            </Typography>
          ) : (
            <Skeleton
              sx={{ width: '120px', height: '25px', margin: '1rem 0.5rem' }}
            />
          )}
          {gender === Gender.MALE ? <MaleIcon /> : <FemaleIcon />}
        </CardDescription>
        <CardFooter>
          {birthDate ? (
            <CardFooterDate>
              <StarOutlineIcon style={{ fontSize: 14 }} />
              <Typography
                color='text.secondary'
                component='span'
                sx={{ mt: 2, mb: 2, ml: 1, fontSize: 12 }}
                variant='h6'
              >
                {birthDate?.toLocaleDateString()}
              </Typography>
            </CardFooterDate>
          ) : (
            <Skeleton
              sx={{ width: '150px', height: '20px', margin: '0.25rem 0' }}
            />
          )}
          {deathDate && (
            <CardFooterDate>
              <AddIcon style={{ fontSize: 14 }} />
              <Typography
                color='text.secondary'
                component='span'
                sx={{ mt: 2, mb: 2, ml: 1, fontSize: 12 }}
                variant='h6'
              >
                {deathDate?.toLocaleDateString()}
              </Typography>
            </CardFooterDate>
          )}
        </CardFooter>
      </CardContent>
    </Component>
  );
};

export default FamilyTreeCard;
