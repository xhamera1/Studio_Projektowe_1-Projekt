package com.healthapp.backend.client;

import com.healthapp.backend.config.HealthPredictionClientConfig;
import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ai-service", url = "${health-prediction-service.url}", configuration = HealthPredictionClientConfig.class)
public interface HealthPredictionClient {

    @PostMapping("/api/models/diabetes/predict")
    HealthPredictionServiceResponse predictDiabetes(@RequestBody DiabetesPredictionRequest request);

    @PostMapping("/api/models/heart-attack/predict")
    HealthPredictionServiceResponse predictHeartAttack(@RequestBody HeartAttackPredictionRequest request);

    @PostMapping("/api/models/stroke/predict")
    HealthPredictionServiceResponse predictStroke(@RequestBody StrokePredictionRequest request);
}
