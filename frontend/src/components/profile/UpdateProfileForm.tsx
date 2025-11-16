import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from '@mui/material';
import ErrorAlert from '../common/ErrorAlert.tsx';
import { userService } from '../../services/userService.ts';
import type { ApiError, UpdateUserRequest, User } from '../../utils/types.ts';
import { useApplicationContext } from '../../contexts/UserContextProvider.tsx';
import useAuthenticationContext from '../../contexts/AuthenticationContextProvider.tsx';

type FormValues = UpdateUserRequest;

type Props = {
  user: User;
};

const UpdateProfileForm = ({ user }: Props) => {
  const { isAuthenticated, token } = useAuthenticationContext();
  const { setUser } = useApplicationContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  });

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  }, [user, reset]);

  const {
    mutate: updateUser,
    isPending,
    isSuccess,
    error
  } = useMutation<User, ApiError, UpdateUserRequest>({
    mutationFn: (request: UpdateUserRequest) => {
      if (!isAuthenticated || !user) {
        throw new Error('User not authenticated');
      }
      const tokenValue = token!.value;
      const userId = user.id;
      return userService.updateUser(request, userId, tokenValue);
    },
    onSuccess: updatedUser => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
    }
  });

  const onSubmit = (data: FormValues) => {
    updateUser(data);
  };

  return (
    <Card elevation={2}>
      <CardHeader title="Profile Information" />
      <CardContent>
        {isSuccess && !isDirty && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully!
          </Alert>
        )}
        {error && <ErrorAlert error={error} />}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ width: '100%' }}
        >
          <Stack spacing={2}>
            <TextField
              label="First Name"
              {...register('firstName', {
                required: 'Please enter your first name.'
              })}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ' '}
              fullWidth
            />

            <TextField
              label="Last Name"
              {...register('lastName', {
                required: 'Please enter your last name.'
              })}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ' '}
              fullWidth
            />

            <TextField
              label="Email Address"
              type="email"
              {...register('email', {
                required: 'Please enter your email address.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address.'
                }
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ' '}
              fullWidth
            />

            <TextField
              label="Username"
              defaultValue={user.username}
              InputProps={{
                readOnly: true
              }}
              variant="filled"
              fullWidth
              helperText=" "
            />
            <TextField
              label="Joined On"
              defaultValue={new Date(user.createdAt).toLocaleDateString()}
              InputProps={{
                readOnly: true
              }}
              variant="filled"
              fullWidth
              helperText=" "
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isDirty || !isValid || isPending}
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm;
