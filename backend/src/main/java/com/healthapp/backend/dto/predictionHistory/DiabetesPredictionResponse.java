package com.healthapp.backend.dto.predictionHistory;

import com.healthapp.backend.model.DiabetesPrediction;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DiabetesPredictionResponse {
    private Long id;
    private Float hba1cLevel;
    private Integer bloodGlucoseLevel;
    private Float bmi;
    private Integer age;
    private Integer smokingHistory;
    private Float predictionProbability;
    private String recommendations;
    private LocalDateTime createdAt;

    public static DiabetesPredictionResponse createDiabetesPredictionResponseFrom(DiabetesPrediction data) {
        return DiabetesPredictionResponse.builder()
                .id(data.getId())
                .hba1cLevel(data.getHba1cLevel())
                .bloodGlucoseLevel(data.getBloodGlucoseLevel())
                .bmi(data.getBmi())
                .age(data.getAge())
                .smokingHistory(data.getSmokingHistory())
                .predictionProbability(data.getPredictionProbability())
                .recommendations(data.getRecommendations())
                .createdAt(data.getCreatedAt())
                .build();
    }
}
