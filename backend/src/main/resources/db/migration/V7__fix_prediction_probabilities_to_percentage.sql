-- Migration to convert prediction probabilities from decimal (0.0-1.0) to percentage (0-100)
-- This fixes probabilities that were stored as decimals (e.g., 0.93 instead of 93.0)

-- Fix diabetes_data table
-- Only update values that are less than 1.0 (indicating they're in decimal format)
UPDATE diabetes_data
SET prediction_probability = prediction_probability * 100
WHERE prediction_probability IS NOT NULL 
  AND prediction_probability < 1.0;

-- Fix heart_attack_data table
UPDATE heart_attack_data
SET prediction_probability = prediction_probability * 100
WHERE prediction_probability IS NOT NULL 
  AND prediction_probability < 1.0;

-- Fix stroke_data table
UPDATE stroke_data
SET prediction_probability = prediction_probability * 100
WHERE prediction_probability IS NOT NULL 
  AND prediction_probability < 1.0;

