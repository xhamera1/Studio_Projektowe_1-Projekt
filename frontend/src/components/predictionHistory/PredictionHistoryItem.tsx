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
  HeartAttackPredictionRecord,
  StrokePredictionRecord
} from '../../utils/types';
import type { PredictionType } from '../../pages/PredictionHistory';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatDateTime, formatProbability } from '../../utils/formatters.ts';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const getIconConfig = (type: PredictionType) => {
  switch (type) {
    case 'stroke':
      return {
        icon: <LocalHospitalIcon color={'error'} />,
        color: 'primary' as const,
        label: 'Stroke prediction'
      };
    case 'diabetes':
      return {
        icon: <WaterDropIcon color={'error'} />,
        color: 'secondary' as const,
        label: 'Diabetes prediction'
      };
    case 'heartAttack':
      return {
        icon: <FavoriteIcon color={'error'} />,
        color: 'error' as const,
        label: 'Heart attack prediction'
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

type Props = {
  type: PredictionType;
  record:
    | StrokePredictionRecord
    | DiabetesPredictionRecord
    | HeartAttackPredictionRecord;
  onClick: () => void;
};

const PredictionHistoryItem = ({ type, record, onClick }: Props) => {
  const { icon, color, label } = getIconConfig(type);
  const probability = record.predictionProbability;

  return (
    <ListItemButton onClick={onClick} divider>
      <ListItemIcon sx={{ minWidth: 40, color }}>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        secondary={formatDateTime(record.createdAt)}
      />
      <Stack direction="row" spacing={1}>
        <Chip
          icon={getRiskIcon(probability)}
          label={`Probability: ${formatProbability(probability)}`}
          size="medium"
          variant="outlined"
          color={getRiskColor(probability)}
        />
      </Stack>
    </ListItemButton>
  );
};

export default PredictionHistoryItem;
