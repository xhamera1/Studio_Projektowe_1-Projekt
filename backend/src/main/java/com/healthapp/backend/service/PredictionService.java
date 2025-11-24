package com.healthapp.backend.service;

import com.healthapp.backend.client.HealthPredictionClient;
import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HabitsPredictionRequest;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
import com.healthapp.backend.model.HabitAssessment;
import com.healthapp.backend.model.DiabetesPrediction;
import com.healthapp.backend.model.HeartAttackPrediction;
import com.healthapp.backend.model.StrokePrediction;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HabitAssessmentRepository;
import com.healthapp.backend.repository.HeartAttackRepository;
import com.healthapp.backend.repository.StrokeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.dto.prediction.Prompt.createDiabetesPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createHabitsPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createHeartAttackPromptFrom;
import static com.healthapp.backend.dto.prediction.Prompt.createStrokePromptFrom;
import static com.healthapp.backend.model.DiabetesPrediction.createDiabetesPredictionFrom;
import static com.healthapp.backend.model.HabitAssessment.createFrom;
import static com.healthapp.backend.model.HeartAttackPrediction.createHeartAttackPredictionFrom;
import static com.healthapp.backend.model.StrokePrediction.createStrokePredictionFrom;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final HealthPredictionClient healthPredictionClient;
    private final DiabetesRepository diabetesRepository;
    private final HeartAttackRepository heartAttackRepository;
    private final StrokeRepository strokeRepository;
    private final HabitAssessmentRepository habitAssessmentRepository;
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

    @Transactional
    public HabitAssessment assessHabitsFor(HabitsPredictionRequest request, Long userId) {
        var user = userService.findUserBy(userId);
        var wellnessScore = calculateWellnessScore(request);
        var prompt = createHabitsPromptFrom(request, wellnessScore);
        var recommendations = gemini.chat(prompt);

        var assessment = createFrom(request, user, wellnessScore, recommendations);
        return habitAssessmentRepository.save(assessment);
    }

    private float calculateWellnessScore(HabitsPredictionRequest request) {
        double hydrationScore = normalize(request.waterIntakeGlasses(), 8);
        double sleepScore = scoreSleep(request.sleepHours());
        double stepsScore = normalize(request.stepsPerDay(), 10000);
        double exerciseScore = normalize(request.exerciseMinutes(), 30);
        
        // Handle null screenTimeHours - default to 0.5 if null (neutral score)
        double screenTimeScore;
        if (request.screenTimeHours() == null) {
            screenTimeScore = 0.5;
        } else {
            screenTimeScore = 1 - Math.min(request.screenTimeHours() / 8d, 1);
        }
        
        // Handle null stressLevel - default to 0.5 if null (neutral score)
        double stressScore;
        if (request.stressLevel() == null) {
            stressScore = 0.5;
        } else {
            stressScore = 1 - ((request.stressLevel() - 1) / 4d);
        }
        
        double nutritionScore = normalize(request.fruitsVeggiesServings(), 5);

        double average = (hydrationScore + sleepScore + stepsScore + exerciseScore + screenTimeScore + stressScore + nutritionScore) / 7d;
        return (float) Math.max(0, Math.min(100, Math.round(average * 100)));
    }

    private double scoreSleep(Float hours) {
        if (hours == null) {
            return 0.5;
        }
        if (hours >= 7 && hours <= 9) {
            return 1;
        }
        double diff = Math.abs(hours - 8);
        return Math.max(0, 1 - (diff / 4));
    }

    private double normalize(Number value, double ideal) {
        if (value == null || ideal <= 0) {
            return 0;
        }
        return Math.min(1, value.doubleValue() / ideal);
    }
}
