package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("HeartAttackPrediction Factory Tests")
class HeartAttackPredictionTest {

    @Test
    @DisplayName("createHeartAttackPredictionFrom should convert decimal probability to percentage")
    void testProbabilityConversionFromDecimal() {
        // Arrange
        HeartAttackPredictionRequest request = new HeartAttackPredictionRequest(
            45, 1, 2, 130, 200, 150, 1.5f, 0
        );
        HealthPredictionServiceResponse prediction = new HealthPredictionServiceResponse(
            1, 0.85f  // 85% probability in decimal format
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
        HeartAttackPrediction result = HeartAttackPrediction.createHeartAttackPredictionFrom(
            request, prediction, user, recommendations
        );

        // Assert
        assertNotNull(result);
        assertEquals(85.0f, result.getPredictionProbability(), 0.01f,
            "Probability should be converted from 0.85 to 85.0");
    }

    @Test
    @DisplayName("createHeartAttackPredictionFrom should handle null probability")
    void testNullProbability() {
        // Arrange
        HeartAttackPredictionRequest request = new HeartAttackPredictionRequest(
            45, 1, 2, 130, 200, 150, 1.5f, 0
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
        HeartAttackPrediction result = HeartAttackPrediction.createHeartAttackPredictionFrom(
            request, prediction, user, recommendations
        );

        // Assert
        assertNotNull(result);
        assertNull(result.getPredictionProbability(),
            "Null probability should remain null");
    }
}

