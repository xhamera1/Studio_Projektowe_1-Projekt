package com.healthapp.backend.dto.predictionHistory;

import com.healthapp.backend.model.StrokeData;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StrokePredictionHistoryDto {
    private Long id;
    private Integer age;
    private Integer sex;
    private Integer hypertension;
    private Integer heartDisease;
    private Integer workType;
    private Integer avgGlucoseLevel;
    private Float bmi;
    private Float predictionProbability;
    private String recommendations;
    private LocalDateTime createdAt;

    public static StrokePredictionHistoryDto createFrom(StrokeData data) {
        return StrokePredictionHistoryDto.builder()
                .id(data.getId())
                .age(data.getAge())
                .sex(data.getSex())
                .hypertension(data.getHypertension())
                .heartDisease(data.getHeartDisease())
                .workType(data.getWorkType())
                .avgGlucoseLevel(data.getAvgGlucoseLevel())
                .bmi(data.getBmi())
                .predictionProbability(data.getPredictionProbability())
                .recommendations(data.getRecommendations())
                .createdAt(data.getCreatedAt())
                .build();
    }
}
