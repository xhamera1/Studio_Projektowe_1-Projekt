package com.healthapp.backend.dto.predictionhistory;

import java.util.List;

public record PredictionHistoryResponse(
        List<StrokePredictionHistoryDto> strokePredictions,
        List<DiabetesPredictionHistoryDto> diabetesPredictions,
        List<HeartAttackPredictionHistoryDto> heartAttackPredictions
) {
}
