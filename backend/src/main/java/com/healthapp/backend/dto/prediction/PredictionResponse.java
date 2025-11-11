package com.healthapp.backend.dto.prediction;

public record PredictionResponse(
        float probability,
        String recommendations
) {
}
