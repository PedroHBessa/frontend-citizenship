import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Paper,
  Slide,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { TransitionProps } from '@mui/material/transitions';
import { useTab } from 'components/hooks/useTab';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { grayScale } from '../../theme/variants';

const Component = styled(Dialog)`
  && {
    width: 85%;
    margin-left: auto;
    max-width: 1450px;
  }
`;

const Actions = styled(DialogActions)`
  && {
    justify-content: flex-start;
    border-top: 1px solid ${grayScale[25]};
    padding: 0.75rem 0;
    margin: 0 2rem;
  }
`;

type CustomRightDialogProps = {
  title?: string;
  actions?: React.ReactNode;
  removeOverflow?: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const DialogPaper = styled(Paper)`
  && {
    position: relative;
  }
`;

const DialogPaperNoOverflow = styled(Paper)`
  && {
    position: relative;
    overflow: visible;
  }
`;

export function CustomRightDialog(props: DialogProps & CustomRightDialogProps) {
  const { children, actions, removeOverflow, ...rest } = props;
  const ref = useRef<null | HTMLDivElement>(null);
  const { contentRef } = useTab();

  return (
    <>
      <Component
        {...rest}
        PaperComponent={removeOverflow ? DialogPaperNoOverflow : DialogPaper}
        TransitionComponent={Transition}
        ref={ref}
      >
        <DialogContent ref={contentRef}>
          {rest.title && (
            <Typography mb={4} variant='h2'>
              {rest.title}
            </Typography>
          )}
          <Divider />
          <Container>
            <Box py={4}>{children}</Box>
          </Container>
        </DialogContent>
        {actions && <Actions>{actions}</Actions>}
      </Component>
    </>
  );
}
