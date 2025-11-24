package com.healthapp.backend.repository;

import com.healthapp.backend.model.HabitAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitAssessmentRepository extends JpaRepository<HabitAssessment, Long> {

    List<HabitAssessment> findByUserId(Long userId);
}

