package com.healthapp.backend.service;

import com.healthapp.backend.client.HealthPredictionClient;
import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import com.healthapp.backend.dto.prediction.PredictionResponse;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HeartAttackRepository;
import com.healthapp.backend.repository.StrokeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.dto.prediction.Prompt.createDiabetesPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createHeartAttackPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createStrokePromptFrom;
import static com.healthapp.backend.model.DiabetesData.createDiabetesDataFrom;
import static com.healthapp.backend.model.HeartAttackData.createHeartAttackDataFrom;
import static com.healthapp.backend.model.StrokeData.createStrokeDataFrom;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final HealthPredictionClient healthPredictionClient;
    private final DiabetesRepository diabetesRepository;
    private final HeartAttackRepository heartAttackRepository;
    private final StrokeRepository strokeRepository;
    private final UserService userService;
    private final Gemini gemini;

    @Transactional
    public PredictionResponse predictDiabetesFor(DiabetesPredictionRequest request, Long userId) {
        var prediction = healthPredictionClient.predictDiabetes(request);

        var user = userService.findUserBy(userId);

        var recommendations = gemini.chat(createDiabetesPromptFrom(request, prediction));

        var diabetesData = createDiabetesDataFrom(request, prediction, user, recommendations);
        diabetesRepository.save(diabetesData);

        return new PredictionResponse(prediction.probability(), recommendations);
    }

    @Transactional
    public PredictionResponse predictHeartAttackFor(HeartAttackPredictionRequest request, Long userId) {
        var prediction = healthPredictionClient.predictHeartAttack(request);

        var user = userService.findUserBy(userId);

        var recommendations = gemini.chat(createHeartAttackPromptFrom(request, prediction));

        var HeartAttackData = createHeartAttackDataFrom(request, prediction, user, recommendations);
        heartAttackRepository.save(HeartAttackData);

        return new PredictionResponse(prediction.probability(), recommendations);
    }

    @Transactional
    public PredictionResponse predictStrokeFor(StrokePredictionRequest request, Long userId) {
        var prediction = healthPredictionClient.predictStroke(request);

        var user = userService.findUserBy(userId);

        var recommendations = gemini.chat(createStrokePromptFrom(request, prediction));

        var strokeData = createStrokeDataFrom(request, prediction, user, recommendations);
        strokeRepository.save(strokeData);

        return new PredictionResponse(prediction.probability(), recommendations);
    }
}
