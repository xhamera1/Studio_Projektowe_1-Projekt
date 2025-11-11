package com.healthapp.backend.service;

import com.healthapp.backend.dto.predictionhistory.DiabetesPredictionHistoryDto;
import com.healthapp.backend.dto.predictionhistory.HeartAttackPredictionHistoryDto;
import com.healthapp.backend.dto.predictionhistory.PredictionHistoryResponse;
import com.healthapp.backend.dto.predictionhistory.StrokePredictionHistoryDto;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HeartAttackRepository;
import com.healthapp.backend.repository.StrokeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PredictionHistoryService {

    private final HeartAttackRepository heartAttackRepository;
    private final DiabetesRepository diabetesRepository;
    private final StrokeRepository strokeRepository;

    @Transactional(readOnly = true)
    public PredictionHistoryResponse getPredictionHistoryFor(Long userId) {
        var heartAttackPredictionHistory = heartAttackRepository.findByUserId(userId)
                .stream()
                .map(HeartAttackPredictionHistoryDto::createFrom)
                .toList();
        var diabetesPredictionHistory = diabetesRepository.findByUserId(userId)
                .stream()
                .map(DiabetesPredictionHistoryDto::createFrom)
                .toList();
        var strokePredictionHistory = strokeRepository.findByUserId(userId)
                .stream()
                .map(StrokePredictionHistoryDto::createFrom)
                .toList();

        return new PredictionHistoryResponse(
                strokePredictionHistory,
                diabetesPredictionHistory,
                heartAttackPredictionHistory
        );
    }
}
