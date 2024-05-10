import styled from 'styled-components';

type TabContentProps = {
  id: string;
  children: React.ReactNode;
  selected: boolean;
  processing?: boolean;
};

const Component = styled.div<{ selected?: boolean; processing?: boolean }>`
  display: ${(props) => (props.selected ? 'block' : 'none')};
  pointer-events: ${(props) => (props.processing ? 'none' : 'all')};
  opacity: ${(props) => (props.processing ? 0.5 : 1)};
  overflow-y: auto;
`;

export function TabContent(props: TabContentProps) {
  return props.selected ? (
    <Component processing={props.processing} selected={props.selected}>
      <>{props.children}</>
    </Component>
  ) : (
    <></>
  );
}
