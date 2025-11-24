import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import type { ApiError } from '../../utils/types.ts';

type Props = {
  error: ApiError;
};

const ErrorAlert = ({ error }: Props) => {
  return (
    <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
      <AlertTitle>{error?.detail}</AlertTitle>
      {error?.errors && Object.keys(error.errors).length > 0 && (
        <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5 }}>
          {Object.entries(error.errors).map(([field, message]) => (
            <li key={field}>
              <strong>{field}:</strong> {message}
            </li>
          ))}
        </Box>
      )}
    </Alert>
  );
};

export default ErrorAlert;
