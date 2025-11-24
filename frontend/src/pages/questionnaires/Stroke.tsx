import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useStrokePrediction } from '../../hooks/useStrokePrediction.ts';
import ErrorAlert from '../../components/common/ErrorAlert.tsx';
import PredictionDetailsDialog from '../../components/predictionHistory/PredictionDetailsDialog.tsx';
import type { SelectedPrediction } from '../../utils/types.ts';
import { useApplicationContext } from '../../contexts/ApplicationContextProvider.tsx';
import { useUserDemographicsQuery } from '../../hooks/useUserDemographicsQuery.ts';
import { calculateAgeFromDateOfBirth } from '../../utils/profile.ts';
import { useLocalStorage } from 'usehooks-ts';

export const sexOptions = ['female', 'male'] as const;

export const hypertensionOptions = ['no', 'yes'] as const;

export const heartDiseaseOptions = ['no', 'yes'] as const;

export const workTypeOptions = [
  'Private',
  'Self-employed',
  'Government job',
  'Children',
  'Never worked'
] as const;

export type FormValues = {
  age: number | null;
  height: number | null;
  weight: number | null;
  sex: (typeof sexOptions)[number];
  hypertension: (typeof hypertensionOptions)[number];
  heart_disease: (typeof heartDiseaseOptions)[number];
  work_type: (typeof workTypeOptions)[number];
  avg_glucose_level: number | null;
};

const DEFAULT_FORM_VALUES = {
  age: null,
  sex: sexOptions[0],
  hypertension: hypertensionOptions[0],
  heart_disease: heartDiseaseOptions[0],
  work_type: workTypeOptions[0],
  avg_glucose_level: null,
  height: null,
  weight: null
};

const Stroke = () => {
  const { user } = useApplicationContext();
  const { data: demographics } = useUserDemographicsQuery();
  const [storedValues, setStoredValues] = useLocalStorage<FormValues | null>(
    `stroke-form-${user?.id ?? 'guest'}`,
    null
  );
  const derivedDefaults = useMemo<FormValues>(() => {
    if (storedValues) {
      return storedValues;
    }
    if (demographics) {
      return {
        ...DEFAULT_FORM_VALUES,
        age: calculateAgeFromDateOfBirth(demographics.dateOfBirth),
        height: demographics.height ?? null,
        weight: demographics.weight ?? null,
        sex: demographics.sex === 1 ? sexOptions[1] : sexOptions[0]
      };
    }
    return { ...DEFAULT_FORM_VALUES };
  }, [storedValues, demographics]);
  const queryClient = useQueryClient();
  const { mutate: predict, isPending, isError, error } = useStrokePrediction();
  const [predictionResult, setPredictionResult] =
    useState<SelectedPrediction>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: derivedDefaults
  });

  useEffect(() => {
    reset(derivedDefaults);
  }, [derivedDefaults, reset]);

  const computeBmi = (height: number | null, weight: number | null) => {
    if (!height || !weight) return 0;
    const h = height / 100;
    return weight / (h * h);
  };

  const onSubmit = (data: FormValues) => {
    const bmi = computeBmi(data.height, data.weight);

    setPredictionResult(null);

    const formSnapshot: FormValues = { ...data };

    predict(
      {
        age: data.age!,
        sex: sexOptions.indexOf(data.sex),
        hypertension: hypertensionOptions.indexOf(data.hypertension),
        heartDisease: heartDiseaseOptions.indexOf(data.heart_disease),
        workType: workTypeOptions.indexOf(data.work_type),
        avgGlucoseLevel: data.avg_glucose_level!,
        bmi: Number(bmi.toFixed(2))
      },
      {
        onSuccess: record => {
          setStoredValues(formSnapshot);
          setPredictionResult({
            type: 'stroke',
            record
          });
          queryClient.invalidateQueries({ queryKey: ['predictionHistory'] });
        }
      }
    );
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
              Stroke Prediction
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Provide the information below to get a quick estimate
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
                label="Age"
                type="number"
                placeholder={'e.g., 67'}
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('age', {
                  valueAsNumber: true,
                  required: 'Please enter an age.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 1 &&
                      value <= 120) ||
                    'Please enter an age between 1 and 120.'
                })}
                error={!!errors.age}
                helperText={errors.age ? errors.age.message : ' '}
                fullWidth
              />

              <TextField
                label="Height (cm)"
                type="number"
                placeholder={'e.g., 170'}
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('height', {
                  valueAsNumber: true,
                  required: 'Please enter a height.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 50 &&
                      value <= 300) ||
                    'Please enter a height between 50 and 300 cm.'
                })}
                error={!!errors.height}
                helperText={errors.height ? errors.height.message : ' '}
                fullWidth
              />

              <TextField
                label="Weight (kg)"
                type="number"
                placeholder={'e.g., 75.5'}
                inputProps={{ inputMode: 'numeric', step: 0.1 }}
                {...register('weight', {
                  valueAsNumber: true,
                  required: 'Please enter a weight.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 30 &&
                      value <= 400) ||
                    'Please enter a weight between 30 and 400 kg.'
                })}
                error={!!errors.weight}
                helperText={errors.weight ? errors.weight.message : ' '}
                fullWidth
              />

              <Controller
                name="sex"
                control={control}
                rules={{ required: 'Please select a sex.' }}
                render={({ field }) => (
                  <TextField
                    label="Sex"
                    select
                    {...field}
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
                )}
              />

              <TextField
                label="Hypertension"
                select
                {...register('hypertension', {
                  required: 'Please select an option.'
                })}
                error={!!errors.hypertension}
                helperText={
                  errors.hypertension ? errors.hypertension.message : ' '
                }
                fullWidth
              >
                {hypertensionOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Heart Disease"
                select
                {...register('heart_disease', {
                  required: 'Please select an option.'
                })}
                error={!!errors.heart_disease}
                helperText={
                  errors.heart_disease ? errors.heart_disease.message : ' '
                }
                fullWidth
              >
                {heartDiseaseOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Work Type"
                select
                {...register('work_type', {
                  required: 'Please select a work type.'
                })}
                error={!!errors.work_type}
                helperText={errors.work_type ? errors.work_type.message : ' '}
                fullWidth
              >
                {workTypeOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Average Glucose Level"
                type="number"
                placeholder={'e.g., 105.92'}
                inputProps={{ inputMode: 'numeric', step: 0.1 }}
                {...register('avg_glucose_level', {
                  valueAsNumber: true,
                  required: 'Please enter a glucose level.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 20 &&
                      value <= 500) ||
                    'Please enter a value between 20 and 500.'
                })}
                error={!!errors.avg_glucose_level}
                helperText={
                  errors.avg_glucose_level
                    ? errors.avg_glucose_level.message
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
                {isPending ? 'Predicting...' : 'Submit'}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
      <PredictionDetailsDialog
        open={!!predictionResult}
        prediction={predictionResult}
        onClose={() => setPredictionResult(null)}
      />
    </>
  );
};

export default Stroke;
