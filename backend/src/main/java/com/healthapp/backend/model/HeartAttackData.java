package com.healthapp.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "heart_attack_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeartAttackData {

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

    @Column(name = "cp", nullable = false)
    private Integer cp;

    @Column(name = "trestbps", nullable = false)
    private Integer trestbps;

    @Column(name = "chol", nullable = false)
    private Integer chol;

    @Column(name = "fbs", nullable = false)
    private Integer fbs;

    @Column(name = "restecg", nullable = false)
    private Integer restecg;

    @Column(name = "thalach", nullable = false)
    private Integer thalach;

    @Column(name = "exang", nullable = false)
    private Integer exang;

    @Column(name = "oldpeak", nullable = false)
    private Float oldpeak;

    @Column(name = "prediction_result")
    private Boolean hasHeartDisease;

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
