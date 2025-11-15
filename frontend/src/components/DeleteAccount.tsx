import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@tanstack/react-query';
import { userService } from '../services/userService.ts';
import type { ApiError } from '../utils/types.ts';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { useApplicationContext } from '../contexts/UserContextProvider.tsx';
import ErrorAlert from './ErrorAlert.tsx';

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const { token, clearAuthentication } = useAuthenticationContext();
  const { user, setUser } = useApplicationContext();
  const navigate = useNavigate();

  const { mutate: deleteUser, error } = useMutation<void, ApiError, void>({
    mutationFn: () => {
      if (!user || !token) {
        throw new Error('User not authenticated');
      }
      return userService.deleteUser(user.id, token.value);
    },
    onSuccess: () => {
      console.log('User account deleted successfully');
      setUser(null);
      clearAuthentication();
      navigate('/login');
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteUser();
  };

  return (
    <>
      <Card
        elevation={2}
        sx={{ borderColor: 'error.main', borderWidth: 1, borderStyle: 'solid' }}
      >
        <CardHeader title="Danger Zone" sx={{ color: 'error.main' }} />
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Once you delete your account, there is no going back. Please be
            certain.
          </Typography>

          {error && <ErrorAlert error={error} />}

          <Box>
            <Button variant="contained" color="error" onClick={handleOpen}>
              {'Delete Your Account'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete your
            account and all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            {'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAccount;
