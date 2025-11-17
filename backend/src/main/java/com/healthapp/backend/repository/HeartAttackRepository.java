package com.healthapp.backend.repository;

import com.healthapp.backend.model.HeartAttackPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeartAttackRepository extends JpaRepository<HeartAttackPrediction, Long> {

    List<HeartAttackPrediction> findByUserId(Long userId);
}
