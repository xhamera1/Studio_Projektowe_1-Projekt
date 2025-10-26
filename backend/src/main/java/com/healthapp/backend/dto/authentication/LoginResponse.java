package com.healthapp.backend.dto.authentication;

import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.model.User;
import lombok.Builder;

import static com.healthapp.backend.dto.user.UserResponse.createUserResponseFrom;


@Builder
public record LoginResponse(
        UserResponse user,
        JwtToken jwtToken
) {
    public static LoginResponse createLoginResponseFor(User user, JwtToken token) {
        return LoginResponse.builder()
                .user(createUserResponseFrom(user))
                .jwtToken(token)
                .build();
    }
}
