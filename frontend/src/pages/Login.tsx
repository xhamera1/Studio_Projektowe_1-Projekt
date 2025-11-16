import { Link as RouterLink, Navigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import LoginForm from '../components/login/LoginForm.tsx';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Login() {
  const { isAuthenticated } = useAuthenticationContext();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Card variant="outlined">
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <LoginForm />
            <Typography sx={{ textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link component={RouterLink} to="/signup" variant="body2">
                Sign up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
