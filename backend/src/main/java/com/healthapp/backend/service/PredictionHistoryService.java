package com.healthapp.backend.service;

import com.healthapp.backend.dto.prediction.HabitsPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.DiabetesPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.HeartAttackPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.PredictionHistoryResponse;
import com.healthapp.backend.dto.predictionHistory.StrokePredictionResponse;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HabitAssessmentRepository;
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
    private final HabitAssessmentRepository habitAssessmentRepository;

    @Transactional(readOnly = true)
    public PredictionHistoryResponse getPredictionHistoryFor(Long userId) {
        var heartAttackPredictionHistory = heartAttackRepository.findByUserId(userId)
                .stream()
                .map(HeartAttackPredictionResponse::createHeartAttackPredictionResponseFrom)
                .toList();
        var diabetesPredictionHistory = diabetesRepository.findByUserId(userId)
                .stream()
                .map(DiabetesPredictionResponse::createDiabetesPredictionResponseFrom)
                .toList();
        var strokePredictionHistory = strokeRepository.findByUserId(userId)
                .stream()
                .map(StrokePredictionResponse::createStrokePredictionResponseFrom)
                .toList();
        var habitsHistory = habitAssessmentRepository.findByUserId(userId)
                .stream()
                .map(HabitsPredictionResponse::from)
                .toList();

        return new PredictionHistoryResponse(
                strokePredictionHistory,
                diabetesPredictionHistory,
                heartAttackPredictionHistory,
                habitsHistory
        );
    }
}
