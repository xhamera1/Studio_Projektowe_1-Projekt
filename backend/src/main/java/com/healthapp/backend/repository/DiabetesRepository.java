package com.healthapp.backend.repository;


import com.healthapp.backend.model.DiabetesPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiabetesRepository extends JpaRepository<DiabetesPrediction, Long> {

    List<DiabetesPrediction> findByUserId(Long userId);
}
