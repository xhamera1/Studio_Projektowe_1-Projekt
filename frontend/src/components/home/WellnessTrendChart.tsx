import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { Spa } from '@mui/icons-material';
import { formatWellnessScore } from '../../utils/formatters';

interface ChartData {
  date: string;
  score: number;
  fullDate: Date;
}

interface WellnessTrendChartProps {
  data: ChartData[];
  avgScore: number | null;
}

const WellnessTrendChart = ({ data, avgScore }: WellnessTrendChartProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Spa color="success" />
        <Typography variant="h6">Wellness Score Trend</Typography>
        {avgScore !== null && (
          <Chip
            label={`Avg: ${formatWellnessScore(avgScore)}`}
            size="small"
            color="success"
            variant="outlined"
          />
        )}
      </Stack>
      <Box sx={{ width: '100%', height: 300 }}>
        {data.length > 0 ? (
          <BarChart
            width={undefined}
            height={300}
            series={[
              {
                data: data.map((d) => d.score),
                label: 'Wellness Score',
                color: '#2e7d32',
              },
            ]}
            xAxis={[
              {
                scaleType: 'band',
                data: data.map((d) => d.date),
                label: 'Date',
              },
            ]}
            yAxis={[{ min: 0, max: 100, label: 'Wellness Score' }]}
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

export default WellnessTrendChart;
