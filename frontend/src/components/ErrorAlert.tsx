import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import type { ApiError } from '../utils/types.ts';

type Props = {
  error: ApiError;
};

const ErrorAlert = ({ error }: Props) => {
  return (
    <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
      <AlertTitle>{error?.title}</AlertTitle>
      {error?.detail}
    </Alert>
  );
};

export default ErrorAlert;
