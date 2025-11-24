# Testing Documentation

This document describes the testing setup and how to run tests for the Health Prediction Application.

## Overview

The application includes comprehensive test suites for both frontend and backend components:

- **Frontend Tests**: Unit tests for utility functions using Vitest
- **Backend Tests**: Unit tests for services and model factories using JUnit 5

## Issues Fixed

During the investigation, the following issues were identified and fixed:

### Frontend Issues Fixed:

1. **`formatWellnessScore`**: Added null/undefined/NaN handling
2. **`formatDateTime`**: Added error handling for invalid dates
3. **`formatProbability`**: Added edge case handling (negative values, values > 100, NaN)
4. **`normalizeProbabilityToPercentage`**: Added validation and clamping for edge cases

### Backend Issues Identified (Tests Added):

1. **Probability Conversion**: Tests verify decimal to percentage conversion works correctly
2. **Null Handling**: Tests verify null probability values are handled gracefully
3. **Wellness Score Calculation**: Tests verify edge cases (null values, extreme values, ideal values)
4. **Normalization Functions**: Tests verify proper handling of null values and edge cases

## Frontend Testing

### Setup

The frontend uses **Vitest** as the testing framework with **@testing-library/react** for component testing.

### Running Frontend Tests

```bash
cd frontend
npm install  # Install dependencies including test libraries
npm test     # Run tests in watch mode
npm run test:ui  # Run tests with UI
npm run test:coverage  # Run tests with coverage report
```

### Test Files

- `frontend/src/utils/__tests__/formatters.test.ts` - Tests for all formatter functions
- `frontend/src/utils/__tests__/profile.test.ts` - Tests for profile utility functions

### Test Coverage

The frontend tests cover:
- ✅ All formatter functions with edge cases
- ✅ Null/undefined/NaN handling
- ✅ Boundary value testing
- ✅ Invalid input handling
- ✅ Age calculation with various date formats

## Backend Testing

### Setup

The backend uses **JUnit 5** with **Mockito** for mocking dependencies.

### Running Backend Tests

```bash
cd backend
./mvnw test  # Run all tests
./mvnw test -Dtest=PredictionServiceTest  # Run specific test class
```

### Test Files

- `backend/src/test/java/com/healthapp/backend/service/PredictionServiceTest.java` - Tests for prediction service logic
- `backend/src/test/java/com/healthapp/backend/model/DiabetesPredictionTest.java` - Tests for diabetes prediction factory
- `backend/src/test/java/com/healthapp/backend/model/HeartAttackPredictionTest.java` - Tests for heart attack prediction factory
- `backend/src/test/java/com/healthapp/backend/model/StrokePredictionTest.java` - Tests for stroke prediction factory

### Test Coverage

The backend tests cover:
- ✅ Probability conversion from decimal (0.0-1.0) to percentage (0-100)
- ✅ Null probability handling
- ✅ Wellness score calculation with various inputs
- ✅ Edge cases (null values, extreme values, ideal values)
- ✅ Normalization functions
- ✅ Sleep scoring logic

## Test Scenarios Covered

### Probability Formatting
- Decimal format (0.93 → 93.00%)
- Percentage format (93 → 93.00%)
- Zero and maximum values
- Negative values (clamped to 0)
- Values > 100 (clamped to 100)
- Null/undefined/NaN handling

### Date Formatting
- Valid date strings
- Valid Date objects
- Invalid dates
- Null/undefined handling

### Wellness Score
- Valid scores (0-100)
- Values > 100 (clamped)
- Negative values (clamped)
- Null/undefined/NaN handling

### Age Calculation
- Valid dates
- Future dates (edge case)
- Very old dates
- Invalid date strings
- Null/undefined handling

### Backend Probability Conversion
- Decimal to percentage conversion
- Null probability handling
- Zero and maximum probability
- All prediction types (Diabetes, Heart Attack, Stroke)

## Continuous Integration

To integrate tests into CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Run Frontend Tests
  run: |
    cd frontend
    npm install
    npm test -- --run

- name: Run Backend Tests
  run: |
    cd backend
    ./mvnw test
```

## Best Practices

1. **Always test edge cases**: null, undefined, NaN, empty strings, boundary values
2. **Test both valid and invalid inputs**: Ensure graceful error handling
3. **Use descriptive test names**: Follow the pattern "should [expected behavior] when [condition]"
4. **Keep tests isolated**: Each test should be independent
5. **Test one thing at a time**: Each test should verify a single behavior

## Future Improvements

Potential areas for additional testing:
- Integration tests for API endpoints
- End-to-end tests for user workflows
- Performance tests for prediction calculations
- Security tests for authentication/authorization
- Component tests for React components

