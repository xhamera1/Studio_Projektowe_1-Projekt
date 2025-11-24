package com.healthapp.backend.controller;

import com.healthapp.backend.annotation.IsOwnerOrAdmin;
import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HabitsPredictionRequest;
import com.healthapp.backend.dto.prediction.HabitsPredictionResponse;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
import com.healthapp.backend.dto.predictionHistory.DiabetesPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.HeartAttackPredictionResponse;
import com.healthapp.backend.dto.predictionHistory.StrokePredictionResponse;
import com.healthapp.backend.service.Gemini;
import com.healthapp.backend.service.PredictionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.healthapp.backend.dto.predictionHistory.DiabetesPredictionResponse.createDiabetesPredictionResponseFrom;
import static com.healthapp.backend.dto.predictionHistory.HeartAttackPredictionResponse.createHeartAttackPredictionResponseFrom;
import static com.healthapp.backend.dto.predictionHistory.StrokePredictionResponse.createStrokePredictionResponseFrom;
import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/api/predictions")
@Slf4j
@RequiredArgsConstructor
public class PredictionController {

    private final Gemini gemini;
    private final PredictionService predictionService;

    @PostMapping(value = "/diabetes/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public DiabetesPredictionResponse predictDiabetes(@PathVariable Long userId, @RequestBody @Valid DiabetesPredictionRequest request) {
        log.info("Received diabetes prediction request for user with ID {}: {}", userId, request);
        final var diabetesPrediction = predictionService.predictDiabetesFor(request, userId);
        return createDiabetesPredictionResponseFrom(diabetesPrediction);
    }

    @PostMapping(value = "/stroke/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public StrokePredictionResponse predictStroke(@PathVariable Long userId, @RequestBody @Valid StrokePredictionRequest request) {
        log.info("Received stroke prediction request for user with ID {}: {}", userId, request);
        final var strokePrediction = predictionService.predictStrokeFor(request, userId);
        return createStrokePredictionResponseFrom(strokePrediction);
    }

    @PostMapping(value = "/heart-attack/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public HeartAttackPredictionResponse predictHeartAttack(@PathVariable Long userId, @RequestBody @Valid HeartAttackPredictionRequest request) {
        log.info("Received heart attack prediction request for user with ID {}: {}", userId, request);
        final var heartAttackPrediction = predictionService.predictHeartAttackFor(request, userId);
        return createHeartAttackPredictionResponseFrom(heartAttackPrediction);
    }

    @PostMapping(value = "/habits/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public HabitsPredictionResponse predictHabits(@PathVariable Long userId, @RequestBody @Valid HabitsPredictionRequest request) {
        log.info("Received habits prediction request for user with ID {}: {}", userId, request);
        String response = gemini.chat("How many hours of sleep should a healthy adult get?");
        return new HabitsPredictionResponse(response);
    }
}
