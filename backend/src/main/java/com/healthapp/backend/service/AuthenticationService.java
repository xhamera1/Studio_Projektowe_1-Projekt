package com.healthapp.backend.service;

import com.healthapp.backend.dto.authentication.LoginRequest;
import com.healthapp.backend.exception.UserNotFoundException;
import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public User authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                ));

        return userRepository
                .findByUsername(request.username())
                .orElseThrow(() -> new UserNotFoundException("User not found: " + request.username()));
    }
}
