import { Grid } from '@mui/material';
import type { DiabetesPredictionRecord } from '../../utils/types';
import { formatSmokingHistory } from '../../utils/formatters.ts';
import PredictionDetailField from './PredictionDetailsField.tsx';

type Props = {
  record: DiabetesPredictionRecord;
};

const DiabetesPredictionDetails = ({ record }: Props) => (
  <Grid container spacing={2}>
    <PredictionDetailField
      label="HbA1c level"
      value={record.hba1cLevel.toFixed(1)}
    />
    <PredictionDetailField
      label="Blood glucose level"
      value={`${record.bloodGlucoseLevel} mg/dL`}
    />
    <PredictionDetailField
      label="BMI"
      value={`${record.bmi.toFixed(1)} kg/m²`}
    />
    <PredictionDetailField
      label="Age"
      value={`${record.age.toFixed(0)} years`}
    />
    <PredictionDetailField
      label="Smoking history"
      value={formatSmokingHistory(record.smokingHistory)}
      size={12}
    />
  </Grid>
);

export default DiabetesPredictionDetails;
