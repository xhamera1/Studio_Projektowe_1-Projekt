import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../contexts/UserContextProvider.tsx';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import type { ApiError, UserDemographics } from '../utils/types.ts';
import { userDemographicsService } from '../services/userDemographicsService.ts';
import ErrorAlert from '../components/common/ErrorAlert.tsx';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import UpdateDemographicsForm from '../components/profile/UpdateDemographicsForm.tsx';
import DeleteAccount from '../components/profile/DeleteAccount.tsx';

const ERROR_NOT_FOUND = 404;

const Account = () => {
  const { user } = useUserContext();
  const { isAuthenticated, token } = useAuthenticationContext();

  const {
    data: demographics,
    isLoading,
    error
  } = useQuery<UserDemographics, ApiError>({
    queryKey: ['userDemographics', user?.id],
    queryFn: () => {
      if (!isAuthenticated || !user) {
        throw new Error('User or token not available');
      }
      return userDemographicsService.getUserDemographics(user.id, token!.value);
    },
    enabled: !!user && !!token,
    retry: (failureCount, err) => {
      if (err.status === ERROR_NOT_FOUND) {
        return false;
      }
      return failureCount < 3;
    }
  });

  if (!user || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 96px)'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const isProfileError = error != null && error.status != ERROR_NOT_FOUND;

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          py: 4
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Account Settings
          </Typography>

          {isProfileError && <ErrorAlert error={error} />}

          <UpdateProfileForm user={user} />

          <UpdateDemographicsForm
            userId={user.id}
            demographics={demographics ?? null}
          />

          <DeleteAccount />
        </Stack>
      </Container>
    </>
  );
};

export default Account;
