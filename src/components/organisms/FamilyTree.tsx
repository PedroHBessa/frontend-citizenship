import { useUploadStore } from 'components/stores/useUploadStore';
import React, { HTMLProps, useEffect } from 'react';
import ReactFamilyTree from 'react-family-tree';
import { Node } from 'relatives-tree/lib/types';
import styled from 'styled-components';
import AVATAR_FEMALE from '../../assets/avatar-female-1.png';
import AVATAR_MALE from '../../assets/avatar-male-1.png';
import AVATAR_GRANDMA from '../../assets/grandma.png';
import AVATAR_GRANDPA from '../../assets/grandpa.png';
import { calculateAge } from '../../utils/age';
import { CustomRightDialog } from '../atoms/CustomRightDialog';
import { CustomTab } from '../atoms/FamilyTree/Tab/CustomTab';
import { TabContent } from '../atoms/FamilyTree/Tab/TabContent';
import { TabNavigation } from '../atoms/FamilyTree/Tab/TabNavigation';
import { NoOneFound } from '../atoms/NoOneFound';
import { useFamily } from '../hooks/useFamily';
import { Footer } from '../molecules/FamilyTree/Actions/Footer';
import FamilyTreeCard, {
  FamilyTreeCardProps,
  Gender,
} from '../molecules/FamilyTreeCard';
import { DocumentTab } from './FamilyTree/Tabs/DocumentTab';
import { DocumentsDataTab } from './FamilyTree/Tabs/DocumentsDataTab';
import { SuccessTab } from './FamilyTree/Tabs/SuccessTab';
import { UploadTab } from './FamilyTree/Tabs/UploadTab';

export type FirstStepInputs = {
  memberFamilyType: string;
  gender: string;
};

const MemberContainer = styled.div`
  position: absolute;
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const AGE_FOR_GRAND = 50;

function MemberFamily(
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
        spouses={props.node.spouses}
        status={props.node.status ?? null}
      />
    </MemberContainer>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

interface FamilyTreeProps {
  open: boolean;
  onClose: () => void;
}

type TreeMember = {
  id: string;
  status: string;
};

export function FamilyTree({ open, onClose }: FamilyTreeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { members, tree, loading } = useFamily();
  const width = 420;
  const height = 350;

  const rootMember = tree[0] as unknown as TreeMember;
  const shouldRenderReactFamilyTree = !!members.length && !!tree.length;

  const setFiles = useUploadStore((state) => state.setFiles);

  useEffect(() => {
    if (open === false) {
      setFiles([]);
    }
  }, [open, setFiles]);

  return (
    <Container ref={containerRef}>
      {!shouldRenderReactFamilyTree && !loading && (
        <NoOneFound message='No members found!' />
      )}
      <CustomTab defaultId='1'>
        {shouldRenderReactFamilyTree && !loading && (
          <ReactFamilyTree
            height={height}
            nodes={tree as unknown as Node[]}
            renderNode={(node) => (
              <MemberFamily
                key={node.id}
                node={node as unknown as FamilyTreeCardProps}
                style={{
                  width,
                  height,
                  transform: `translate(${node.left * (width / 2)}px, ${node.top * (height / 2)}px)`,
                  zIndex: 999 - node.left,
                }}
              />
            )}
            rootId={rootMember.id}
            width={width}
          />
        )}

        <CustomRightDialog
          actions={<Footer onClose={onClose} />}
          fullScreen
          id='family-tree-dialog'
          onClose={onClose}
          open={open}
          removeOverflow
          title='How do want to start creating your family tree?'
        >
          <TabNavigation />
          <TabContent id='1'>
            <UploadTab />
          </TabContent>
          <TabContent id='2'>
            <DocumentTab />
          </TabContent>
          <TabContent id='3'>
            <DocumentsDataTab />
          </TabContent>
          <TabContent id='4'>
            <SuccessTab />
          </TabContent>
        </CustomRightDialog>
      </CustomTab>
    </Container>
  );
}
