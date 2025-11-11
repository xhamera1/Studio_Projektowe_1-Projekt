package com.healthapp.backend.exception;

public class UserDemographicDataNotFoundException extends RuntimeException {
    public UserDemographicDataNotFoundException(String message) {
        super(message);
    }

    public static UserDemographicDataNotFoundException userDemographicDataNotFoundException(Long userId) {
        return new UserDemographicDataNotFoundException("Demographic data not found for user ID: " + userId);
    }
}
