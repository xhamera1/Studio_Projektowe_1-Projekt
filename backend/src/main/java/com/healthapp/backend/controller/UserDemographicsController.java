package com.healthapp.backend.controller;

import com.healthapp.backend.annotation.IsOwnerOrAdmin;
import com.healthapp.backend.dto.userDemographicData.UserDemographicDataRequest;
import com.healthapp.backend.dto.userDemographicData.UserDemographicsResponse;
import com.healthapp.backend.service.UserDemographicsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/users/demographics")
@Slf4j
@RequiredArgsConstructor
public class UserDemographicsController {

    private final UserDemographicsService userDemographicsService;

    @PostMapping(value = "/{userId}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    @IsOwnerOrAdmin
    public UserDemographicsResponse createUserDemographics(@PathVariable Long userId, @RequestBody @Valid UserDemographicDataRequest request) {
        log.info("Received create demographic data request for user ID {}: {}", userId, request);
        return userDemographicsService.saveDemographicsFor(request, userId);
    }

    @PutMapping(value = "/{userId}", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    @IsOwnerOrAdmin
    public UserDemographicsResponse updateUserDemographics(@PathVariable Long userId, @RequestBody @Valid UserDemographicDataRequest request) {
        log.info("Received update demographic data request for user ID {}: {}", userId, request);
        return userDemographicsService.updateDemographicsFor(request, userId);
    }

    @GetMapping(value = "/{userId}", produces = APPLICATION_JSON_VALUE)
    @IsOwnerOrAdmin
    public UserDemographicsResponse getUserDemographics(@PathVariable Long userId) {
        log.info("Received get demographic data request for user ID {}", userId);
        return userDemographicsService.getDemographicsFor(userId);
    }
}
