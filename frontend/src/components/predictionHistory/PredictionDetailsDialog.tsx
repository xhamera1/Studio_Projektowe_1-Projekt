// src/components/prediction-history/PredictionDetailsDialog.tsx
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import StrokePredictionDetails from './StrokePredictionDetails';
import DiabetesPredictionDetails from './DiabetesPredictionDetails';
import HeartAttackPredictionDetails from './HeartAttackPredictionDetails';
import HabitsPredictionDetails from './HabitsPredictionDetails';
import {
  formatDateTime,
  formatProbability,
  formatWellnessScore
} from '../../utils/formatters.ts';
import type {
  PredictionType,
  SelectedPrediction
} from '../../utils/types.ts';

const predictionTypeLabel: Record<PredictionType, string> = {
  stroke: 'Stroke prediction',
  diabetes: 'Diabetes prediction',
  heartAttack: 'Heart attack prediction',
  habits: 'Lifestyle habits check'
};

type Props = {
  open: boolean;
  prediction: SelectedPrediction;
  onClose: () => void;
};

const PredictionDetailsDialog = ({ open, prediction, onClose }: Props) => {
  if (!prediction) {
    return null;
  }

  const { type, record } = prediction;
  const hasProbability =
    'predictionProbability' in record &&
    typeof record.predictionProbability === 'number';
  const hasWellnessScore =
    'wellnessScore' in record && typeof record.wellnessScore === 'number';

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Prediction details</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle1">
            Type: {predictionTypeLabel[type]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created at: {formatDateTime(record.createdAt)}
          </Typography>
          {hasProbability && (
            <Typography variant="body2" color="text.secondary">
              Probability: {formatProbability(record.predictionProbability)}
            </Typography>
          )}
          {hasWellnessScore && (
            <Typography variant="body2" color="text.secondary">
              Wellness score: {formatWellnessScore(record.wellnessScore)}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Input data
          </Typography>
          <PredictionInputData prediction={prediction} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <ReactMarkdown>{record.recommendations}</ReactMarkdown>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type InputDataProps = {
  prediction: SelectedPrediction;
};

const PredictionInputData = ({ prediction }: InputDataProps) => {
  if (!prediction) return null;

  const { type, record } = prediction;

  switch (type) {
    case 'stroke':
      return <StrokePredictionDetails record={record} />;
    case 'diabetes':
      return <DiabetesPredictionDetails record={record} />;
    case 'heartAttack':
      return <HeartAttackPredictionDetails record={record} />;
    case 'habits':
      return <HabitsPredictionDetails record={record} />;
  }
};

export default PredictionDetailsDialog;
