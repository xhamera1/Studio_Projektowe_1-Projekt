import { Grid } from '@mui/material';
import type { HeartAttackPredictionRecord } from '../../utils/types';
import {
  formatBooleanFlag,
  formatChestPainType,
  formatSex
} from '../../utils/formatters.ts';
import PredictionDetailField from './PredictionDetailsField.tsx';

type Props = {
  record: HeartAttackPredictionRecord;
};

const HeartAttackPredictionDetails = ({ record }: Props) => (
  <Grid container spacing={2}>
    <PredictionDetailField label="Age" value={`${record.age} years`} />
    <PredictionDetailField label="Sex" value={formatSex(record.sex)} />
    <PredictionDetailField
      label="Chest pain type"
      value={formatChestPainType(record.cp)}
    />
    <PredictionDetailField
      label="Resting blood pressure"
      value={`${record.trestbps} mmHg`}
    />
    <PredictionDetailField label="Cholesterol" value={`${record.chol} mg/dL`} />
    <PredictionDetailField
      label="Max heart rate achieved"
      value={`${record.thalach} bpm`}
    />
    <PredictionDetailField
      label="ST depression (oldpeak)"
      value={record.oldpeak.toFixed(1)}
    />
    <PredictionDetailField
      label="Exercise‑induced angina"
      value={formatBooleanFlag(record.exang)}
    />
  </Grid>
);

export default HeartAttackPredictionDetails;
