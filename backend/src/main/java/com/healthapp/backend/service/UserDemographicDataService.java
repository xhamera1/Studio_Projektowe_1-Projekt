package com.healthapp.backend.service;

import com.healthapp.backend.dto.userDemographicData.UserDemographicDataRequest;
import com.healthapp.backend.dto.userDemographicData.UserDemographicDataResponse;
import com.healthapp.backend.model.UserDemographicData;
import com.healthapp.backend.repository.UserDemographicDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.dto.userDemographicData.UserDemographicDataResponse.createUserDemographicDataResponseFrom;
import static com.healthapp.backend.exception.UserDemographicAlreadyExistsException.userDemographicDataAlreadyExistsException;
import static com.healthapp.backend.exception.UserDemographicDataNotFoundException.userDemographicDataNotFoundException;
import static com.healthapp.backend.model.UserDemographicData.createUserDemographicDataFrom;

@Service
@RequiredArgsConstructor
public class UserDemographicDataService {

    private final UserDemographicDataRepository userDemographicDataRepository;
    private final UserService userService;

    @Transactional
    public UserDemographicDataResponse saveDemographicDataFor(UserDemographicDataRequest request, Long userId) {
        var demographicDataOptional = userDemographicDataRepository.findByUserId(userId);
        if (demographicDataOptional.isPresent()) {
            throw userDemographicDataAlreadyExistsException(userId);
        }
        var user = userService.findUserBy(userId);

        var demographicData = createUserDemographicDataFrom(request, user);
        var savedDemographicData = userDemographicDataRepository.save(demographicData);

        return createUserDemographicDataResponseFrom(savedDemographicData);
    }

    @Transactional
    public UserDemographicDataResponse updateDemographicDataFor(UserDemographicDataRequest request, Long userId) {
        var existingDemographicData = findDemographicDataBy(userId);

        existingDemographicData.setSex(request.sex());
        existingDemographicData.setDateOfBirth(request.dateOfBirth());
        existingDemographicData.setWeight(request.weight());
        existingDemographicData.setHeight(request.height());

        var updatedDemographicData = userDemographicDataRepository.save(existingDemographicData);

        return createUserDemographicDataResponseFrom(updatedDemographicData);
    }

    @Transactional(readOnly = true)
    public UserDemographicDataResponse getDemographicDataFor(Long userId) {
        var demographicData = findDemographicDataBy(userId);
        return createUserDemographicDataResponseFrom(demographicData);
    }

    public UserDemographicData findDemographicDataBy(Long userId) {
        return userDemographicDataRepository.findByUserId(userId)
                .orElseThrow(() -> userDemographicDataNotFoundException(userId));
    }
}
