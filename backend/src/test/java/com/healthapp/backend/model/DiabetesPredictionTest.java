package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("DiabetesPrediction Factory Tests")
class DiabetesPredictionTest {

    @Test
    @DisplayName("createDiabetesPredictionFrom should convert decimal probability to percentage")
    void testProbabilityConversionFromDecimal() {
        // Arrange
        DiabetesPredictionRequest request = new DiabetesPredictionRequest(
            5.5f, 120, 25.0f, 35, 2
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            1, 0.93f  // 93% probability in decimal format
        );
        User user = User.builder()
            .id(1L)
            .username("testuser")
            .email("test@example.com")
            .password("encodedPassword")
            .firstName("Test")
            .lastName("User")
            .role(User.Role.USER)
            .build();
        String recommendation = "Test recommendation";

        // Act
        DiabetesPrediction result = DiabetesPrediction.createDiabetesPredictionFrom(
            request, prediction, user, recommendation
        );

        // Assert
        assertNotNull(result);
        assertEquals(93.0f, result.getPredictionProbability(), 0.01f,
            "Probability should be converted from 0.93 to 93.0");
    }

    @Test
    @DisplayName("createDiabetesPredictionFrom should handle null probability")
    void testNullProbability() {
        // Arrange
        DiabetesPredictionRequest request = new DiabetesPredictionRequest(
            5.5f, 120, 25.0f, 35, 2
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            1, null
        );
        User user = User.builder()
            .id(1L)
            .username("testuser")
            .email("test@example.com")
            .password("encodedPassword")
            .firstName("Test")
            .lastName("User")
            .role(User.Role.USER)
            .build();
        String recommendation = "Test recommendation";

        // Act
        DiabetesPrediction result = DiabetesPrediction.createDiabetesPredictionFrom(
            request, prediction, user, recommendation
        );

        // Assert
        assertNotNull(result);
        assertNull(result.getPredictionProbability(),
            "Null probability should remain null");
    }

    @Test
    @DisplayName("createDiabetesPredictionFrom should handle zero probability")
    void testZeroProbability() {
        // Arrange
        DiabetesPredictionRequest request = new DiabetesPredictionRequest(
            5.5f, 120, 25.0f, 35, 2
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            0, 0.0f
        );
        User user = User.builder()
            .id(1L)
            .username("testuser")
            .email("test@example.com")
            .password("encodedPassword")
            .firstName("Test")
            .lastName("User")
            .role(User.Role.USER)
            .build();
        String recommendation = "Test recommendation";

        // Act
        DiabetesPrediction result = DiabetesPrediction.createDiabetesPredictionFrom(
            request, prediction, user, recommendation
        );

        // Assert
        assertNotNull(result);
        assertEquals(0.0f, result.getPredictionProbability(), 0.01f,
            "Zero probability should be converted to 0.0");
    }

    @Test
    @DisplayName("createDiabetesPredictionFrom should handle maximum probability (1.0)")
    void testMaximumProbability() {
        // Arrange
        DiabetesPredictionRequest request = new DiabetesPredictionRequest(
            5.5f, 120, 25.0f, 35, 2
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            1, 1.0f  // 100% probability
        );
        User user = User.builder()
            .id(1L)
            .username("testuser")
            .email("test@example.com")
            .password("encodedPassword")
            .firstName("Test")
            .lastName("User")
            .role(User.Role.USER)
            .build();
        String recommendation = "Test recommendation";

        // Act
        DiabetesPrediction result = DiabetesPrediction.createDiabetesPredictionFrom(
            request, prediction, user, recommendation
        );

        // Assert
        assertNotNull(result);
        assertEquals(100.0f, result.getPredictionProbability(), 0.01f,
            "1.0 probability should be converted to 100.0");
    }

    @Test
    @DisplayName("createDiabetesPredictionFrom should preserve all request fields")
    void testAllFieldsPreserved() {
        // Arrange
        DiabetesPredictionRequest request = new DiabetesPredictionRequest(
            5.5f, 120, 25.0f, 35, 2
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            1, 0.5f
        );
        User user = User.builder()
            .id(1L)
            .username("testuser")
            .email("test@example.com")
            .password("encodedPassword")
            .firstName("Test")
            .lastName("User")
            .role(User.Role.USER)
            .build();
        String recommendation = "Test recommendation";

        // Act
        DiabetesPrediction result = DiabetesPrediction.createDiabetesPredictionFrom(
            request, prediction, user, recommendation
        );

        // Assert
        assertNotNull(result);
        assertEquals(5.5f, result.getHba1cLevel(), 0.01f);
        assertEquals(120, result.getBloodGlucoseLevel());
        assertEquals(25.0f, result.getBmi(), 0.01f);
        assertEquals(35, result.getAge());
        assertEquals(2, result.getSmokingHistory());
        assertEquals(user, result.getUser());
        assertEquals(recommendation, result.getRecommendations());
    }
}

