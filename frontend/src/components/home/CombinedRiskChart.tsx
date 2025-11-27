import { Box, Divider, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

interface CombinedChartData {
  dates: string[];
  diabetesData: (number | null)[];
  heartAttackData: (number | null)[];
  strokeData: (number | null)[];
}

interface CombinedRiskChartProps {
  data: CombinedChartData | null;
  hasDiabetesData: boolean;
  hasHeartAttackData: boolean;
  hasStrokeData: boolean;
}

const CombinedRiskChart = ({
  data,
  hasDiabetesData,
  hasHeartAttackData,
  hasStrokeData,
}: CombinedRiskChartProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Combined Risk Overview
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {data && data.dates.length > 0 ? (
        <Box sx={{ width: '100%', height: 350 }}>
          <LineChart
            width={undefined}
            height={350}
            series={[
              ...(hasDiabetesData
                ? [
                    {
                      data: data.diabetesData,
                      label: 'Diabetes',
                      color: '#d32f2f',
                    },
                  ]
                : []),
              ...(hasHeartAttackData
                ? [
                    {
                      data: data.heartAttackData,
                      label: 'Heart Attack',
                      color: '#f57c00',
                    },
                  ]
                : []),
              ...(hasStrokeData
                ? [
                    {
                      data: data.strokeData,
                      label: 'Stroke',
                      color: '#1976d2',
                    },
                  ]
                : []),
            ]}
            xAxis={[
              {
                scaleType: 'point',
                data: data.dates,
                label: 'Date',
              },
            ]}
            yAxis={[{ min: 0, max: 100, label: 'Probability (%)' }]}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 350,
          }}
        >
          <Typography color="text.secondary">
            No data available for combined chart
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CombinedRiskChart;
