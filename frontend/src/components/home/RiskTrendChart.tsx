import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

interface ChartData {
    date: string;
    probability: number;
    fullDate: Date;
}

interface RiskTrendChartProps {
    title: string;
    avgProb: number | null;
    data: ChartData[];
    icon: React.ReactNode;
    color: string;
    lineColor: string;
}

const RiskTrendChart = ({
                            title,
                            avgProb,
                            data,
                            icon,
                            color,
                            lineColor,
                        }: RiskTrendChartProps) => {
    return (
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                {icon}
                <Typography variant="h6">{title}</Typography>

                {avgProb !== null && (
                    <Chip
                        label={`Avg: ${avgProb.toFixed(1)}%`}
                        size="small"
                        color={color as any}
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
                                label: title,
                                color: lineColor,
                                curve: 'monotoneX',
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

export default RiskTrendChart;
