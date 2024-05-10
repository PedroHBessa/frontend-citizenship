import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { StoreApi, UseBoundStore, create } from 'zustand';
import { CustomButton } from '../atoms/CustomButton';
import { CustomTextField } from '../atoms/CustomTextField';

export type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

const LoginActionButton = styled(CustomButton)`
  border-radius: 0 !important;
  padding: 1rem 0 !important;
`;

type LoginFormProps = {
  onSubmit?: (data: Inputs) => Promise<void>;
};

type FormStore = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const useFormStore: UseBoundStore<StoreApi<FormStore>> = create(
  (set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
  })
);

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    if (onSubmit) {
      setIsLoading(true);
      await onSubmit(data);
      setIsLoading(false);
    }
  };

  const { isLoading, setIsLoading } = useFormStore();

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container>
        <Grid item mb={6} xs={12}>
          <CustomTextField
            fullWidth
            placeholder='Username'
            required
            {...register('username', { required: true })}
          />
        </Grid>
        <Grid item mb={6} xs={12}>
          <CustomTextField
            fullWidth
            placeholder='Password'
            required
            type='password'
            {...register('password', { required: true })}
          />
        </Grid>
        <Grid item mb={6} xs={12}>
          <FormControlLabel
            control={<Checkbox {...register('remember')} />}
            label='Remember me'
          />
        </Grid>
        <Grid item xs={12}>
          <LoginActionButton
            color='primary'
            fullWidth
            loading={isLoading}
            size='large'
            type='submit'
            variant='contained'
          >
            LOGIN
          </LoginActionButton>
        </Grid>
      </Grid>
    </form>
  );
}
