import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { LoginRequest } from '../../utils/types.ts';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin.ts';
import Stack from '@mui/material/Stack';
import ErrorAlert from '../common/ErrorAlert.tsx';

const DEFAULT_FORM_VALUES: LoginRequest = {
  username: '',
  password: ''
};

const LoginForm = () => {
  const { mutate: login, isPending, error, isError } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRequest>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES
  });

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2
      }}
    >
      <Stack spacing={2}>
        {isError && <ErrorAlert error={error} />}

        <TextField
          label="Username"
          type="text"
          autoComplete="username"
          placeholder={'Enter your username'}
          autoFocus
          required
          fullWidth
          variant="outlined"
          {...register('username', {
            required: 'Username is required.',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters long.'
            }
          })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ' '}
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder={'Enter your password'}
          required
          fullWidth
          variant="outlined"
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 11,
              message: 'Password must be at least 11 characters long.'
            }
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ' '}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Log in'}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
