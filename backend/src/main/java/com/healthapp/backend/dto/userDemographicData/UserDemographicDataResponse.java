package com.healthapp.backend.dto.userDemographicData;

import com.healthapp.backend.model.UserDemographicData;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record UserDemographicDataResponse(
        int sex,
        LocalDate dateOfBirth,
        float weight,
        float height,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static UserDemographicDataResponse createUserDemographicDataResponseFrom(UserDemographicData demographicData) {
        return UserDemographicDataResponse.builder()
                .sex(demographicData.getSex())
                .dateOfBirth(demographicData.getDateOfBirth())
                .weight(demographicData.getWeight())
                .height(demographicData.getHeight())
                .createdAt(demographicData.getCreatedAt())
                .updatedAt(demographicData.getUpdatedAt())
                .build();
    }
}
