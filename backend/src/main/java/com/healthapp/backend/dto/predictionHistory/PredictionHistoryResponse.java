package com.healthapp.backend.dto.predictionHistory;

import com.healthapp.backend.dto.prediction.HabitsPredictionResponse;

import java.util.List;

public record PredictionHistoryResponse(
        List<StrokePredictionResponse> strokePredictions,
        List<DiabetesPredictionResponse> diabetesPredictions,
        List<HeartAttackPredictionResponse> heartAttackPredictions,
        List<HabitsPredictionResponse> habitAssessments
) {
}
