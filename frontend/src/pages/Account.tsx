import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import ErrorAlert from '../components/common/ErrorAlert.tsx';
import UpdateProfileForm from '../components/profile/UpdateProfileForm.tsx';
import UpdateDemographicsForm from '../components/profile/UpdateDemographicsForm.tsx';
import DeleteAccount from '../components/profile/DeleteAccount.tsx';
import { useUserDemographicsQuery } from '../hooks/useUserDemographicsQuery.ts';

const ERROR_NOT_FOUND = 404;

const Account = () => {
  const { user } = useApplicationContext();

  const {
    data: demographics,
    isLoading,
    error
  } = useUserDemographicsQuery();

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

  const isProfileError =
    error != null && (error as any)?.status != ERROR_NOT_FOUND;

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
