import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from '@mui/material';
import type {
  ApiError,
  UserDemographics,
  UserDemographicsRequest
} from '../../utils/types.ts';
import { userDemographicsService } from '../../services/userDemographicsService.ts';
import ErrorAlert from '../common/ErrorAlert.tsx';
import { useApplicationContext } from '../../contexts/ApplicationContextProvider.tsx';

const sexOptions = ['Female', 'Male'] as const;

type FormValues = {
  sex: (typeof sexOptions)[number];
  dateOfBirth: string;
  weight: number | null;
  height: number | null;
};

type Props = {
  userId: number;
  demographics: UserDemographics | null;
};

const formatDateForInput = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0];
};

const UpdateDemographicsForm = ({ userId, demographics }: Props) => {
  const { accessToken } = useApplicationContext();
  const queryClient = useQueryClient();
  const dataExists = demographics != null;

  const getDefaultValues = (): FormValues => ({
    dateOfBirth: demographics
      ? formatDateForInput(demographics.dateOfBirth)
      : '',
    sex: sexOptions[demographics?.sex ?? 1],
    weight: demographics?.weight ?? null,
    height: demographics?.height ?? null
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: getDefaultValues()
  });

  const {
    mutate: saveData,
    isPending,
    isSuccess,
    error
  } = useMutation<UserDemographics, ApiError, UserDemographicsRequest>({
    mutationFn: (request: UserDemographicsRequest) => {
      if (!accessToken) throw new Error('Not authenticated');
      if (dataExists) {
        return userDemographicsService.updateUserDemographics(
          request,
          userId,
          accessToken.value
        );
      } else {
        return userDemographicsService.addUserDemographics(
          request,
          userId,
          accessToken.value
        );
      }
    },
    onSuccess: () => {
      // Refetch demographics data
      queryClient.invalidateQueries({ queryKey: ['userDemographics', userId] });
    }
  });

  const onSubmit = (data: FormValues) => {
    saveData({
      sex: sexOptions.indexOf(data.sex),
      dateOfBirth: new Date(data.dateOfBirth),
      weight: data.weight!,
      height: data.height!
    });
  };

  return (
    <Card elevation={2}>
      <CardHeader title="Health & Demographic Information" />
      <CardContent>
        {isSuccess && !isDirty && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Information updated successfully!
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
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register('dateOfBirth', {
                required: 'Please enter your date of birth.'
              })}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ' '}
              fullWidth
            />

            <TextField
              label="Sex"
              select
              {...register('sex', {
                valueAsNumber: true,
                required: 'Please select your sex.'
              })}
              defaultValue={getDefaultValues().sex}
              error={!!errors.sex}
              helperText={errors.sex ? errors.sex.message : ' '}
              fullWidth
            >
              {sexOptions.map(opt => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Weight (kg)"
              type="number"
              placeholder="e.g., 75.5"
              inputProps={{ inputMode: 'numeric', step: 0.1 }}
              {...register('weight', {
                valueAsNumber: true,
                required: 'Please enter a weight.',
                validate: value =>
                  (typeof value === 'number' &&
                    Number.isFinite(value) &&
                    value >= 1) ||
                  'Please enter a weight of 1 kg or more.'
              })}
              error={!!errors.weight}
              helperText={errors.weight ? errors.weight.message : ' '}
              fullWidth
            />

            <TextField
              label="Height (cm)"
              type="number"
              placeholder="e.g., 170"
              inputProps={{ inputMode: 'numeric', step: 1 }}
              {...register('height', {
                valueAsNumber: true,
                required: 'Please enter a height.',
                validate: value =>
                  (typeof value === 'number' &&
                    Number.isFinite(value) &&
                    value >= 1) ||
                  'Please enter a height of 1 cm or more.'
              })}
              error={!!errors.height}
              helperText={errors.height ? errors.height.message : ' '}
              fullWidth
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

export default UpdateDemographicsForm;
