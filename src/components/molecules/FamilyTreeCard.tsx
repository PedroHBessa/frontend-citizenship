import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Card } from '@mui/material';
import { Actions } from 'components/atoms/FamilyTreeCard/Actions';
import { AddMember } from 'components/atoms/FamilyTreeCard/AddMember';
import { Age } from 'components/atoms/FamilyTreeCard/Age';
import Avatar from 'components/atoms/FamilyTreeCard/Avatar';
import { BirthDate } from 'components/atoms/FamilyTreeCard/BirthDate';
import { DeathDate } from 'components/atoms/FamilyTreeCard/DeathDate';
import { Name } from 'components/atoms/FamilyTreeCard/Name';
import { useTab } from 'components/hooks/useTab';
import React from 'react';
import styled from 'styled-components';
import { familyMemberStatusColor, grayScale } from '../../theme/variants';
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
  parents: string[];
}

const Wrapper = styled.div<{ status: string }>`
  filter: ${(props) =>
    props.status === FamilyMemberStatus.NOT_FROM_LINEAGE
      ? 'grayscale(1)'
      : 'none'};
  pointer-events: ${(props) =>
    props.status === FamilyMemberStatus.NOT_FROM_LINEAGE ? 'none' : 'all'};
`;

const Component = styled(Card)`
  && {
    width: 320px;
    height: 250px;
    box-shadow: 3px 3px 0px 0px rgba(0, 0, 0, 0.15);
  }
`;

type CardContentProps = {
  statusColor: string;
  status: string;
};

const CardContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'statusColor',
})<CardContentProps>`
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
  background: ${(props) =>
    props.status === FamilyMemberStatus.NOT_FROM_LINEAGE
      ? grayScale[60]
      : 'white'};
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

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FamilyTreeCard: React.FC<FamilyTreeCardProps> = ({
  name,
  age,
  gender,
  birthDate,
  deathDate,
  status,
  country,
  avatar,
  spouses,
  parents,
  id,
}) => {
  const { setCurrentId, setCurrentMemberId, setCurrentMarriageId } = useTab();
  const statusColor =
    familyMemberStatusColor[status ?? FamilyMemberStatus.ON_PROGRESS];

  const [mouseOver, setMouseOver] = React.useState(false);
  const { setOpenModal: setIsOpened, deleteMember } = useFamily();

  const handleDelete = async () => {
    deleteMember(id);
  };

  const handleEdit = () => {
    setCurrentMemberId(id);
    setCurrentMarriageId(parents);
    setCurrentId('1');
    setIsOpened(true);
  };

  const iconColor =
    status === FamilyMemberStatus.NOT_FROM_LINEAGE ? 'secondary' : 'primary';

  const hasSpouses = spouses.length > 0;

  return (
    <Wrapper status={status ?? FamilyMemberStatus.ON_PROGRESS}>
      <Component
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <AvatarContainer>
          <Actions
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            mouseOver={mouseOver}
          />

          <AddMember
            hasSpouses={hasSpouses}
            id={id}
            spouses={spouses[0]}
            status={status ?? FamilyMemberStatus.ON_PROGRESS}
          />

          <Avatar
            avatar={avatar}
            country={country}
            deathDate={deathDate}
            status={status ?? FamilyMemberStatus.ON_PROGRESS}
          />
        </AvatarContainer>
        <CardContent
          status={status ?? FamilyMemberStatus.ON_PROGRESS}
          statusColor={statusColor}
        >
          <Name name={name} status={status ?? FamilyMemberStatus.ON_PROGRESS} />
          <CardDescription>
            <Age age={age} />
            {gender === Gender.MALE ? (
              <MaleIcon color={iconColor} />
            ) : (
              <FemaleIcon color={iconColor} />
            )}
          </CardDescription>
          <CardFooter>
            <BirthDate birthDate={birthDate} />
            <DeathDate deathDate={deathDate} />
          </CardFooter>
        </CardContent>
      </Component>
    </Wrapper>
  );
};

export default FamilyTreeCard;
