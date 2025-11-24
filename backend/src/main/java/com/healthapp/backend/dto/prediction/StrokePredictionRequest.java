package com.healthapp.backend.dto.prediction;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record StrokePredictionRequest(
        @NotNull @Min(0) @Max(200) Integer age,
        @NotNull @Min(0) @Max(1) Integer sex,
        @NotNull @Min(0) @Max(1) Integer hypertension,
        @NotNull @Min(0) @Max(1) Integer heartDisease,
        @NotNull @Min(0) @Max(4) Integer workType,
        @NotNull @Min(0) Integer avgGlucoseLevel,
        @NotNull @DecimalMin("0.0") @DecimalMax("100.0") Float bmi
) {
}
