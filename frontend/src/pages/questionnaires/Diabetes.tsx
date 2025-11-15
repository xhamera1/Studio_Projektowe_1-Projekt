import { useForm } from 'react-hook-form'; // No useState needed
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDiabetesPrediction } from '../../hooks/useDiabetesPrediction.ts';
import ErrorAlert from '../../components/ErrorAlert.tsx';

const smokingOptions = [
  'No information',
  'Current',
  'Ever',
  'Former',
  'Never'
] as const;

type FormValues = {
  age: number | null;
  height: number | null;
  weight: number | null;
  hba1c_level: number | null;
  blood_glucose_level: number | null;
  smoking_habits: (typeof smokingOptions)[number];
};

const DEFAULT_FORM_VALUES = {
  age: null,
  height: null,
  weight: null,
  hba1c_level: null,
  blood_glucose_level: null,
  smoking_habits: smokingOptions[0]
};

const Diabetes = () => {
  const {
    mutate: predict,
    isPending,
    error,
    isError
  } = useDiabetesPrediction();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES
  });

  const computeBmi = (height: number | null, weight: number | null) => {
    if (!height || !weight) return 0;
    const h = height / 100;
    return weight / (h * h);
  };

  const onSubmit = (data: FormValues) => {
    const bmi = computeBmi(data.height, data.weight);
    const smokingHistory = Math.max(
      0,
      smokingOptions.indexOf(data.smoking_habits)
    );

    predict({
      hba1cLevel: data.hba1c_level!,
      bloodGlucoseLevel: data.blood_glucose_level!,
      bmi: Number(bmi.toFixed(2)),
      age: data.age!,
      smokingHistory
    });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
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
              Diabetes Prediction
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
                placeholder={'e.g., 45'}
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('age', {
                  valueAsNumber: true,
                  required: 'Please enter an age.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 1) ||
                    'Please enter an age of 1 or older.'
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
                      value >= 1) ||
                    'Please enter a height of 1 cm or more.'
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
                      value >= 0.1) ||
                    'Please enter a weight of 0.1 kg or more.'
                })}
                error={!!errors.weight}
                helperText={errors.weight ? errors.weight.message : ' '}
                fullWidth
              />

              <TextField
                label="Glycated Hemoglobin (HbA1c)"
                type="number"
                placeholder={'e.g., 6.0 (Normal: < 5.7)'}
                inputProps={{ step: 0.1 }}
                {...register('hba1c_level', {
                  valueAsNumber: true,
                  required: 'Please enter an HbA1c level.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 0) ||
                    'Please enter a level of 0 or higher.'
                })}
                error={!!errors.hba1c_level}
                helperText={
                  errors.hba1c_level ? errors.hba1c_level.message : ' '
                }
                fullWidth
              />

              <TextField
                label="Blood Sugar Level"
                type="number"
                placeholder={'e.g., 90 (Normal: 70-100)'}
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('blood_glucose_level', {
                  valueAsNumber: true,
                  required: 'Please enter a blood sugar level.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 0) ||
                    'Please enter a level of 0 or higher.'
                })}
                error={!!errors.blood_glucose_level}
                helperText={
                  errors.blood_glucose_level
                    ? errors.blood_glucose_level.message
                    : ' '
                }
                fullWidth
              />

              <TextField
                label="Smoking habits"
                select
                {...register('smoking_habits', {
                  required: 'Please select your smoking habits.'
                })}
                error={!!errors.smoking_habits}
                defaultValue={smokingOptions[0]}
                helperText={
                  errors.smoking_habits ? errors.smoking_habits.message : ' '
                }
                fullWidth
              >
                {smokingOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

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
    </>
  );
};

export default Diabetes;
