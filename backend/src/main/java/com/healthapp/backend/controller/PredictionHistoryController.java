package com.healthapp.backend.controller;

import com.healthapp.backend.dto.predictionhistory.PredictionHistoryResponse;
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

    @GetMapping(value = "/{username}", produces = APPLICATION_JSON)
    public PredictionHistoryResponse getPredictionHistory(@PathVariable String username) {
        log.info("Received request to get prediction history for user: {}", username);
        return new PredictionHistoryResponse();
    }
}
