import { Grid, Typography } from '@mui/material';
import type { HabitsAssessmentRecord } from '../../utils/types.ts';
import { formatWellnessScore } from '../../utils/formatters.ts';

type Props = {
  record: HabitsAssessmentRecord;
};

const DetailRow = ({
  label,
  value
}: {
  label: string;
  value: string | number;
}) => (
  <>
    <Grid item xs={6}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body2">{value}</Typography>
    </Grid>
  </>
);

const HabitsPredictionDetails = ({ record }: Props) => {
  return (
    <Grid container spacing={1}>
      <DetailRow
        label="Daily water intake"
        value={`${record.waterIntakeGlasses} glasses`}
      />
      <DetailRow
        label="Average sleep"
        value={`${record.sleepHours.toFixed(1)} h`}
      />
      <DetailRow
        label="Steps per day"
        value={record.stepsPerDay.toLocaleString()}
      />
      <DetailRow
        label="Exercise minutes"
        value={`${record.exerciseMinutes} min`}
      />
      <DetailRow
        label="Screen time"
        value={`${record.screenTimeHours.toFixed(1)} h`}
      />
      <DetailRow label="Stress level (1-5)" value={record.stressLevel} />
      <DetailRow
        label="Fruit & veggie servings"
        value={`${record.fruitsVeggiesServings} / day`}
      />
      <DetailRow
        label="Wellness score"
        value={formatWellnessScore(record.wellnessScore)}
      />
    </Grid>
  );
};

export default HabitsPredictionDetails;

