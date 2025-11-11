package com.healthapp.backend.repository;

import com.healthapp.backend.model.HeartAttackData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeartAttackRepository extends JpaRepository<HeartAttackData, Long> {
}
