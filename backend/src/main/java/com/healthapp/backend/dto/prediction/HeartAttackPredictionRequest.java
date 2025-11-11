package com.healthapp.backend.dto.prediction;

public record HeartAttackPredictionRequest(
        int age,
        int sex,
        int cp,
        int trestbps,
        int chol,
        int thalach,
        float oldpeak,
        int exang
) {
}
