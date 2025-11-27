import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { Bloodtype } from '@mui/icons-material';
import { formatProbability } from '../../utils/formatters';

interface ChartData {
  date: string;
  probability: number;
  fullDate: Date;
}

interface DiabetesTrendChartProps {
  data: ChartData[];
  avgProb: number | null;
}

const DiabetesTrendChart = ({ data, avgProb }: DiabetesTrendChartProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Bloodtype color="error" />
        <Typography variant="h6">Diabetes Risk Trend</Typography>
        {avgProb !== null && (
          <Chip
            label={`Avg: ${formatProbability(avgProb)}`}
            size="small"
            color="error"
            variant="outlined"
          />
        )}
      </Stack>
      <Box sx={{ width: '100%', height: 300 }}>
        {data.length > 0 ? (
          <LineChart
            width={undefined}
            height={300}
            series={[
              {
                data: data.map((d) => d.probability),
                label: 'Diabetes Risk (%)',
                color: '#d32f2f',
              },
            ]}
            xAxis={[
              {
                scaleType: 'point',
                data: data.map((d) => d.date),
                label: 'Date',
              },
            ]}
            yAxis={[{ min: 0, max: 100, label: 'Probability (%)' }]}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography color="text.secondary">No data available</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default DiabetesTrendChart;
