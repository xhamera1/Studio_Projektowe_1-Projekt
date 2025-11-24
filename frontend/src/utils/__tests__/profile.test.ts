import { describe, it, expect } from 'vitest';
import { calculateAgeFromDateOfBirth } from '../profile';

describe('calculateAgeFromDateOfBirth', () => {
  it('should calculate age correctly for a valid date', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    const age = calculateAgeFromDateOfBirth(birthDate);
    expect(age).toBe(25);
  });

  it('should calculate age correctly accounting for month and day', () => {
    const today = new Date();
    // Birthday hasn't occurred this year yet
    const birthDate = new Date(today.getFullYear() - 25, today.getMonth() + 1, today.getDate());
    const age = calculateAgeFromDateOfBirth(birthDate);
    expect(age).toBe(24);
  });

  it('should return null for null input', () => {
    expect(calculateAgeFromDateOfBirth(null)).toBeNull();
  });

  it('should return null for undefined input', () => {
    expect(calculateAgeFromDateOfBirth(undefined)).toBeNull();
  });

  it('should return null for invalid date string', () => {
    expect(calculateAgeFromDateOfBirth('invalid-date')).toBeNull();
    expect(calculateAgeFromDateOfBirth('not-a-date')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(calculateAgeFromDateOfBirth('')).toBeNull();
  });

  it('should handle future dates (edge case)', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const age = calculateAgeFromDateOfBirth(futureDate);
    // Should return negative age or handle gracefully
    expect(age).toBeLessThanOrEqual(0);
  });

  it('should handle very old dates', () => {
    const oldDate = new Date('1900-01-01');
    const age = calculateAgeFromDateOfBirth(oldDate);
    expect(age).toBeGreaterThan(100);
    expect(typeof age).toBe('number');
  });

  it('should handle date string in ISO format', () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 30;
    const isoDate = `${birthYear}-01-15T00:00:00Z`;
    const age = calculateAgeFromDateOfBirth(isoDate);
    expect(age).toBeGreaterThanOrEqual(29);
    expect(age).toBeLessThanOrEqual(31);
  });

  it('should handle same day birthday correctly', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
    const age = calculateAgeFromDateOfBirth(birthDate);
    expect(age).toBe(20);
  });
});

