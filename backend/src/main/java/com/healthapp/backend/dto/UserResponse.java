package com.healthapp.backend.dto;

import com.healthapp.backend.model.User;
import com.healthapp.backend.model.User.Role;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserResponse(
        Integer id,
        String username,
        String email,
        String firstName,
        String lastName,
        Role role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static UserResponse createUserResponseFor(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
