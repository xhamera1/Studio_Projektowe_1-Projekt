package com.healthapp.backend.model;

import com.healthapp.backend.dto.prediction.HabitsPredictionRequest;
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
@Table(name = "habit_assessments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HabitAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "water_intake_glasses", nullable = false)
    private Integer waterIntakeGlasses;

    @Column(name = "sleep_hours", nullable = false)
    private Float sleepHours;

    @Column(name = "steps_per_day", nullable = false)
    private Integer stepsPerDay;

    @Column(name = "exercise_minutes", nullable = false)
    private Integer exerciseMinutes;

    @Column(name = "screen_time_hours", nullable = false)
    private Float screenTimeHours;

    @Column(name = "stress_level", nullable = false)
    private Integer stressLevel;

    @Column(name = "fruits_veggies_servings", nullable = false)
    private Integer fruitsVeggiesServings;

    @Column(name = "wellness_score", nullable = false)
    private Float wellnessScore;

    @Lob
    @Column(name = "llm_recommendation", columnDefinition = "TEXT")
    private String recommendations;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public static HabitAssessment createFrom(
            HabitsPredictionRequest request,
            User user,
            Float wellnessScore,
            String recommendations
    ) {
        return HabitAssessment.builder()
                .user(user)
                .waterIntakeGlasses(request.waterIntakeGlasses())
                .sleepHours(request.sleepHours())
                .stepsPerDay(request.stepsPerDay())
                .exerciseMinutes(request.exerciseMinutes())
                .screenTimeHours(request.screenTimeHours())
                .stressLevel(request.stressLevel())
                .fruitsVeggiesServings(request.fruitsVeggiesServings())
                .wellnessScore(wellnessScore)
                .recommendations(recommendations)
                .build();
    }
}

