import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Typography,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { customColor } from '../../theme/variants';

const ComponentClosed = styled(IconButton)`
  && {
    background-color: ${customColor[800]};
    &:hover {
      color: ${customColor[800]};
      background-color: ${customColor[500]};
    }
  }
`;

const ComponentClosedSelected = styled(IconButton)`
  && {
    background-color: ${customColor[500]};
    color: ${customColor[800]};
    pointer-events: none;
  }
`;

const Description = styled.div`
  text-align: left;
  margin-left: 1rem;
  width: 167px;
  height: 68px;
  overflow: hidden;
`;

const ButtonDefault = styled(Button)`
  && {
    padding: 1rem 0.5rem;
    width: 100%;
    display: flex;
    justify-content: start;
  }
`;

const ComponentOpen = styled(ButtonDefault)`
  && {
    background-color: ${customColor[800]};
    border-radius: 20px;
    color: ${customColor[500]};

    .description {
      color: ${customColor[100]};
    }

    &:hover {
      color: ${customColor[800]};
      background-color: ${customColor[500]};

      .description {
        color: ${customColor[800]};
      }
    }
  }
`;

const ComponentOpenSelected = styled(ButtonDefault)`
  && {
    background-color: ${customColor[500]};
    color: ${customColor[800]};
    pointer-events: none;
    border-radius: 20px;

    .description {
      color: ${customColor[800]};
      text-align: left;
      margin-left: 1rem;
    }
  }
`;

type IconButtonNavigationProps = {
  selected?: boolean;
  isOpen?: boolean;
  label?: string;
  description?: string;
};

export function IconButtonNavigation(
  props: IconButtonProps & IconButtonNavigationProps & ButtonProps
) {
  const { isOpen, ...rest } = props;
  const componentClosed = (
    <>
      {!props.selected ? (
        <ComponentClosed color='secondary' {...rest}>
          {props.children}
        </ComponentClosed>
      ) : (
        <ComponentClosedSelected color='secondary' {...rest}>
          {props.children}
        </ComponentClosedSelected>
      )}
    </>
  );

  const openedComponent = (
    <>
      {!props.selected ? (
        <ComponentOpen {...rest}>
          {props.children}
          <Description className='description'>
            <Typography variant='h4'>{props.title}</Typography>
            {props.description}
          </Description>
        </ComponentOpen>
      ) : (
        <ComponentOpenSelected {...rest}>
          {props.children}
          <Description className='description'>
            <Typography variant='h4'>{props.title}</Typography>
            {props.description}
          </Description>
        </ComponentOpenSelected>
      )}
    </>
  );

  return isOpen ? openedComponent : componentClosed;
}
