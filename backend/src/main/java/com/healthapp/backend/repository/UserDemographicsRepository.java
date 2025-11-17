package com.healthapp.backend.repository;

import com.healthapp.backend.model.UserDemographics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDemographicsRepository extends JpaRepository<UserDemographics, Long> {

    Optional<UserDemographics> findByUserId(Long userId);
}
