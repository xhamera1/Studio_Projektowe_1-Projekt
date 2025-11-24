package com.healthapp.backend.dto.prediction;

import com.healthapp.backend.model.HabitAssessment;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record HabitsPredictionResponse(
        Long id,
        Integer waterIntakeGlasses,
        Float sleepHours,
        Integer stepsPerDay,
        Integer exerciseMinutes,
        Float screenTimeHours,
        Integer stressLevel,
        Integer fruitsVeggiesServings,
        Float wellnessScore,
        String recommendations,
        LocalDateTime createdAt
) {

    public static HabitsPredictionResponse from(HabitAssessment assessment) {
        return HabitsPredictionResponse.builder()
                .id(assessment.getId())
                .waterIntakeGlasses(assessment.getWaterIntakeGlasses())
                .sleepHours(assessment.getSleepHours())
                .stepsPerDay(assessment.getStepsPerDay())
                .exerciseMinutes(assessment.getExerciseMinutes())
                .screenTimeHours(assessment.getScreenTimeHours())
                .stressLevel(assessment.getStressLevel())
                .fruitsVeggiesServings(assessment.getFruitsVeggiesServings())
                .wellnessScore(assessment.getWellnessScore())
                .recommendations(assessment.getRecommendations())
                .createdAt(assessment.getCreatedAt())
                .build();
    }
}
