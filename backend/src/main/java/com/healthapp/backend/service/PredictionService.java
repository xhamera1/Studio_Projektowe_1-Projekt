package com.healthapp.backend.service;

import com.healthapp.backend.client.HealthPredictionClient;
import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
import com.healthapp.backend.model.DiabetesPrediction;
import com.healthapp.backend.model.HeartAttackPrediction;
import com.healthapp.backend.model.StrokePrediction;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HeartAttackRepository;
import com.healthapp.backend.repository.StrokeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.dto.prediction.Prompt.createDiabetesPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createHeartAttackPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createStrokePromptFrom;
import static com.healthapp.backend.model.DiabetesPrediction.createDiabetesPredictionFrom;
import static com.healthapp.backend.model.HeartAttackPrediction.createHeartAttackPredictionFrom;
import static com.healthapp.backend.model.StrokePrediction.createStrokePredictionFrom;

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
    public DiabetesPrediction predictDiabetesFor(DiabetesPredictionRequest request, Long userId) {
        var prediction = healthPredictionClient.predictDiabetes(request);

        var user = userService.findUserBy(userId);

        var recommendations = gemini.chat(createDiabetesPromptFrom(request, prediction));

        var diabetesPrediction = createDiabetesPredictionFrom(request, prediction, user, recommendations);
        return diabetesRepository.save(diabetesPrediction);
    }

    @Transactional
    public HeartAttackPrediction predictHeartAttackFor(HeartAttackPredictionRequest request, Long userId) {
        var prediction = healthPredictionClient.predictHeartAttack(request);

        var user = userService.findUserBy(userId);

        var recommendations = gemini.chat(createHeartAttackPromptFrom(request, prediction));

        var heartAttackPrediction = createHeartAttackPredictionFrom(request, prediction, user, recommendations);
        return heartAttackRepository.save(heartAttackPrediction);
    }

    @Transactional
    public StrokePrediction predictStrokeFor(StrokePredictionRequest request, Long userId) {
        var prediction = healthPredictionClient.predictStroke(request);

        var user = userService.findUserBy(userId);

        var recommendations = gemini.chat(createStrokePromptFrom(request, prediction));

        var strokePrediction = createStrokePredictionFrom(request, prediction, user, recommendations);
        return strokeRepository.save(strokePrediction);
    }
}
