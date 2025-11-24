import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../hooks/useSignup.ts';
import type { SignupRequest } from '../../utils/types.ts';
import ErrorAlert from '../common/ErrorAlert.tsx';

const DEFAULT_FORM_VALUES: SignupRequest = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: ''
};

const SignupForm = () => {
  const { mutate: signup, isPending, error, isError } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupRequest>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES
  });

  const onSubmit = (data: SignupRequest) => {
    signup(data);
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
          placeholder={'Choose a unique username'}
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
          autoComplete="new-password"
          placeholder={'Create a strong password'}
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

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder={'Enter your email address'}
          required
          fullWidth
          variant="outlined"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address.'
            }
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ' '}
        />

        <TextField
          label="First Name"
          type="text"
          autoComplete="given-name"
          placeholder={'Enter your first name'}
          required
          fullWidth
          variant="outlined"
          {...register('firstName', {
            required: 'First name is required.'
          })}
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ' '}
        />

        <TextField
          label="Last Name"
          type="text"
          autoComplete="family-name"
          placeholder={'Enter your last name'}
          required
          fullWidth
          variant="outlined"
          {...register('lastName', {
            required: 'Last name is required.'
          })}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ' '}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupForm;
