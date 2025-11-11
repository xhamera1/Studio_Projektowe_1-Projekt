package com.healthapp.backend.dto.prediction;

public record HealthPredictionServiceResponse(
        Integer prediction,
        Float probability
) {

    public boolean hasDisease() {
        return this.prediction != null && this.prediction == 1;
    }
}
