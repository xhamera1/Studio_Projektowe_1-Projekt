package com.healthapp.backend.controller;

import com.healthapp.backend.annotation.IsOwnerOrAdmin;
import com.healthapp.backend.dto.predictionhistory.PredictionHistoryResponse;
import com.healthapp.backend.service.PredictionHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/api/prediction-history")
@Slf4j
@RequiredArgsConstructor
public class PredictionHistoryController {

    private final PredictionHistoryService predictionHistoryService;

    @GetMapping(value = "/{userId}", produces = APPLICATION_JSON)
    @IsOwnerOrAdmin
    public PredictionHistoryResponse getPredictionHistory(@PathVariable Long userId) {
        log.info("Received request to get prediction history for user with ID: {}", userId);
        return predictionHistoryService.getPredictionHistoryFor(userId);
    }
}
