package com.healthapp.backend.dto;

import com.healthapp.backend.model.JwtToken;
import com.healthapp.backend.model.User;
import lombok.Builder;

import static com.healthapp.backend.dto.UserResponse.createUserResponseFor;


@Builder
public record LoginResponse(
        UserResponse user,
        JwtToken jwtToken
) {
    public static LoginResponse createLoginResponseFor(User user, JwtToken token) {
        return LoginResponse.builder()
                .user(createUserResponseFor(user))
                .jwtToken(token)
                .build();
    }
}
