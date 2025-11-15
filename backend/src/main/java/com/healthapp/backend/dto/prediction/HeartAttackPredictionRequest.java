package com.healthapp.backend.dto.prediction;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record HeartAttackPredictionRequest(
        @NotNull @Min(0) @Max(200) Integer age,
        @NotNull @Min(0) @Max(1) Integer sex,
        @NotNull @Min(1) @Max(4) Integer cp,
        @NotNull @Min(0) Integer trestbps,
        @NotNull @Min(0) Integer chol,
        @NotNull @Min(0) Integer thalach,
        @NotNull @DecimalMin("0.0") Float oldpeak,
        @NotNull @Min(0) @Max(1) Integer exang
) {
}
