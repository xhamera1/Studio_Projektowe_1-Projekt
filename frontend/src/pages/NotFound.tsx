import { Box, Button, Container, Typography } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4
        }}
      >
        <ReportProblemOutlinedIcon
          sx={{
            fontSize: '100px',
            color: 'primary.main',
            mb: 2
          }}
        />

        <Typography
          variant="h1"
          component="h1"
          sx={{
            // Responsive font size for the "404"
            fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: '0.05em'
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '1.75rem', sm: '2.25rem' }
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            maxWidth: '450px',
            mt: 1,
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.125rem' }
          }}
        >
          We're sorry, but the page you are looking for could not be found. It
          might have been moved, deleted, or you may have mistyped the URL.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
            }
          }}
        >
          Go Back to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
