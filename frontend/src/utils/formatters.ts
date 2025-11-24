/**
 * Formats a date/time value to a localized string.
 * Handles invalid dates gracefully.
 * @param value - Date or string to format
 * @returns Formatted date string or "Invalid Date" if date is invalid
 */
export const formatDateTime = (value: Date | string | null | undefined): string => {
  if (value == null) {
    return 'N/A';
  }
  
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleString();
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Formats a probability value as a percentage.
 * Handles both decimal format (0.0-1.0) and percentage format (0-100).
 * If value is less than or equal to 1, assumes it's in decimal format and multiplies by 100.
 * @param value - Probability value (either 0.0-1.0 or 0-100)
 * @returns Formatted string like "93.00%"
 */
export const formatProbability = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) {
    return 'N/A';
  }
  
  // Handle edge cases: negative values or values > 100 (if already percentage)
  // If value is less than or equal to 1, assume it's in decimal format (0.0-1.0) and convert to percentage
  // Otherwise, assume it's already in percentage format (0-100)
  let percentage: number;
  if (value < 0) {
    percentage = 0; // Clamp negative values to 0
  } else if (value <= 1.0) {
    percentage = value * 100;
  } else {
    percentage = Math.min(100, value); // Clamp to max 100
  }
  
  return `${percentage.toFixed(2)}%`;
};

/**
 * Formats a wellness score value.
 * @param value - Wellness score (0-100)
 * @returns Formatted string like "85/100" or "N/A" if invalid
 */
export const formatWellnessScore = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) {
    return 'N/A';
  }
  
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  return `${clampedValue.toFixed(0)}/100`;
};

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
