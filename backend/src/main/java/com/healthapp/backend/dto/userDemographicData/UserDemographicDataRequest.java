package com.healthapp.backend.dto.userDemographicData;

import java.time.LocalDate;

public record UserDemographicDataRequest(
        int sex,
        LocalDate dateOfBirth,
        float weight,
        float height
) {
}
