package com.healthapp.backend.dto.predictionHistory;

import java.util.List;

public record PredictionHistoryResponse(
        List<StrokePredictionResponse> strokePredictions,
        List<DiabetesPredictionResponse> diabetesPredictions,
        List<HeartAttackPredictionResponse> heartAttackPredictions
) {
}
