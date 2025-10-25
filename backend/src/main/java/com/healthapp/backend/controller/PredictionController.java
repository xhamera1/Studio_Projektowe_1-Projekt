package com.healthapp.backend.controller;

import com.healthapp.backend.dto.prediction.*;
import com.healthapp.backend.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private static final Logger log = LoggerFactory.getLogger(PredictionController.class);

    private final ChatService chatService;

    @PostMapping(value = "/diabetes", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<DiabetesPredictionResponse> predictDiabetes(@RequestBody @Valid DiabetesPredictionRequest request) {
        log.info("Received diabetes prediction request: {}", request);
        return ResponseEntity.ok(new DiabetesPredictionResponse());
    }

    @PostMapping(value = "/stroke", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<StrokePredictionResponse> predictStroke(@RequestBody @Valid StrokePredictionRequest request) {
        log.info("Received stroke prediction request: {}", request);
        return ResponseEntity.ok(new StrokePredictionResponse());
    }

    @PostMapping(value = "/heart-attack", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<HeartAttackPredictionResponse> predictHeartAttack(@RequestBody @Valid HeartAttackPredictionRequest request) {
        log.info("Received heart attack prediction request: {}", request);
        return ResponseEntity.ok(new HeartAttackPredictionResponse());
    }

    @PostMapping(value = "/habits", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    public ResponseEntity<HabitsPredictionResponse> predictHabits(@RequestBody @Valid HabitsPredictionRequest request) {
        log.info("Received habits prediction request: {}", request);
        String response = chatService.chat("How many hours of sleep should a healthy adult get?");
        log.info("LLM response: {}", response);
        return ResponseEntity.ok(new HabitsPredictionResponse(response));
    }
}
