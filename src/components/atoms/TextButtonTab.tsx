import { Button, ButtonProps } from '@mui/material';
import styled, { css } from 'styled-components';
import { customColor, grayScale, tertiaryColor } from '../../theme/variants';

interface TextButtonTabProps extends ButtonProps {
  selected?: boolean;
  active?: boolean;
}

const Component = styled(Button)<ButtonProps & TextButtonTabProps>`
  && {
    border: 1px solid ${grayScale[50]};
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    &:hover {
      color: ${tertiaryColor[500]};
      background-color: ${customColor[900]};
    }

    ${(props) =>
      !props.active &&
      css`
        && {
          background: ${grayScale[25]};
          color: ${grayScale[80]};
        }
      `}

    ${(props) =>
      props.selected &&
      css`
        && {
          color: ${tertiaryColor[500]};
          background: ${grayScale[50]};
          pointer-events: none;
        }
      `}
  }
`;

export function TextButtonTab(props: ButtonProps & TextButtonTabProps) {
  return (
    <Component size='large' variant='contained' {...props}>
      {props.children}
    </Component>
  );
}
