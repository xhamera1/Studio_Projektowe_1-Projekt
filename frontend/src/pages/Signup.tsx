import { Link as RouterLink, Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SignupForm from '../components/signup/SignupForm.tsx';
import Link from '@mui/material/Link';

export default function Signup() {
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
              Sign up
            </Typography>
            <SignupForm />
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2">
                Log in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
