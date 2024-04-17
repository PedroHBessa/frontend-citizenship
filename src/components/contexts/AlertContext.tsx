import React, { createContext } from 'react';
import { Alert, Snackbar } from '@mui/material';
import styled, { css } from 'styled-components';
import {
  customColor,
  darkColors,
  grayScale,
  statusColor,
} from '../../theme/variants';
import { FamilyState } from '../../types/State';

type AlertContextType = {
  setAlertMessage: (value: MessageAlertProps) => void;
};

enum MessageType {
  error = 'error',
  success = 'success',
}

type MessageAlertProps = {
  type: 'error' | 'success';
  message: string;
};

const AlertContext = createContext<AlertContextType | null>({
  setAlertMessage: () => {},
});

const AlertComponent = styled(Alert)`
  ${(props) =>
    props.severity === 'error' &&
    css`
      && {
        background-color: ${customColor[700]};
        color: ${grayScale[25]};
      }
    `}

  ${(props) =>
    props.severity === 'success' &&
    css`
      && {
        background-color: ${darkColors.darkGreen};
        color: ${grayScale[25]};

        & .MuiAlert-icon {
          color: ${statusColor[FamilyState.FINISHED]};
        }
      }
    `}
`;

function AlertContextProvider({ children }: { children: React.ReactNode }) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('' as 'error' | 'success');
  const setAlertMessage = ({ message, type }: MessageAlertProps) => {
    setMessage(message);
    setType(type);
    setOpenAlert(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <AlertContext.Provider value={{ setAlertMessage }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        autoHideDuration={(type === MessageType.success ? 10 : 30) * 1000}
        onClose={handleClose}
        open={openAlert}
      >
        <AlertComponent onClose={() => setOpenAlert(false)} severity={type}>
          {message}
        </AlertComponent>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertContext, AlertContextProvider, MessageType };
