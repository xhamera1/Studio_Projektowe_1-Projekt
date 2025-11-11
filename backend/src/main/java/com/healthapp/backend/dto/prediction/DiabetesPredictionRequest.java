package com.healthapp.backend.dto.prediction;

public record DiabetesPredictionRequest(
        float hba1cLevel,
        int bloodGlucoseLevel,
        float bmi,
        int age,
        int smokingHistory
) {
}
