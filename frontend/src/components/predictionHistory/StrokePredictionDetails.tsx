import { Grid } from '@mui/material';
import type { StrokePredictionRecord } from '../../utils/types';
import {
  formatBooleanFlag,
  formatSex,
  formatWorkType
} from '../../utils/formatters.ts';
import PredictionDetailField from './PredictionDetailsField.tsx';

type Props = {
  record: StrokePredictionRecord;
};

const StrokePredictionDetails = ({ record }: Props) => (
  <Grid container spacing={2}>
    <PredictionDetailField label="Age" value={`${record.age} years`} />
    <PredictionDetailField label="Sex" value={formatSex(record.sex)} />
    <PredictionDetailField
      label="Hypertension"
      value={formatBooleanFlag(record.hypertension)}
    />
    <PredictionDetailField
      label="Heart disease"
      value={formatBooleanFlag(record.heartDisease)}
    />
    <PredictionDetailField
      label="Work type"
      value={formatWorkType(record.workType)}
    />
    <PredictionDetailField
      label="Average glucose level"
      value={`${record.avgGlucoseLevel} mg/dL`}
    />
    <PredictionDetailField
      label="BMI"
      value={`${record.bmi.toFixed(1)} kg/m²`}
    />
  </Grid>
);

export default StrokePredictionDetails;
