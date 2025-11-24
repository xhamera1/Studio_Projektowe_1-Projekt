package com.healthapp.backend.dto.prediction;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record HabitsPredictionRequest(
        @NotNull @Min(0) @Max(20) Integer waterIntakeGlasses,
        @NotNull @Min(0) @Max(24) Float sleepHours,
        @NotNull @Min(0) Integer stepsPerDay,
        @NotNull @Min(0) @Max(600) Integer exerciseMinutes,
        @NotNull @Min(0) @Max(24) Float screenTimeHours,
        @NotNull @Min(1) @Max(5) Integer stressLevel,
        @NotNull @Min(0) @Max(15) Integer fruitsVeggiesServings
) {
}
