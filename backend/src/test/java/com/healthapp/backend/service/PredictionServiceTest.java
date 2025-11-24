package com.healthapp.backend.service;

import com.healthapp.backend.client.HealthPredictionClient;
import com.healthapp.backend.dto.prediction.HabitsPredictionRequest;
import com.healthapp.backend.repository.DiabetesRepository;
import com.healthapp.backend.repository.HabitAssessmentRepository;
import com.healthapp.backend.repository.HeartAttackRepository;
import com.healthapp.backend.repository.StrokeRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PredictionService Tests")
class PredictionServiceTest {

    @Mock
    private HealthPredictionClient healthPredictionClient;

    @Mock
    private DiabetesRepository diabetesRepository;

    @Mock
    private HeartAttackRepository heartAttackRepository;

    @Mock
    private StrokeRepository strokeRepository;

    @Mock
    private HabitAssessmentRepository habitAssessmentRepository;

    @Mock
    private UserService userService;

    @Mock
    private Gemini gemini;

    @InjectMocks
    private PredictionService predictionService;

    @Test
    @DisplayName("calculateWellnessScore should handle null values gracefully")
    void testCalculateWellnessScoreWithNullValues() throws Exception {
        // Use reflection to access private method
        Method method = PredictionService.class.getDeclaredMethod(
            "calculateWellnessScore", HabitsPredictionRequest.class);
        method.setAccessible(true);

        HabitsPredictionRequest request = new HabitsPredictionRequest(
            null, null, null, null, null, null, null
        );

        float score = (float) method.invoke(predictionService, request);
        
        // Should return a valid score between 0 and 100
        assertTrue(score >= 0 && score <= 100, 
            "Wellness score should be between 0 and 100");
    }

    @Test
    @DisplayName("calculateWellnessScore should calculate correct score for ideal values")
    void testCalculateWellnessScoreWithIdealValues() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "calculateWellnessScore", HabitsPredictionRequest.class);
        method.setAccessible(true);

        // Ideal values: 8 glasses water, 8 hours sleep, 10000 steps, 30 min exercise,
        // 2 hours screen time, stress level 1, 5 servings fruits/veggies
        HabitsPredictionRequest request = new HabitsPredictionRequest(
            8, 8f, 10000, 30, 2f, 1, 5
        );

        float score = (float) method.invoke(predictionService, request);
        
        // Should be a high score (close to 100)
        assertTrue(score >= 80, 
            "Ideal values should result in high wellness score");
        assertTrue(score <= 100, 
            "Score should not exceed 100");
    }

    @Test
    @DisplayName("calculateWellnessScore should handle extreme values")
    void testCalculateWellnessScoreWithExtremeValues() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "calculateWellnessScore", HabitsPredictionRequest.class);
        method.setAccessible(true);

        // Extreme values: very high water, very high steps, etc.
        HabitsPredictionRequest request = new HabitsPredictionRequest(
            20, 12f, 50000, 120, 1f, 1, 10
        );

        float score = (float) method.invoke(predictionService, request);
        
        // Should still be within valid range
        assertTrue(score >= 0 && score <= 100, 
            "Score should be clamped between 0 and 100");
    }

    @Test
    @DisplayName("normalize should handle null values")
    void testNormalizeWithNullValues() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "normalize", Number.class, double.class);
        method.setAccessible(true);

        double result = (double) method.invoke(predictionService, null, 10.0);
        
        assertEquals(0.0, result, 0.001, 
            "Normalize should return 0 for null values");
    }

    @Test
    @DisplayName("normalize should handle zero ideal value")
    void testNormalizeWithZeroIdeal() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "normalize", Number.class, double.class);
        method.setAccessible(true);

        double result = (double) method.invoke(predictionService, 5, 0.0);
        
        assertEquals(0.0, result, 0.001, 
            "Normalize should return 0 when ideal is 0 or negative");
    }

    @Test
    @DisplayName("normalize should cap result at 1.0")
    void testNormalizeCapsAtOne() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "normalize", Number.class, double.class);
        method.setAccessible(true);

        // Value greater than ideal should be capped at 1.0
        double result = (double) method.invoke(predictionService, 20, 10.0);
        
        assertEquals(1.0, result, 0.001, 
            "Normalize should cap at 1.0 when value exceeds ideal");
    }

    @Test
    @DisplayName("scoreSleep should handle null hours")
    void testScoreSleepWithNull() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "scoreSleep", Float.class);
        method.setAccessible(true);

        double result = (double) method.invoke(predictionService, (Float) null);
        
        assertEquals(0.5, result, 0.001, 
            "Score sleep should return 0.5 for null hours");
    }

    @Test
    @DisplayName("scoreSleep should return 1.0 for optimal sleep (7-9 hours)")
    void testScoreSleepOptimal() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "scoreSleep", Float.class);
        method.setAccessible(true);

        double result7 = (double) method.invoke(predictionService, 7f);
        double result8 = (double) method.invoke(predictionService, 8f);
        double result9 = (double) method.invoke(predictionService, 9f);
        
        assertEquals(1.0, result7, 0.001, "7 hours should score 1.0");
        assertEquals(1.0, result8, 0.001, "8 hours should score 1.0");
        assertEquals(1.0, result9, 0.001, "9 hours should score 1.0");
    }

    @Test
    @DisplayName("scoreSleep should decrease for hours far from 8")
    void testScoreSleepDecreasesWithDistance() throws Exception {
        Method method = PredictionService.class.getDeclaredMethod(
            "scoreSleep", Float.class);
        method.setAccessible(true);

        double result4 = (double) method.invoke(predictionService, 4f);
        double result12 = (double) method.invoke(predictionService, 12f);
        
        assertTrue(result4 < 1.0, "4 hours should score less than 1.0");
        assertTrue(result12 < 1.0, "12 hours should score less than 1.0");
        assertTrue(result4 >= 0, "Score should not be negative");
        assertTrue(result12 >= 0, "Score should not be negative");
    }
}

