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
@Table(name = "stroke_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StrokeData {

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
    private Float avgGlucoseLevel;

    @Column(nullable = false)
    private Float bmi;


    @Column(name = "prediction_result")
    private Boolean hasStroke;

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
