import { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  Alert,
  Paper,
} from '@mui/material';
import {
  MonitorHeart,
  Bloodtype,
  Spa,
  Assessment,
  Person, Grain,
} from '@mui/icons-material';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import { usePredictionHistory } from '../hooks/usePredictionHistory.ts';
import { useUserDemographicsQuery } from '../hooks/useUserDemographicsQuery.ts';
import ErrorAlert from '../components/common/ErrorAlert.tsx';
import type {
  DiabetesPredictionRecord,
  HeartAttackPredictionRecord,
  StrokePredictionRecord,
  HabitsAssessmentRecord,
} from '../utils/types.ts';
import {
  formatDateTime,
  formatProbability,
  formatWellnessScore,
} from '../utils/formatters.ts';
import { calculateAgeFromDateOfBirth } from '../utils/profile.ts';
import WellnessTrendChart from '../components/home/WellnessTrendChart.tsx';
import CombinedRiskChart from '../components/home/CombinedRiskChart.tsx';
import RiskTrendChart from "../components/home/RiskTrendChart.tsx";

/**
 * Normalizes a probability value to percentage format (0-100).
 * If value is less than 1, assumes it's in decimal format and multiplies by 100.
 * Handles edge cases like negative values and values > 100.
 * @param value - Probability value (either 0.0-1.0 or 0-100)
 * @returns Percentage value (0-100)
 */
const normalizeProbabilityToPercentage = (
  value: number | null | undefined
): number => {
  if (value == null || Number.isNaN(value)) {
    return 0;
  }

  // Handle negative values
  if (value < 0) {
    return 0;
  }

  // If value is less than 1, assume it's in decimal format (0.0-1.0) and convert to percentage
  // Otherwise, assume it's already in percentage format (0-100)
  const percentage = value < 1.0 ? value * 100 : value;

  // Clamp to valid range [0, 100]
  return Math.max(0, Math.min(100, percentage));
};

const Home = () => {
  const { user, isUserAuthenticated } = useApplicationContext();
  const {
    data: predictions,
    isLoading,
    isError,
    error,
  } = usePredictionHistory();
  const { data: demographics } = useUserDemographicsQuery();

  // Prepare chart data for prediction trends
  const diabetesChartData = useMemo(() => {
    if (!predictions?.diabetesPredictions || !predictions.diabetesPredictions.length)
      return [];
    return predictions.diabetesPredictions
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((record: DiabetesPredictionRecord) => {
        const date = new Date(record.createdAt);
        return {
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year:
              date.getFullYear() !== new Date().getFullYear()
                ? 'numeric'
                : undefined,
          }),
          probability: normalizeProbabilityToPercentage(
            record.predictionProbability
          ),
          fullDate: date,
        };
      });
  }, [predictions?.diabetesPredictions]);

  const heartAttackChartData = useMemo(() => {
    if (
      !predictions?.heartAttackPredictions ||
      !predictions.heartAttackPredictions.length
    )
      return [];
    return predictions.heartAttackPredictions
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((record: HeartAttackPredictionRecord) => {
        const date = new Date(record.createdAt);
        return {
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year:
              date.getFullYear() !== new Date().getFullYear()
                ? 'numeric'
                : undefined,
          }),
          probability: normalizeProbabilityToPercentage(
            record.predictionProbability
          ),
          fullDate: date,
        };
      });
  }, [predictions?.heartAttackPredictions]);

  const strokeChartData = useMemo(() => {
    if (!predictions?.strokePredictions || !predictions.strokePredictions.length)
      return [];
    return predictions.strokePredictions
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((record: StrokePredictionRecord) => {
        const date = new Date(record.createdAt);
        return {
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year:
              date.getFullYear() !== new Date().getFullYear()
                ? 'numeric'
                : undefined,
          }),
          probability: normalizeProbabilityToPercentage(
            record.predictionProbability
          ),
          fullDate: date,
        };
      });
  }, [predictions?.strokePredictions]);

  const wellnessChartData = useMemo(() => {
    if (!predictions?.habitAssessments || !predictions.habitAssessments.length)
      return [];
    return predictions.habitAssessments
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((record: HabitsAssessmentRecord) => {
        const date = new Date(record.createdAt);
        return {
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year:
              date.getFullYear() !== new Date().getFullYear()
                ? 'numeric'
                : undefined,
          }),
          score: record.wellnessScore,
          fullDate: date,
        };
      });
  }, [predictions?.habitAssessments]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!predictions) {
      return {
        totalPredictions: 0,
        latestDiabetes: null,
        latestHeartAttack: null,
        latestStroke: null,
        latestHabits: null,
        avgDiabetesProb: null,
        avgHeartAttackProb: null,
        avgStrokeProb: null,
        avgWellnessScore: null,
      };
    }

    const totalPredictions =
      (predictions.diabetesPredictions?.length ?? 0) +
      (predictions.heartAttackPredictions?.length ?? 0) +
      (predictions.strokePredictions?.length ?? 0) +
      (predictions.habitAssessments?.length ?? 0);

    const latestDiabetes =
      predictions?.diabetesPredictions.length > 0
        ? predictions.diabetesPredictions[
            predictions.diabetesPredictions.length - 1
          ]
        : null;
    const latestHeartAttack =
      predictions?.heartAttackPredictions.length > 0
        ? predictions.heartAttackPredictions[
            predictions.heartAttackPredictions.length - 1
          ]
        : null;
    const latestStroke =
      predictions?.strokePredictions && predictions.strokePredictions.length > 0
        ? predictions.strokePredictions[predictions.strokePredictions.length - 1]
        : null;
    const latestHabits =
      predictions?.habitAssessments.length > 0
        ? predictions.habitAssessments[predictions.habitAssessments.length - 1]
        : null;

    const avgDiabetesProb =
      predictions?.diabetesPredictions &&
      predictions.diabetesPredictions.length > 0
        ? predictions.diabetesPredictions.reduce(
            (sum, p) =>
              sum + normalizeProbabilityToPercentage(p.predictionProbability),
            0
          ) / predictions.diabetesPredictions.length
        : null;

    const avgHeartAttackProb =
      predictions?.heartAttackPredictions &&
      predictions.heartAttackPredictions.length > 0
        ? predictions.heartAttackPredictions.reduce(
            (sum, p) =>
              sum + normalizeProbabilityToPercentage(p.predictionProbability),
            0
          ) / predictions.heartAttackPredictions.length
        : null;

    const avgStrokeProb =
      predictions?.strokePredictions && predictions.strokePredictions.length > 0
        ? predictions.strokePredictions.reduce(
            (sum, p) =>
              sum + normalizeProbabilityToPercentage(p.predictionProbability),
            0
          ) / predictions.strokePredictions.length
        : null;

    const avgWellnessScore =
      predictions?.habitAssessments && predictions.habitAssessments.length > 0
        ? predictions.habitAssessments.reduce(
            (sum, h) => sum + h.wellnessScore,
            0
          ) / predictions.habitAssessments.length
        : null;

    return {
      totalPredictions,
      latestDiabetes,
      latestHeartAttack,
      latestStroke,
      latestHabits,
      avgDiabetesProb,
      avgHeartAttackProb,
      avgStrokeProb,
      avgWellnessScore,
    };
  }, [predictions]);

  const userAge = demographics
    ? calculateAgeFromDateOfBirth(demographics.dateOfBirth)
    : null;

  const hasData = stats.totalPredictions > 0;

  // Prepare combined chart data
  const combinedChartData = useMemo(() => {
    if (
      diabetesChartData.length === 0 &&
      heartAttackChartData.length === 0 &&
      strokeChartData.length === 0
    ) {
      return null;
    }

    // Collect all unique dates
    const allDates = new Set<string>();
    diabetesChartData.forEach((d) => allDates.add(d.date));
    heartAttackChartData.forEach((h) => allDates.add(h.date));
    strokeChartData.forEach((s) => allDates.add(s.date));
    const sortedDates = Array.from(allDates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    // Create data maps for quick lookup
    const diabetesMap = new Map(
      diabetesChartData.map((d) => [d.date, d.probability])
    );
    const heartAttackMap = new Map(
      heartAttackChartData.map((h) => [h.date, h.probability])
    );
    const strokeMap = new Map(
      strokeChartData.map((s) => [s.date, s.probability])
    );

    const diabetesData = sortedDates.map((date) =>
      diabetesMap.get(date) ?? null
    );
    const heartAttackData = sortedDates.map((date) =>
      heartAttackMap.get(date) ?? null
    );
    const strokeData = sortedDates.map((date) => strokeMap.get(date) ?? null);

    return {
      dates: sortedDates,
      diabetesData,
      heartAttackData,
      strokeData,
    };
  }, [diabetesChartData, heartAttackChartData, strokeChartData]);

  if (!isUserAuthenticated || !user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 96px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 96px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorAlert error={error} />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 'Welcome' Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Welcome back, {user.firstName}! 👋
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Your Health Dashboard
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
          <Chip
            icon={<Person />}
            label={`${user.firstName} ${user.lastName}`}
            color="primary"
            variant="outlined"
          />
          {userAge && (
            <Chip
              label={`Age: ${userAge}`}
              color="secondary"
              variant="outlined"
            />
          )}
          {demographics && (
            <>
              <Chip
                label={`Height: ${demographics.height} cm`}
                variant="outlined"
              />
              <Chip
                label={`Weight: ${demographics.weight} kg`}
                variant="outlined"
              />
            </>
          )}
        </Stack>
      </Box>

      {!hasData && (
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Get Started
          </Typography>
          <Typography>
            You haven't made any predictions yet. Start by completing a health
            questionnaire to see your personalized insights and trends here!
          </Typography>
        </Alert>
      )}

      {/* Statistics Cards */}
      {hasData && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 3,
            mb: 4,
          }}
        >
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Assessment color="primary" />
                <Typography variant="h6">Total Predictions</Typography>
              </Stack>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {stats.totalPredictions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All time assessments
              </Typography>
            </CardContent>
          </Card>

          {stats.latestDiabetes && (
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Bloodtype color="error" />
                  <Typography variant="h6">Latest Diabetes Prediction</Typography>
                </Stack>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {formatProbability(
                    normalizeProbabilityToPercentage(
                      stats.latestDiabetes.predictionProbability
                    )
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(stats.latestDiabetes.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          )}

          {stats.latestHeartAttack && (
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <MonitorHeart color="error" />
                  <Typography variant="h6">Latest HA Prediction</Typography>
                </Stack>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {formatProbability(
                    normalizeProbabilityToPercentage(
                      stats.latestHeartAttack.predictionProbability
                    )
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(stats.latestHeartAttack.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          )}

          {stats.latestStroke && (
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <Grain color={'error'} />
                    <Typography variant="h6">Latest Stroke Prediction</Typography>
                  </Stack>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {formatProbability(
                        normalizeProbabilityToPercentage(
                            stats.latestStroke.predictionProbability
                        )
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDateTime(stats.latestStroke.createdAt)}
                  </Typography>
                </CardContent>
              </Card>
          )}

          {stats.latestHabits && (
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Spa color="success" />
                  <Typography variant="h6">Latest Wellness Score</Typography>
                </Stack>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {formatWellnessScore(stats.latestHabits.wellnessScore)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDateTime(stats.latestHabits.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      {/* Charts Section */}
      {hasData && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(490px, 1fr))',
            gap: 9,
            mb: 4,
          }}
        >
          {/* Diabetes Trend */}
          {diabetesChartData.length > 0 && (
              <RiskTrendChart
                  title="Diabetes Risk Trend"
                  avgProb={stats.avgDiabetesProb}
                  data={diabetesChartData}
                  icon={<Bloodtype color="error" />}
                  color="error"
                  lineColor="#d32f2f"
              />
          )}

          {/* Heart Attack Trend */}
          {heartAttackChartData.length > 0 && (
              <RiskTrendChart
                  title="Heart Attack Risk Trend"
                  avgProb={stats.avgHeartAttackProb}
                  data={heartAttackChartData}
                  icon={<MonitorHeart color="error" />}
                  color="error"
                  lineColor="#d32f2f"
              />
          )}

          {/* Stroke Trend */}
          {strokeChartData.length > 0 && (
              <RiskTrendChart
                  title="Stroke Risk Trend"
                  avgProb={stats.avgStrokeProb}
                  data={strokeChartData}
                  icon={<Grain color="error" />}
                  color="error"
                  lineColor="#d32f2f"
              />
          )}

          {/* Wellness Score Trend */}
          {wellnessChartData.length > 0 && (
            <WellnessTrendChart
              data={wellnessChartData}
              avgScore={stats.avgWellnessScore}
            />
          )}
        </Box>
      )}

      {/* Combined Risk Overview */}
      {hasData &&
        (diabetesChartData.length > 0 ||
          heartAttackChartData.length > 0 ||
          strokeChartData.length > 0) && (
          <Box sx={{ mb: 4 }}>
            <CombinedRiskChart
              data={combinedChartData}
              hasDiabetesData={diabetesChartData.length > 0}
              hasHeartAttackData={heartAttackChartData.length > 0}
              hasStrokeData={strokeChartData.length > 0}
            />
          </Box>
        )}

      {/* What You Can Do Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          What You Can Do
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 3,
          }}
        >
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" gutterBottom>
                <Bloodtype sx={{ verticalAlign: 'middle', mr: 1 }} />
                Health Predictions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get AI-powered risk assessments for diabetes, heart attack, and
                stroke. Our machine learning models analyze your health data to
                provide personalized probability scores.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                <Spa sx={{ verticalAlign: 'middle', mr: 1 }} />
                Lifestyle Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your daily habits including sleep, exercise, hydration,
                and stress levels. Receive wellness scores and personalized
                recommendations.
              </Typography>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" gutterBottom>
                <Assessment sx={{ verticalAlign: 'middle', mr: 1 }} />
                Track Your Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor trends over time with interactive charts. See how your
                health metrics change and identify patterns in your risk
                assessments.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                Personalized Insights
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Receive AI-generated recommendations tailored to your specific
                health profile. Get actionable advice to improve your
                well-being.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
