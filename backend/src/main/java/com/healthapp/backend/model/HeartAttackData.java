package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.HealthPredictionServiceResponse;
import com.healthapp.backend.dto.prediction.HeartAttackPredictionRequest;
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

    @Column(name = "thalach", nullable = false)
    private Integer thalach;

    @Column(name = "oldpeak", nullable = false)
    private Float oldpeak;

    @Column(name = "exang", nullable = false)
    private Integer exang;

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

    public static HeartAttackData createHeartAttackDataFrom(
            HeartAttackPredictionRequest request,
            HealthPredictionServiceResponse prediction,
            User user,
            String recommendations
    ) {
        return HeartAttackData.builder()
                .user(user)
                .age(request.age())
                .sex(request.sex())
                .cp(request.cp())
                .trestbps(request.trestbps())
                .chol(request.chol())
                .thalach(request.thalach())
                .oldpeak(request.oldpeak())
                .exang(request.exang())
                .predictionProbability(prediction.probability())
                .recommendations(recommendations)
                .build();
    }
}
