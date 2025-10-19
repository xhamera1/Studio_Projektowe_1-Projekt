package com.healthapp.backend.service;

import com.healthapp.backend.dto.LoginRequest;
import com.healthapp.backend.dto.SignupRequest;
import com.healthapp.backend.exception.UserNotFoundException;
import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.healthapp.backend.model.User.Role.USER;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public void registerUser(SignupRequest request) {
        final User user = User.builder()
                .username(request.username())
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .password(passwordEncoder.encode(request.password()))
                .role(USER)
                .build();

        userRepository.save(user);
    }

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
