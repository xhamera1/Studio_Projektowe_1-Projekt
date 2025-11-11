package com.healthapp.backend.service;

import com.healthapp.backend.dto.authentication.LoginRequest;
import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import static com.healthapp.backend.exception.UserNotFoundException.userNotFoundException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public User authenticate(LoginRequest request) {
        var token = new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
        );
        var authentication = authenticationManager.authenticate(token);
        Object principal = authentication.getPrincipal();

        if (principal instanceof User user) {
            return user;
        } else {
            throw userNotFoundException(request.username());
        }
    }
}
