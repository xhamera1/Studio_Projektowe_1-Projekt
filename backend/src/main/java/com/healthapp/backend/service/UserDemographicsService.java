package com.healthapp.backend.service;

import com.healthapp.backend.dto.userDemographicData.UserDemographicDataRequest;
import com.healthapp.backend.dto.userDemographicData.UserDemographicsResponse;
import com.healthapp.backend.model.UserDemographics;
import com.healthapp.backend.repository.UserDemographicsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.dto.userDemographicData.UserDemographicsResponse.createUserDemographicsResponseFrom;
import static com.healthapp.backend.exception.UserDemographicAlreadyExistsException.userDemographicDataAlreadyExistsException;
import static com.healthapp.backend.exception.UserDemographicDataNotFoundException.userDemographicDataNotFoundException;
import static com.healthapp.backend.model.UserDemographics.createUserDemographicsFrom;

@Service
@RequiredArgsConstructor
public class UserDemographicsService {

    private final UserDemographicsRepository userDemographicsRepository;
    private final UserService userService;

    @Transactional
    public UserDemographicsResponse saveDemographicsFor(UserDemographicDataRequest request, Long userId) {
        var demographicDataOptional = userDemographicsRepository.findByUserId(userId);
        if (demographicDataOptional.isPresent()) {
            throw userDemographicDataAlreadyExistsException(userId);
        }
        var user = userService.findUserBy(userId);

        var demographicData = createUserDemographicsFrom(request, user);
        var savedDemographicData = userDemographicsRepository.save(demographicData);

        return createUserDemographicsResponseFrom(savedDemographicData);
    }

    @Transactional
    public UserDemographicsResponse updateDemographicsFor(UserDemographicDataRequest request, Long userId) {
        var existingDemographicData = findUserDemographicsBy(userId);

        existingDemographicData.setSex(request.sex());
        existingDemographicData.setDateOfBirth(request.dateOfBirth());
        existingDemographicData.setWeight(request.weight());
        existingDemographicData.setHeight(request.height());

        var updatedDemographicData = userDemographicsRepository.save(existingDemographicData);

        return createUserDemographicsResponseFrom(updatedDemographicData);
    }

    @Transactional(readOnly = true)
    public UserDemographicsResponse getDemographicsFor(Long userId) {
        var demographicData = findUserDemographicsBy(userId);
        return createUserDemographicsResponseFrom(demographicData);
    }

    public UserDemographics findUserDemographicsBy(Long userId) {
        return userDemographicsRepository.findByUserId(userId)
                .orElseThrow(() -> userDemographicDataNotFoundException(userId));
    }
}
