import { createTheme } from '@mui/material';
import { grey, orange } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: orange[500],
      light: orange[300],
      dark: orange[700]
    },
    secondary: {
      main: grey[800]
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});
