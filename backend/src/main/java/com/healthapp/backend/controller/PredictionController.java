package com.healthapp.backend.controller;

import com.healthapp.backend.annotation.IsOwnerOrAdmin;
import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HabitsPredictionRequest;
import com.healthapp.backend.dto.prediction.HabitsPredictionResponse;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import com.healthapp.backend.dto.prediction.PredictionResponse;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
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
    public PredictionResponse predictDiabetes(@PathVariable Long userId, @RequestBody @Valid DiabetesPredictionRequest request) {
        log.info("Received diabetes prediction request for user with ID {}: {}", userId, request);
        return predictionService.predictDiabetesFor(request, userId);
    }

    @PostMapping(value = "/stroke/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public PredictionResponse predictStroke(@PathVariable Long userId, @RequestBody @Valid StrokePredictionRequest request) {
        log.info("Received stroke prediction request for user with ID {}: {}", userId, request);
        return predictionService.predictStrokeFor(request, userId);
    }

    @PostMapping(value = "/heart-attack/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public PredictionResponse predictHeartAttack(@PathVariable Long userId, @RequestBody @Valid HeartAttackPredictionRequest request) {
        log.info("Received heart attack prediction request for user with ID {}: {}", userId, request);
        return predictionService.predictHeartAttackFor(request, userId);
    }

    @PostMapping(value = "/habits/{userId}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public HabitsPredictionResponse predictHabits(@PathVariable Long userId, @RequestBody @Valid HabitsPredictionRequest request) {
        log.info("Received habits prediction request for user with ID {}: {}", userId, request);
        String response = gemini.chat("How many hours of sleep should a healthy adult get?");
        return new HabitsPredictionResponse(response);
    }
}
