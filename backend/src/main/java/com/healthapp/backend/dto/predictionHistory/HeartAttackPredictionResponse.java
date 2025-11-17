package com.healthapp.backend.dto.predictionHistory;

import com.healthapp.backend.model.HeartAttackPrediction;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class HeartAttackPredictionResponse {
    private Long id;
    private Integer age;
    private Integer sex;
    private Integer cp;
    private Integer trestbps;
    private Integer chol;
    private Integer thalach;
    private Float oldpeak;
    private Integer exang;
    private Float predictionProbability;
    private String recommendations;
    private LocalDateTime createdAt;

    public static HeartAttackPredictionResponse createHeartAttackPredictionResponseFrom(HeartAttackPrediction data) {
        return HeartAttackPredictionResponse.builder()
                .id(data.getId())
                .age(data.getAge())
                .sex(data.getSex())
                .cp(data.getCp())
                .trestbps(data.getTrestbps())
                .chol(data.getChol())
                .thalach(data.getThalach())
                .oldpeak(data.getOldpeak())
                .exang(data.getExang())
                .predictionProbability(data.getPredictionProbability())
                .recommendations(data.getRecommendations())
                .createdAt(data.getCreatedAt())
                .build();
    }
}
