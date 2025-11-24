// src/components/prediction-history/PredictionHistoryPage.tsx
import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  List,
  Paper,
  Typography
} from '@mui/material';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import type {
  DiabetesPredictionRecord,
  HeartAttackPredictionRecord,
  StrokePredictionRecord
} from '../utils/types.ts';
import { usePredictionHistory } from '../hooks/usePredictionHistory.ts';
import ErrorAlert from '../components/common/ErrorAlert.tsx';
import PredictionHistoryItem from '../components/predictionHistory/PredictionHistoryItem.tsx';
import PredictionDetailsDialog from '../components/predictionHistory/PredictionDetailsDialog.tsx';

export type PredictionType = 'stroke' | 'diabetes' | 'heartAttack';

export type SelectedPrediction =
  | { type: 'stroke'; record: StrokePredictionRecord }
  | { type: 'diabetes'; record: DiabetesPredictionRecord }
  | { type: 'heartAttack'; record: HeartAttackPredictionRecord }
  | null;

export type UnifiedPredictionItem =
  | { type: 'stroke'; record: StrokePredictionRecord }
  | { type: 'diabetes'; record: DiabetesPredictionRecord }
  | { type: 'heartAttack'; record: HeartAttackPredictionRecord };

const PredictionHistoryPage = () => {
  const { user } = useApplicationContext();
  const { isUserAuthenticated } = useApplicationContext();

  const [selectedPrediction, setSelectedPrediction] =
    useState<SelectedPrediction>(null);

  const {
    data: predictions,
    isLoading,
    isError,
    error
  } = usePredictionHistory();

  const unifiedItems: UnifiedPredictionItem[] = useMemo(() => {
    if (predictions == null) return [];

    const strokeItems: UnifiedPredictionItem[] =
      predictions.strokePredictions.map(record => ({
        type: 'stroke',
        record
      }));

    const diabetesItems: UnifiedPredictionItem[] =
      predictions.diabetesPredictions.map(record => ({
        type: 'diabetes',
        record
      }));

    const heartAttackItems: UnifiedPredictionItem[] =
      predictions.heartAttackPredictions.map(record => ({
        type: 'heartAttack',
        record
      }));

    return [...strokeItems, ...diabetesItems, ...heartAttackItems].sort(
      (a, b) =>
        new Date(b.record.createdAt).getTime() -
        new Date(a.record.createdAt).getTime()
    );
  }, [predictions]);

  if (!isUserAuthenticated || !user) {
    return;
  }

  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <ErrorAlert error={error} />
      </Box>
    );
  }

  if (!unifiedItems.length) {
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Prediction history
        </Typography>
        <Alert severity="info">No prediction history found.</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Prediction history
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        All your predictions in one unified, time-ordered list.
      </Typography>

      <Paper>
        <List disablePadding>
          {unifiedItems.map(item => (
            <PredictionHistoryItem
              key={`${item.type}-${item.record.id}`}
              type={item.type}
              record={item.record}
              onClick={() =>
                setSelectedPrediction({
                  type: item.type,
                  record: item.record as any
                })
              }
            />
          ))}
        </List>
      </Paper>

      <PredictionDetailsDialog
        open={!!selectedPrediction}
        prediction={selectedPrediction}
        onClose={() => setSelectedPrediction(null)}
      />
    </Box>
  );
};

export default PredictionHistoryPage;
