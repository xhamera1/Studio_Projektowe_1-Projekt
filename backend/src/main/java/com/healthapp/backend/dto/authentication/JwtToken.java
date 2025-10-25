package com.healthapp.backend.dto.authentication;

public record JwtToken(
        String value,
        Long expiresIn
) {
}
