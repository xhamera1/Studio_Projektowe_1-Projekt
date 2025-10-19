package com.healthapp.backend.model;

public record JwtToken(
        String value,
        Long expiresIn
) {
}
