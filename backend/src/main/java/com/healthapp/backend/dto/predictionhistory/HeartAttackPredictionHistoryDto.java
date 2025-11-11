package com.healthapp.backend.dto.predictionhistory;

import com.healthapp.backend.model.HeartAttackData;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class HeartAttackPredictionHistoryDto {
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

    public static HeartAttackPredictionHistoryDto createFrom(HeartAttackData data) {
        return HeartAttackPredictionHistoryDto.builder()
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
