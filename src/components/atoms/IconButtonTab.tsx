import { ButtonProps, IconButton } from '@mui/material';
import styled, { css } from 'styled-components';
import {
  customColor,
  grayScale,
  tertiaryColor,
  themeBackgroundColor,
} from '../../theme/variants';

interface IconButtonTabProps extends ButtonProps {
  selected?: boolean;
  active?: boolean;
}

const Component = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'selected',
})<ButtonProps & IconButtonTabProps>`
  && {
    background-color: ${themeBackgroundColor};
    width: 60px;
    height: 70px;
    border-radius: 0;
    &:hover {
      color: ${tertiaryColor[500]};
      background-color: ${customColor[900]};
    }

    ${(props) =>
      !props.active &&
      css`
        && {
          background: ${grayScale[75]};
          color: ${grayScale[80]};
        }
      `}

    ${(props) =>
      props.selected &&
      css`
        && {
          color: ${tertiaryColor[500]};
          pointer-events: none;
        }
      `}
  }
`;

export function IconButtonTab(props: ButtonProps & IconButtonTabProps) {
  return <Component {...props}>{props.children}</Component>;
}
