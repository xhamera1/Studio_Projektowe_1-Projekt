package com.healthapp.backend.dto.prediction;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record DiabetesPredictionRequest(
        @NotNull @DecimalMin("0.0") Float hba1cLevel,
        @NotNull @Min(0) Integer bloodGlucoseLevel,
        @NotNull @Min(0) @Max(100) Float bmi,
        @NotNull @Min(0) @Max(200) Integer age,
        @NotNull @Min(0) @Max(5) Integer smokingHistory
) {
}
