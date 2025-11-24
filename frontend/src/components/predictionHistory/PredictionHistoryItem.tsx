// src/components/prediction-history/PredictionHistoryItem.tsx
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material';
import type {
  DiabetesPredictionRecord,
  HabitsAssessmentRecord,
  HeartAttackPredictionRecord,
  PredictionType,
  StrokePredictionRecord
} from '../../utils/types';
import {
  formatDateTime,
  formatProbability,
  formatWellnessScore
} from '../../utils/formatters.ts';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Bloodtype, Grain, MonitorHeart, Spa } from '@mui/icons-material';

const getIconConfig = (type: PredictionType) => {
  switch (type) {
    case 'stroke':
      return {
        icon: <Grain color={'error'} />,
        color: 'primary' as const,
        label: 'Stroke prediction'
      };
    case 'diabetes':
      return {
        icon: <Bloodtype color={'error'} />,
        color: 'secondary' as const,
        label: 'Diabetes prediction'
      };
    case 'heartAttack':
      return {
        icon: <MonitorHeart color={'error'} />,
        color: 'error' as const,
        label: 'Heart attack prediction'
      };
    case 'habits':
      return {
        icon: <Spa color={'success'} />,
        color: 'success' as const,
        label: 'Lifestyle habits check'
      };
  }
};

const getRiskColor = (probability: number) => {
  if (probability < 0.33) return 'success';
  if (probability < 0.66) return 'warning';
  return 'error';
};

const getRiskIcon = (probability: number) => {
  if (probability < 0.33) {
    return <CheckCircleOutlineIcon color="success" fontSize="small" />;
  }
  if (probability < 0.66) {
    return <ReportProblemOutlinedIcon color="warning" fontSize="small" />;
  }
  return <ErrorOutlineIcon color="error" fontSize="small" />;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'error';
};

const getScoreIcon = (score: number) => {
  if (score >= 80) {
    return <Spa color="success" fontSize="small" />;
  }
  if (score >= 60) {
    return <Spa color="warning" fontSize="small" />;
  }
  return <Spa color="error" fontSize="small" />;
};

type Props = {
  type: PredictionType;
  record:
    | StrokePredictionRecord
    | DiabetesPredictionRecord
    | HeartAttackPredictionRecord
    | HabitsAssessmentRecord;
  onClick: () => void;
};

const PredictionHistoryItem = ({ type, record, onClick }: Props) => {
  const { icon, color, label } = getIconConfig(type);
  const hasProbability =
    'predictionProbability' in record &&
    typeof record.predictionProbability === 'number';
  const isHabits = 'wellnessScore' in record;

  const probability = hasProbability ? record.predictionProbability ?? 0 : null;
  const chipLabel = isHabits
    ? `Wellness score: ${formatWellnessScore(record.wellnessScore)}`
    : probability != null
      ? `Probability: ${formatProbability(probability)}`
      : 'Prediction';
  const chipIcon = isHabits
    ? getScoreIcon(record.wellnessScore)
    : probability != null
      ? getRiskIcon(probability)
      : undefined;
  const chipColor = isHabits
    ? getScoreColor(record.wellnessScore)
    : getRiskColor(probability ?? 0);

  return (
    <ListItemButton onClick={onClick} divider>
      <ListItemIcon sx={{ minWidth: 40, color }}>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        secondary={formatDateTime(record.createdAt)}
      />
      <Stack direction="row" spacing={1}>
        <Chip
          icon={chipIcon}
          label={chipLabel}
          size="medium"
          variant="outlined"
          color={chipColor}
        />
      </Stack>
    </ListItemButton>
  );
};

export default PredictionHistoryItem;
