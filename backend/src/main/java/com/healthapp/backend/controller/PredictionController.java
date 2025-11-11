package com.healthapp.backend.controller;

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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

    @PostMapping(value = "/diabetes", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public PredictionResponse predictDiabetes(@RequestBody @Valid DiabetesPredictionRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        log.info("Received diabetes prediction request for user {}: {}", userDetails.getUsername(), request);
        return predictionService.predictDiabetesFor(request, userDetails.getUsername());
    }

    @PostMapping(value = "/stroke", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public PredictionResponse predictStroke(@RequestBody @Valid StrokePredictionRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        log.info("Received stroke prediction request: {}", request);
        return new PredictionResponse(0, "");
    }

    @PostMapping(value = "/heart-attack", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public PredictionResponse predictHeartAttack(@RequestBody @Valid HeartAttackPredictionRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        log.info("Received heart attack prediction request: {}", request);
        return predictionService.predictHeartAttackFor(request, userDetails.getUsername());
    }

    @PostMapping(value = "/habits", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public HabitsPredictionResponse predictHabits(@RequestBody @Valid HabitsPredictionRequest request) {
        log.info("Received habits prediction request: {}", request);
        String response = gemini.chat("How many hours of sleep should a healthy adult get?");
        return new HabitsPredictionResponse(response);
    }
}
