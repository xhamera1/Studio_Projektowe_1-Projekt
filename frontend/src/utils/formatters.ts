export const formatDateTime = (value: Date | string) =>
  new Date(value).toLocaleString();

export const formatProbability = (value: number) => `${value.toFixed(2)}%`;

export const formatSex = (value: number | null | undefined) => {
  if (value === 0) return 'Female';
  if (value === 1) return 'Male';
  return 'Unknown';
};

export const formatBooleanFlag = (value: number | null | undefined) => {
  if (value === 0) return 'No';
  if (value === 1) return 'Yes';
  return 'Unknown';
};

export const formatChestPainType = (cp: number | null | undefined) => {
  switch (cp) {
    case 1:
      return 'Typical angina';
    case 2:
      return 'Atypical angina';
    case 3:
      return 'Non‑anginal pain';
    case 4:
      return 'Asymptomatic';
    default:
      return 'Unknown';
  }
};

export const formatWorkType = (workType: number | null | undefined) => {
  switch (workType) {
    case 0:
      return 'Private';
    case 1:
      return 'Self‑employed';
    case 2:
      return 'Government job';
    case 3:
      return 'Children';
    case 4:
      return 'Never worked';
    default:
      return 'Unknown';
  }
};

export const formatSmokingHistory = (code: number | null | undefined) => {
  switch (code) {
    case 0:
      return 'No information';
    case 1:
      return 'Current smoker';
    case 2:
      return 'Ever smoked';
    case 3:
      return 'Former smoker';
    case 4:
      return 'Never smoked';
    case 5:
      return 'Not currently smoking';
    default:
      return 'Unknown';
  }
};
