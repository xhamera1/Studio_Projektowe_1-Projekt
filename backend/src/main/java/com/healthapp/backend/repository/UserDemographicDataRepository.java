package com.healthapp.backend.repository;

import com.healthapp.backend.model.UserDemographicData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDemographicDataRepository extends JpaRepository<UserDemographicData, Long> {

    Optional<UserDemographicData> findByUserId(Long userId);
}
