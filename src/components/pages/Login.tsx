import React from 'react';
import { Alert, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { Inputs, LoginForm } from '../molecules/LoginForm';
import useAuth from '../hooks/useAuth';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { BackendError } from '../../types/auth';
import { useNavigate } from 'react-router-dom';


const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type LoginStore = {
  hasErrors: boolean;
  setHasErrors: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (value: string) => void;
};

export const useLoginStore: UseBoundStore<StoreApi<LoginStore>> = create(
  (set) => ({
    hasErrors: false,
    errorMessage: '',
    setErrorMessage: (value: string) => set(() => ({ errorMessage: value })),
    setHasErrors: (value: boolean) => set(() => ({ hasErrors: value })),
  })
);

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { hasErrors, setHasErrors, setErrorMessage, errorMessage } =
    useLoginStore();

  const onSubmit = async (data: Inputs) => {
    try {
      await signIn(data.username, data.password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setHasErrors(true);
      setErrorMessage((error as BackendError).message);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ width: '457px' }}>
        <Header>
          <Typography component='h2' mt={2} variant='body1'>
            Welcome back!
          </Typography>
          <Typography mt={2} variant='body1'>
            Please login into account
          </Typography>
        </Header>
        <Box my={4}>
          {hasErrors && (
            <Alert severity='error' sx={{ marginBottom: '1rem' }}>
              {errorMessage ??
                'There was an error in logging into your account'}
            </Alert>
          )}
          <LoginForm onSubmit={onSubmit} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
