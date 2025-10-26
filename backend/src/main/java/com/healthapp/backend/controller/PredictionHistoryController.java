package com.healthapp.backend.controller;

import com.healthapp.backend.dto.predictionhistory.PredictionHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;

@RestController
@RequestMapping("/api/prediction-history")
@RequiredArgsConstructor
public class PredictionHistoryController {

    private static final Logger log = LoggerFactory.getLogger(PredictionHistoryController.class);

    @GetMapping(value = "/{username}", produces = APPLICATION_JSON)
    public ResponseEntity<PredictionHistoryResponse> getPredictionHistory(@PathVariable String username) {
        log.info("Received request to get prediction history for user: {}", username);
        return ResponseEntity.ok(new PredictionHistoryResponse());
    }
}
