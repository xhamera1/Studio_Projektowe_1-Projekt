import { Box, Grid, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  value: ReactNode;
  size?: number;
};

const PredictionDetailField = ({ label, value, size = 6 }: Props) => (
  <Grid size={size}>
    <Typography variant="body2">
      <Box
        component="span"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mr: 0.5
        }}
      >
        {label}:
      </Box>
      <Box
        component="span"
        sx={{
          color: 'text.secondary'
        }}
      >
        {value}
      </Box>
    </Typography>
  </Grid>
);

export default PredictionDetailField;
