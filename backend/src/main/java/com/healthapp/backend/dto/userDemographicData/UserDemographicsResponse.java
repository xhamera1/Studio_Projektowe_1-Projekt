package com.healthapp.backend.dto.userDemographicData;

import com.healthapp.backend.model.UserDemographics;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record UserDemographicsResponse(
        Integer sex,
        LocalDate dateOfBirth,
        Float weight,
        Float height,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static UserDemographicsResponse createUserDemographicsResponseFrom(UserDemographics demographicData) {
        return UserDemographicsResponse.builder()
                .sex(demographicData.getSex())
                .dateOfBirth(demographicData.getDateOfBirth())
                .weight(demographicData.getWeight())
                .height(demographicData.getHeight())
                .createdAt(demographicData.getCreatedAt())
                .updatedAt(demographicData.getUpdatedAt())
                .build();
    }
}
