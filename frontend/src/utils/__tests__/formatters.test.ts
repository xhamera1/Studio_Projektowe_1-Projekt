import { describe, it, expect } from 'vitest';
import {
  formatDateTime,
  formatProbability,
  formatWellnessScore,
  formatSex,
  formatBooleanFlag,
  formatChestPainType,
  formatWorkType,
  formatSmokingHistory
} from '../formatters';

describe('formatDateTime', () => {
  it('should format valid date string', () => {
    const result = formatDateTime('2024-01-15T10:30:00Z');
    expect(result).toBeTruthy();
    expect(result).not.toBe('N/A');
    expect(result).not.toBe('Invalid Date');
  });

  it('should format valid Date object', () => {
    const date = new Date('2024-01-15T10:30:00Z');
    const result = formatDateTime(date);
    expect(result).toBeTruthy();
    expect(result).not.toBe('N/A');
    expect(result).not.toBe('Invalid Date');
  });

  it('should return "N/A" for null', () => {
    expect(formatDateTime(null)).toBe('N/A');
  });

  it('should return "N/A" for undefined', () => {
    expect(formatDateTime(undefined)).toBe('N/A');
  });

  it('should return "Invalid Date" for invalid date string', () => {
    expect(formatDateTime('invalid-date')).toBe('Invalid Date');
  });

  it('should handle empty string', () => {
    const result = formatDateTime('');
    expect(result).toBe('Invalid Date');
  });
});

describe('formatProbability', () => {
  it('should format decimal probability (0.93 -> 93.00%)', () => {
    expect(formatProbability(0.93)).toBe('93.00%');
  });

  it('should format percentage probability (93 -> 93.00%)', () => {
    expect(formatProbability(93)).toBe('93.00%');
  });

  it('should format zero probability', () => {
    expect(formatProbability(0)).toBe('0.00%');
    expect(formatProbability(0.0)).toBe('0.00%');
  });

  it('should format 100% probability', () => {
    expect(formatProbability(100)).toBe('100.00%');
    expect(formatProbability(1.0)).toBe('100.00%');
  });

  it('should handle edge case: exactly 1.0 (should be treated as 100%)', () => {
    expect(formatProbability(1.0)).toBe('100.00%');
  });

  it('should clamp negative values to 0%', () => {
    expect(formatProbability(-5)).toBe('0.00%');
    expect(formatProbability(-0.5)).toBe('0.00%');
  });

  it('should clamp values > 100 to 100%', () => {
    expect(formatProbability(150)).toBe('100.00%');
    expect(formatProbability(200)).toBe('100.00%');
  });

  it('should return "N/A" for null', () => {
    expect(formatProbability(null)).toBe('N/A');
  });

  it('should return "N/A" for undefined', () => {
    expect(formatProbability(undefined)).toBe('N/A');
  });

  it('should return "N/A" for NaN', () => {
    expect(formatProbability(NaN)).toBe('N/A');
  });

  it('should handle small decimal values', () => {
    expect(formatProbability(0.01)).toBe('1.00%');
    expect(formatProbability(0.001)).toBe('0.10%');
  });

  it('should handle boundary values', () => {
    expect(formatProbability(0.99)).toBe('99.00%');
    expect(formatProbability(99.99)).toBe('99.99%');
  });
});

describe('formatWellnessScore', () => {
  it('should format valid wellness score', () => {
    expect(formatWellnessScore(85)).toBe('85/100');
    expect(formatWellnessScore(0)).toBe('0/100');
    expect(formatWellnessScore(100)).toBe('100/100');
  });

  it('should clamp values > 100 to 100', () => {
    expect(formatWellnessScore(150)).toBe('100/100');
    expect(formatWellnessScore(200)).toBe('100/100');
  });

  it('should clamp negative values to 0', () => {
    expect(formatWellnessScore(-5)).toBe('0/100');
    expect(formatWellnessScore(-10)).toBe('0/100');
  });

  it('should handle decimal values', () => {
    expect(formatWellnessScore(85.7)).toBe('86/100');
    expect(formatWellnessScore(85.3)).toBe('85/100');
  });

  it('should return "N/A" for null', () => {
    expect(formatWellnessScore(null)).toBe('N/A');
  });

  it('should return "N/A" for undefined', () => {
    expect(formatWellnessScore(undefined)).toBe('N/A');
  });

  it('should return "N/A" for NaN', () => {
    expect(formatWellnessScore(NaN)).toBe('N/A');
  });
});

describe('formatSex', () => {
  it('should format 0 as Female', () => {
    expect(formatSex(0)).toBe('Female');
  });

  it('should format 1 as Male', () => {
    expect(formatSex(1)).toBe('Male');
  });

  it('should return "Unknown" for null', () => {
    expect(formatSex(null)).toBe('Unknown');
  });

  it('should return "Unknown" for undefined', () => {
    expect(formatSex(undefined)).toBe('Unknown');
  });

  it('should return "Unknown" for invalid values', () => {
    expect(formatSex(2)).toBe('Unknown');
    expect(formatSex(-1)).toBe('Unknown');
  });
});

describe('formatBooleanFlag', () => {
  it('should format 0 as No', () => {
    expect(formatBooleanFlag(0)).toBe('No');
  });

  it('should format 1 as Yes', () => {
    expect(formatBooleanFlag(1)).toBe('Yes');
  });

  it('should return "Unknown" for null', () => {
    expect(formatBooleanFlag(null)).toBe('Unknown');
  });

  it('should return "Unknown" for undefined', () => {
    expect(formatBooleanFlag(undefined)).toBe('Unknown');
  });

  it('should return "Unknown" for invalid values', () => {
    expect(formatBooleanFlag(2)).toBe('Unknown');
    expect(formatBooleanFlag(-1)).toBe('Unknown');
  });
});

describe('formatChestPainType', () => {
  it('should format valid chest pain types', () => {
    expect(formatChestPainType(1)).toBe('Typical angina');
    expect(formatChestPainType(2)).toBe('Atypical angina');
    expect(formatChestPainType(3)).toBe('Non‑anginal pain');
    expect(formatChestPainType(4)).toBe('Asymptomatic');
  });

  it('should return "Unknown" for null', () => {
    expect(formatChestPainType(null)).toBe('Unknown');
  });

  it('should return "Unknown" for undefined', () => {
    expect(formatChestPainType(undefined)).toBe('Unknown');
  });

  it('should return "Unknown" for invalid values', () => {
    expect(formatChestPainType(0)).toBe('Unknown');
    expect(formatChestPainType(5)).toBe('Unknown');
    expect(formatChestPainType(-1)).toBe('Unknown');
  });
});

describe('formatWorkType', () => {
  it('should format valid work types', () => {
    expect(formatWorkType(0)).toBe('Private');
    expect(formatWorkType(1)).toBe('Self‑employed');
    expect(formatWorkType(2)).toBe('Government job');
    expect(formatWorkType(3)).toBe('Children');
    expect(formatWorkType(4)).toBe('Never worked');
  });

  it('should return "Unknown" for null', () => {
    expect(formatWorkType(null)).toBe('Unknown');
  });

  it('should return "Unknown" for undefined', () => {
    expect(formatWorkType(undefined)).toBe('Unknown');
  });

  it('should return "Unknown" for invalid values', () => {
    expect(formatWorkType(5)).toBe('Unknown');
    expect(formatWorkType(-1)).toBe('Unknown');
  });
});

describe('formatSmokingHistory', () => {
  it('should format valid smoking history codes', () => {
    expect(formatSmokingHistory(0)).toBe('No information');
    expect(formatSmokingHistory(1)).toBe('Current smoker');
    expect(formatSmokingHistory(2)).toBe('Ever smoked');
    expect(formatSmokingHistory(3)).toBe('Former smoker');
    expect(formatSmokingHistory(4)).toBe('Never smoked');
    expect(formatSmokingHistory(5)).toBe('Not currently smoking');
  });

  it('should return "Unknown" for null', () => {
    expect(formatSmokingHistory(null)).toBe('Unknown');
  });

  it('should return "Unknown" for undefined', () => {
    expect(formatSmokingHistory(undefined)).toBe('Unknown');
  });

  it('should return "Unknown" for invalid values', () => {
    expect(formatSmokingHistory(6)).toBe('Unknown');
    expect(formatSmokingHistory(-1)).toBe('Unknown');
  });
});

