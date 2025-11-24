package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("StrokePrediction Factory Tests")
class StrokePredictionTest {

    @Test
    @DisplayName("createStrokePredictionFrom should convert decimal probability to percentage")
    void testProbabilityConversionFromDecimal() {
        // Arrange
        StrokePredictionRequest request = new StrokePredictionRequest(
            50, 1, 0, 0, 2, 95, 28.5f
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            1, 0.72f  // 72% probability in decimal format
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
        String recommendations = "Test recommendation";

        // Act
        StrokePrediction result = StrokePrediction.createStrokePredictionFrom(
            request, prediction, user, recommendations
        );

        // Assert
        assertNotNull(result);
        assertEquals(72.0f, result.getPredictionProbability(), 0.01f,
            "Probability should be converted from 0.72 to 72.0");
    }

    @Test
    @DisplayName("createStrokePredictionFrom should handle null probability")
    void testNullProbability() {
        // Arrange
        StrokePredictionRequest request = new StrokePredictionRequest(
            50, 1, 0, 0, 2, 95, 28.5f
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
        String recommendations = "Test recommendation";

        // Act
        StrokePrediction result = StrokePrediction.createStrokePredictionFrom(
            request, prediction, user, recommendations
        );

        // Assert
        assertNotNull(result);
        assertNull(result.getPredictionProbability(),
            "Null probability should remain null");
    }
}

