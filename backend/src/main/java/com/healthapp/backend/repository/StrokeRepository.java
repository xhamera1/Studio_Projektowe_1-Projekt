package com.healthapp.backend.repository;

import com.healthapp.backend.model.StrokeData;
import com.healthapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StrokeRepository extends JpaRepository<StrokeData, Long> {

    List<StrokeData> findByUserId(Long userId);

    Long user(User user);
}
