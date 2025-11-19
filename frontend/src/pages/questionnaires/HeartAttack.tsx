import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useHeartAttackPrediction } from '../../hooks/useHeartAttackPrediction.ts';
import ErrorAlert from '../../components/common/ErrorAlert.tsx';

const sexOptions = ['Female', 'Male'] as const;
const cpOptions = [
  'Typical angina',
  'Atypical angina',
  'Non-anginal pain',
  'Asymptomatic'
] as const;
const exangOptions = ['No', 'Yes'] as const;

type FormValues = {
  age: number | null;
  sex: (typeof sexOptions)[number];
  cp: (typeof cpOptions)[number];
  trestbps: number | null;
  chol: number | null;
  thalach: number | null;
  oldpeak: number | null;
  exang: (typeof exangOptions)[number];
};

const DEFAULT_FORM_VALUES = {
  age: null,
  sex: sexOptions[0],
  cp: cpOptions[0],
  trestbps: null,
  chol: null,
  thalach: null,
  oldpeak: null,
  exang: exangOptions[0]
};

const HeartAttack = () => {
  const {
    mutate: predict,
    isPending,
    isError,
    error
  } = useHeartAttackPrediction();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES
  });

  const onSubmit = (data: FormValues) => {
    const age = data.age!;
    const trestbps = data.trestbps!;
    const chol = data.chol!;
    const thalach = data.thalach!;
    const oldpeak = data.oldpeak!;
    const sex = Math.max(0, sexOptions.indexOf(data.sex));
    const cp = Math.max(1, cpOptions.indexOf(data.cp) + 1);
    const exang = Math.max(0, exangOptions.indexOf(data.exang));

    predict({
      age,
      sex,
      cp,
      trestbps,
      chol,
      thalach,
      oldpeak,
      exang
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
              Heart Attack Prediction
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
                placeholder={'e.g., 52'}
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
                label="Sex"
                select
                defaultValue={sexOptions[0]}
                {...register('sex', { required: 'Please select a sex.' })}
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
                label="Chest pain type"
                select
                defaultValue={cpOptions[0]}
                {...register('cp', {
                  required: 'Please select a chest pain type.'
                })}
                error={!!errors.cp}
                helperText={errors.cp ? errors.cp.message : ' '}
                fullWidth
              >
                {cpOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Resting Blood Pressure"
                placeholder={'e.g., 120 (in mm Hg)'}
                type="number"
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('trestbps', {
                  valueAsNumber: true,
                  required: 'Please enter a blood pressure.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 50 &&
                      value <= 250) ||
                    'Please enter a value between 50 and 250.'
                })}
                error={!!errors.trestbps}
                helperText={errors.trestbps ? errors.trestbps.message : ' '}
                fullWidth
              />
              <TextField
                label="Serum Cholesterol"
                placeholder={'e.g., 240 (in mg/dl)'}
                type="number"
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('chol', {
                  valueAsNumber: true,
                  required: 'Please enter a cholesterol level.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 100 &&
                      value <= 600) ||
                    'Please enter a value between 100 and 600.'
                })}
                error={!!errors.chol}
                helperText={errors.chol ? errors.chol.message : ' '}
                fullWidth
              />
              <TextField
                label="Max Heart Rate Achieved (thalach)"
                placeholder={'e.g., 150'}
                type="number"
                inputProps={{ inputMode: 'numeric', step: 1 }}
                {...register('thalach', {
                  valueAsNumber: true,
                  required: 'Please enter a max heart rate.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 30 &&
                      value <= 220) ||
                    'Please enter a value between 30 and 220.'
                })}
                error={!!errors.thalach}
                helperText={errors.thalach ? errors.thalach.message : ' '}
                fullWidth
              />
              <TextField
                label="ST Depression"
                placeholder={'e.g., 1.2'}
                type="number"
                inputProps={{ step: 0.1 }}
                {...register('oldpeak', {
                  valueAsNumber: true,
                  required: 'Please enter the ST depression value.',
                  validate: value =>
                    (typeof value === 'number' &&
                      Number.isFinite(value) &&
                      value >= 0 &&
                      value <= 10) ||
                    'Please enter a value between 0 and 10.'
                })}
                error={!!errors.oldpeak}
                helperText={errors.oldpeak ? errors.oldpeak.message : ' '}
                fullWidth
              />
              <TextField
                label="Exercise Induced Angina"
                select
                defaultValue={exangOptions[0]}
                {...register('exang', {
                  required: 'Please select an option.'
                })}
                error={!!errors.exang}
                helperText={errors.exang ? errors.exang.message : ' '}
                fullWidth
              >
                {exangOptions.map(opt => (
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
                {isPending ? 'Predicting...' : 'Predict'}
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default HeartAttack;
