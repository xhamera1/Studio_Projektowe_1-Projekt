package com.healthapp.backend.dto.userDemographicData;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record UserDemographicDataRequest(
        @NotNull @Min(0) @Max(1) Integer sex,
        @NotNull @PastOrPresent LocalDate dateOfBirth,
        @NotNull @DecimalMin("0.0") Float weight,
        @NotNull @DecimalMin("0.0") Float height
) {
}
