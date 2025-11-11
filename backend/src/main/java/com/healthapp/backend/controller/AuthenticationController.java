package com.healthapp.backend.controller;

import com.healthapp.backend.dto.authentication.JwtToken;
import com.healthapp.backend.dto.authentication.LoginRequest;
import com.healthapp.backend.dto.authentication.LoginResponse;
import com.healthapp.backend.model.User;
import com.healthapp.backend.service.AuthenticationService;
import com.healthapp.backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.healthapp.backend.dto.authentication.LoginResponse.createLoginResponseFor;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @PostMapping(value = "/login", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        log.info("Received login request for user: {}", request.username());
        User authenticatedUser = authenticationService.authenticate(request);
        JwtToken token = jwtService.generateToken(authenticatedUser);
        return createLoginResponseFor(authenticatedUser, token);
    }
}
