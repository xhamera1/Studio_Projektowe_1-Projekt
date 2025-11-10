import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLoginForm } from '../../hooks/useLoginForm.ts';
import { Alert } from '@mui/material';

const LoginForm = () => {
  const {
    credentials,
    errors,
    isPending,
    submitError,
    handleChange,
    handleSubmit
  } = useLoginForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2
      }}
    >
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <TextField
        error={!!errors.username}
        helperText={errors.username}
        id="username"
        label="Username"
        type="text"
        name="username"
        autoComplete="username"
        autoFocus
        required
        fullWidth
        variant="outlined"
        value={credentials.username}
        onChange={handleChange}
      />
      <TextField
        error={!!errors.password}
        helperText={errors.password}
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        required
        fullWidth
        variant="outlined"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth variant="contained" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Log in'}
      </Button>
    </Box>
  );
};

export default LoginForm;
