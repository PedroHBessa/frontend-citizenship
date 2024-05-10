import { TreeDialog } from 'components/molecules/FamilyTree/Tabs/TreeDialog';
import React from 'react';
import ReactFamilyTree from 'react-family-tree';
import { Node } from 'relatives-tree/lib/types';
import styled from 'styled-components';

import { TABS } from 'components/contexts/TabContext';
import { MemberFamily } from 'components/molecules/FamilyTree/MemberFamily';
import { CustomTab } from '../atoms/FamilyTree/Tab/CustomTab';
import { NoOneFound } from '../atoms/NoOneFound';
import { useFamily } from '../hooks/useFamily';
import { FamilyTreeCardProps } from '../molecules/FamilyTreeCard';

export type FirstStepInputs = {
  memberFamilyType: string;
  gender: string;
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  overflow: auto;
  padding: 1rem;
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

  const rootMember = tree.find(
    (member: { status: string }) => member.status !== 'NOT_FROM_LINEAGE'
  ) as unknown as TreeMember;
  const shouldRenderReactFamilyTree = !!members.length && !!tree.length;

  return (
    <Container ref={containerRef}>
      {!shouldRenderReactFamilyTree && !loading && (
        <NoOneFound message='No members found!' />
      )}
      <CustomTab defaultId={TABS.FIRST}>
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
        <TreeDialog onClose={onClose} open={open} />
      </CustomTab>
    </Container>
  );
}
