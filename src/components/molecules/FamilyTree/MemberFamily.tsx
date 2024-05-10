import { HTMLProps } from 'react';
import styled from 'styled-components';
import { calculateAge } from 'utils/age';
import AVATAR_FEMALE from '../../../assets/avatar-female-1.png';
import AVATAR_MALE from '../../../assets/avatar-male-1.png';
import AVATAR_GRANDMA from '../../../assets/grandma.png';
import AVATAR_GRANDPA from '../../../assets/grandpa.png';
import FamilyTreeCard, { FamilyTreeCardProps, Gender } from '../FamilyTreeCard';

const MemberContainer = styled.div`
  position: absolute;
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const AGE_FOR_GRAND = 50;

export function MemberFamily(
  props: HTMLProps<HTMLDivElement> & { node: FamilyTreeCardProps }
) {
  const birthDate = props.node.birthDate
    ? new Date(props.node.birthDate)
    : null;
  const deathDate = props.node.deathDate
    ? new Date(props.node.deathDate)
    : null;
  const age = birthDate
    ? calculateAge(birthDate, deathDate ?? new Date())
    : null;

  let avatar = AVATAR_MALE;

  if (age && age >= AGE_FOR_GRAND) {
    if (props.node.gender === Gender.MALE) {
      avatar = AVATAR_GRANDPA;
    } else {
      avatar = AVATAR_GRANDMA;
    }
  } else if (props.node.gender === Gender.FEMALE) {
    avatar = AVATAR_FEMALE;
  }

  const allowAddMembers =
    (props.node as unknown as { spouses: Node[] }).spouses.length > 0 &&
    props.node.status !== '';

  const parents =
    (props.node.parents as unknown as { id: string }[])?.map(
      (parent) => parent.id
    ) ?? [];

  return (
    <MemberContainer style={props.style}>
      <FamilyTreeCard
        age={age}
        allowAddMembers={allowAddMembers}
        avatar={avatar}
        birthDate={birthDate}
        country={props.node.country}
        deathDate={deathDate}
        gender={props.node.gender}
        id={props.node.id}
        name={props.node.name}
        parents={parents}
        spouses={props.node.spouses}
        status={props.node.status ?? null}
      />
    </MemberContainer>
  );
}
