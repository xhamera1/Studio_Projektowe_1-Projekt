package com.healthapp.backend.model;

import jakarta.persistence.*;
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
    private Float age;

    @Column(name = "smoking_history", nullable = false)
    private Integer smokingHistory;

    @Column(name = "prediction_result")
    private Boolean hasDiabetes;

    @Column(name = "prediction_probability")
    private Float predictionProbability;

    @Column(name = "model_version")
    private String modelVersion;

    @Lob
    @Column(name = "llm_recommendation", columnDefinition = "TEXT")
    private String llmRecommendation;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}