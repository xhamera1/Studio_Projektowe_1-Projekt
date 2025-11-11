package com.healthapp.backend.dto.prediction;

public record StrokePredictionRequest(
        int age,
        int sex,
        int hypertension,
        int heartDisease,
        int workType,
        int avgGlucoseLevel,
        float bmi
) {
}
