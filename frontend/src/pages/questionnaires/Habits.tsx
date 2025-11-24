import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Container,
  Slider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ErrorAlert from '../../components/common/ErrorAlert.tsx';
import PredictionDetailsDialog from '../../components/predictionHistory/PredictionDetailsDialog.tsx';
import { useHabitsAssessment } from '../../hooks/useHabitsAssessment.ts';
import type {
  HabitsAssessmentRequest,
  SelectedPrediction
} from '../../utils/types.ts';
import { useLocalStorage } from 'usehooks-ts';
import { useApplicationContext } from '../../contexts/ApplicationContextProvider.tsx';

type FormValues = HabitsAssessmentRequest;

const DEFAULT_FORM_VALUES: FormValues = {
  waterIntakeGlasses: 6,
  sleepHours: 7.5,
  stepsPerDay: 6000,
  exerciseMinutes: 20,
  screenTimeHours: 4,
  stressLevel: 3,
  fruitsVeggiesServings: 3
};

const Habits = () => {
  const { user } = useApplicationContext();
  const { mutate: assessHabits, isPending, error, isError } =
    useHabitsAssessment();
  const [result, setResult] = useState<SelectedPrediction>(null);
  const [storedValues, setStoredValues] = useLocalStorage<FormValues>(
    `habits-form-${user?.id ?? 'guest'}`,
    DEFAULT_FORM_VALUES
  );
  const mergedDefaults = useMemo<FormValues>(() => {
    return storedValues ?? DEFAULT_FORM_VALUES;
  }, [storedValues]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange'
  });

  useEffect(() => {
    reset(mergedDefaults);
  }, [mergedDefaults, reset]);

  const onSubmit = (data: FormValues) => {
    setResult(null);
    assessHabits(data, {
      onSuccess: record => {
        setStoredValues(data);
        setResult({
          type: 'habits',
          record
        });
      }
    });
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 96px)',
          py: 4
        }}
      >
        <Card
          elevation={3}
          sx={{
            width: '100%',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)'
          }}
        >
          <Box component="div" sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              component="h1"
              align="center"
              sx={{ fontWeight: 600 }}
            >
              Daily Habits Check-in
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Share your routine to receive tailored wellness suggestions.
            </Typography>
          </Box>

          {isError && <ErrorAlert error={error} />}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ width: '100%' }}
          >
            <Stack spacing={2}>
              <TextField
                label="Water intake (glasses per day)"
                type="number"
                inputProps={{ inputMode: 'numeric', min: 0, max: 20 }}
                {...register('waterIntakeGlasses', {
                  valueAsNumber: true,
                  required: 'Please share your daily hydration amount.',
                  min: { value: 0, message: 'Cannot be negative.' },
                  max: { value: 20, message: 'Please keep it below 20.' }
                })}
                error={!!errors.waterIntakeGlasses}
                helperText={
                  errors.waterIntakeGlasses
                    ? errors.waterIntakeGlasses.message
                    : ' '
                }
                fullWidth
              />

              <TextField
                label="Average sleep (hours)"
                type="number"
                inputProps={{ step: 0.25, min: 0, max: 24 }}
                {...register('sleepHours', {
                  valueAsNumber: true,
                  required: 'Please provide your average nightly sleep.',
                  min: { value: 0, message: 'Sleep cannot be negative.' },
                  max: { value: 24, message: 'Please stay within 24 hours.' }
                })}
                error={!!errors.sleepHours}
                helperText={
                  errors.sleepHours ? errors.sleepHours.message : ' '
                }
                fullWidth
              />

              <TextField
                label="Steps per day"
                type="number"
                inputProps={{ inputMode: 'numeric', min: 0 }}
                {...register('stepsPerDay', {
                  valueAsNumber: true,
                  required: 'Please enter an approximate step count.',
                  min: { value: 0, message: 'Steps cannot be negative.' }
                })}
                error={!!errors.stepsPerDay}
                helperText={
                  errors.stepsPerDay ? errors.stepsPerDay.message : ' '
                }
                fullWidth
              />

              <TextField
                label="Intentional exercise (minutes / day)"
                type="number"
                inputProps={{ inputMode: 'numeric', min: 0, max: 600 }}
                {...register('exerciseMinutes', {
                  valueAsNumber: true,
                  required: 'Please estimate your active minutes.',
                  min: { value: 0, message: 'Cannot be negative.' },
                  max: { value: 600, message: 'Please keep it under 600.' }
                })}
                error={!!errors.exerciseMinutes}
                helperText={
                  errors.exerciseMinutes ? errors.exerciseMinutes.message : ' '
                }
                fullWidth
              />

              <TextField
                label="Recreational screen time (hours / day)"
                type="number"
                inputProps={{ step: 0.25, min: 0, max: 24 }}
                {...register('screenTimeHours', {
                  valueAsNumber: true,
                  required: 'Please estimate your leisure screen time.',
                  min: { value: 0, message: 'Cannot be negative.' },
                  max: { value: 24, message: 'Please stay within 24 hours.' }
                })}
                error={!!errors.screenTimeHours}
                helperText={
                  errors.screenTimeHours ? errors.screenTimeHours.message : ' '
                }
                fullWidth
              />

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Stress level (1 - relaxed, 5 - overwhelmed)
                </Typography>
                <Controller
                  name="stressLevel"
                  control={control}
                  rules={{
                    required: true,
                    min: 1,
                    max: 5
                  }}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      value={field.value}
                      onChange={(_, value) =>
                        field.onChange(Array.isArray(value) ? value[0] : value)
                      }
                      step={1}
                      marks
                      min={1}
                      max={5}
                      valueLabelDisplay="auto"
                      aria-label="Stress level slider"
                    />
                  )}
                />
              </Box>

              <TextField
                label="Fruit & veggie servings (per day)"
                type="number"
                inputProps={{ inputMode: 'numeric', min: 0, max: 15 }}
                {...register('fruitsVeggiesServings', {
                  valueAsNumber: true,
                  required: 'Please estimate your servings.',
                  min: { value: 0, message: 'Cannot be negative.' },
                  max: {
                    value: 15,
                    message: 'Please keep the value realistic (<= 15).'
                  }
                })}
                error={!!errors.fruitsVeggiesServings}
                helperText={
                  errors.fruitsVeggiesServings
                    ? errors.fruitsVeggiesServings.message
                    : ' '
                }
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isValid || isPending}
              >
                {isPending ? 'Analyzing habits...' : 'Get recommendations'}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
      <PredictionDetailsDialog
        open={!!result}
        prediction={result}
        onClose={() => setResult(null)}
      />
    </>
  );
};

export default Habits;
