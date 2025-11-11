package com.healthapp.backend.exception;

public class UserDemographicAlreadyExistsException extends RuntimeException {
    public UserDemographicAlreadyExistsException(String message) {
        super(message);
    }

    public static UserDemographicAlreadyExistsException userDemographicDataAlreadyExistsException(Long userId) {
        return new UserDemographicAlreadyExistsException("User demographic data already exists for user with ID: " + userId);
    }
}
