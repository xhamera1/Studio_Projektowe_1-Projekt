package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.DiabetesPredictionRequest;
import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "diabetes_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiabetesData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "hba1c_level", nullable = false)
    private Float hba1cLevel;

    @Column(name = "blood_glucose_level", nullable = false)
    private Integer bloodGlucoseLevel;

    @Column(name = "bmi", nullable = false)
    private Float bmi;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "smoking_history", nullable = false)
    private Integer smokingHistory;

    @Column(name = "prediction_probability")
    private Float predictionProbability;

    @Lob
    @Column(name = "llm_recommendation", columnDefinition = "TEXT")
    private String recommendation;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public static DiabetesData createDiabetesDataFrom(DiabetesPredictionRequest request, HealthPredictionServiceResponse prediction, User user, String recommendation) {
        return DiabetesData.builder()
                .user(user)
                .hba1cLevel(request.hba1cLevel())
                .bloodGlucoseLevel(request.bloodGlucoseLevel())
                .bmi(request.bmi())
                .age(request.age())
                .smokingHistory(request.smokingHistory())
                .predictionProbability(prediction.probability())
                .recommendation(recommendation)
                .build();
    }
}
