package com.healthapp.backend.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }

    public static UserNotFoundException userNotFoundException(String username) {
        return new UserNotFoundException("User with username '" + username + "' not found");
    }
}
