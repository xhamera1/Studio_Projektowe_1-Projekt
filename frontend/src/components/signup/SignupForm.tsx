import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../hooks/useSignup.ts';
import type { SignupRequest, UserDemographicsRequest } from '../../utils/types.ts';
import ErrorAlert from '../common/ErrorAlert.tsx';

const sexOptions = ['Female', 'Male'] as const;

type DemographicsFormValues = {
  dateOfBirth: string;
  sex: (typeof sexOptions)[number] | '';
  weight: string;
  height: string;
};

type FormValues = Omit<SignupRequest, 'demographics'> & {
  demographics: DemographicsFormValues;
};

const DEFAULT_FORM_VALUES: FormValues = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
  demographics: {
    dateOfBirth: '',
    sex: '',
    weight: '',
    height: ''
  }
};

const SignupForm = () => {
  const { mutate: signup, isPending, error, isError } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_FORM_VALUES
  });

  const shouldSendDemographics = (
    demo: DemographicsFormValues
  ): demo is Required<DemographicsFormValues> => {
    return (
      !!demo.dateOfBirth &&
      !!demo.sex &&
      demo.weight.trim().length > 0 &&
      demo.height.trim().length > 0
    );
  };

  const onSubmit = (data: FormValues) => {
    const { demographics, ...rest } = data;
    let demographicsPayload: UserDemographicsRequest | null = null;

    if (shouldSendDemographics(demographics)) {
      demographicsPayload = {
        sex: sexOptions.indexOf(demographics.sex),
        dateOfBirth: new Date(demographics.dateOfBirth),
        weight: Number(demographics.weight),
        height: Number(demographics.height)
      };
    }

    signup({
      ...rest,
      demographics: demographicsPayload
    });
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

        <Divider />

        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Optional health profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Provide your basic health data once so we can pre-fill questionnaires
          and personalize recommendations. You can always update this later in
          the account settings.
        </Typography>

        <TextField
          label="Date of Birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register('demographics.dateOfBirth')}
          error={!!errors.demographics?.dateOfBirth}
          helperText={
            errors.demographics?.dateOfBirth
              ? 'Please provide a valid date.'
              : ' '
          }
          fullWidth
        />

        <TextField
          label="Sex"
          select
          {...register('demographics.sex')}
          error={!!errors.demographics?.sex}
          helperText={
            errors.demographics?.sex ? errors.demographics.sex.message : ' '
          }
          fullWidth
        >
          <MenuItem value="">Prefer not to say</MenuItem>
          {sexOptions.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Weight (kg)"
          type="number"
          inputProps={{ inputMode: 'numeric', step: 0.1, min: 1 }}
          {...register('demographics.weight')}
          error={!!errors.demographics?.weight}
          helperText={
            errors.demographics?.weight
              ? 'Please enter a valid weight.'
              : ' '
          }
          fullWidth
        />

        <TextField
          label="Height (cm)"
          type="number"
          inputProps={{ inputMode: 'numeric', step: 1, min: 1 }}
          {...register('demographics.height')}
          error={!!errors.demographics?.height}
          helperText={
            errors.demographics?.height
              ? 'Please enter a valid height.'
              : ' '
          }
          fullWidth
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
