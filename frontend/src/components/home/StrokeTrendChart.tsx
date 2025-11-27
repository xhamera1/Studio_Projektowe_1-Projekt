import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { Grain } from '@mui/icons-material';
import { formatProbability } from '../../utils/formatters';

interface ChartData {
  date: string;
  probability: number;
  fullDate: Date;
}

interface StrokeTrendChartProps {
  data: ChartData[];
  avgProb: number | null;
}

const StrokeTrendChart = ({ data, avgProb }: StrokeTrendChartProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Grain color="primary" />
        <Typography variant="h6">Stroke Risk Trend</Typography>
        {avgProb !== null && (
          <Chip
            label={`Avg: ${formatProbability(avgProb)}`}
            size="small"
            color="primary"
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
                label: 'Stroke Risk (%)',
                color: '#1976d2',
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

export default StrokeTrendChart;
