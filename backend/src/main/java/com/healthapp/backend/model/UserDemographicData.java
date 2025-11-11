package com.healthapp.backend.model;

import com.healthapp.backend.dto.userDemographicData.UserDemographicDataRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_demographic_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDemographicData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "sex", nullable = false)
    private Integer sex;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "weight", nullable = false)
    private Float weight;

    @Column(name = "height", nullable = false)
    private Float height;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public static UserDemographicData createUserDemographicDataFrom(UserDemographicDataRequest request, User user) {
        return UserDemographicData.builder()
                .user(user)
                .sex(request.sex())
                .dateOfBirth(request.dateOfBirth())
                .weight(request.weight())
                .height(request.height())
                .build();
    }
}
