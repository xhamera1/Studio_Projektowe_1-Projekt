import * as React from 'react';
import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  /* This mutation sends credentials to the backend and, on success, retrieves and stores the token. */
  const mutation = useMutation({
    mutationFn: (creds: { email: string; password: string }) => loginUser(creds),
    onSuccess: (res) => {
      const token = res?.token;
      if (token) {
        login(token);
        navigate('/', { replace: true });
      }
    },
  });

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  /* This handler triggers the mutation with the current input values and prevents form navigation. */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      mutation.mutate({ email, password });
    }
  };

  return (
      <><CssBaseline enableColorScheme/><SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
              <Typography
                  component="h1"
                  variant="h4"
                  sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
              >
                  Sign in
              </Typography>
              <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      gap: 2,
                  }}
              >
                  <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <TextField
                          error={emailError}
                          helperText={emailErrorMessage}
                          id="email"
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          autoComplete="email"
                          autoFocus
                          required
                          fullWidth
                          variant="outlined"
                          onChange={e => setEmail(e.target.value)}
                          color={emailError ? 'error' : 'primary'}/>
                  </FormControl>
                  <FormControl>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <TextField
                          error={passwordError}
                          helperText={passwordErrorMessage}
                          name="password"
                          placeholder="••••••"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          autoFocus
                          required
                          fullWidth
                          variant="outlined"
                          onChange={e => setPassword(e.target.value)}
                          color={passwordError ? 'error' : 'primary'}/>
                  </FormControl>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={validateInputs}
                  >
                      {mutation.isPending ? 'Signing in...' : 'Sign in'}
                  </Button>
              </Box>

              {mutation.isError && (
                  <Alert severity="error">
                      Login failed. Please check your credentials.
                  </Alert>
              )}
              {!mutation.isError && mutation.isSuccess && !mutation.data?.token && (
                  <Alert severity="error">
                      No token returned by server
                  </Alert>
              )}

              <Divider>or</Divider>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                  <Typography sx={{textAlign: 'center'}}>
                      Don&apos;t have an account?{' '}
                      <Link
                          component={RouterLink}
                          to="/signup"
                          variant="body2"
                          sx={{alignSelf: 'center'}}
                      >
                          Sign up
                      </Link>
                  </Typography>
              </Box>
          </Card>
      </SignInContainer></>
  );
}
