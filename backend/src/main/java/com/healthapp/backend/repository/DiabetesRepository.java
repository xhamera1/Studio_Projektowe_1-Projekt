package com.healthapp.backend.repository;


import com.healthapp.backend.model.DiabetesData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiabetesRepository extends JpaRepository<DiabetesData, Long> {
}
