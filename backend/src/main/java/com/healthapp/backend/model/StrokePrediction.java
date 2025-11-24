package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import com.healthapp.backend.dto.prediction.StrokePredictionRequest;
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
@Table(name = "stroke_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StrokePrediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "sex", nullable = false)
    private Integer sex;

    @Column(name = "hypertension", nullable = false)
    private Integer hypertension;

    @Column(name = "heart_disease", nullable = false)
    private Integer heartDisease;

    @Column(name = "work_type", nullable = false)
    private Integer workType;

    @Column(name = "avg_glucose_level", nullable = false)
    private Integer avgGlucoseLevel;

    @Column(nullable = false)
    private Float bmi;

    @Column(name = "prediction_probability")
    private Float predictionProbability;

    @Lob
    @Column(name = "llm_recommendation", columnDefinition = "TEXT")
    private String recommendations;


    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public static StrokePrediction createStrokePredictionFrom(
            StrokePredictionRequest request,
            HealthPredictionServiceResponse prediction,
            User user,
            String recommendations
    ) {
        // Convert probability from decimal (0.0-1.0) to percentage (0-100)
        Float probabilityPercentage = prediction.probability() != null 
                ? prediction.probability() * 100f 
                : null;
        
        return StrokePrediction.builder()
                .user(user)
                .age(request.age())
                .sex(request.sex())
                .hypertension(request.hypertension())
                .heartDisease(request.heartDisease())
                .workType(request.workType())
                .avgGlucoseLevel(request.avgGlucoseLevel())
                .bmi(request.bmi())
                .predictionProbability(probabilityPercentage)
                .recommendations(recommendations)
                .build();
    }
}
