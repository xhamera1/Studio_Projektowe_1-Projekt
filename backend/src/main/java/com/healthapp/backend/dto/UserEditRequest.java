package com.healthapp.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Optional;

public record UserEditRequest(
        Optional<@Email @NotBlank String> email,
        Optional<@NotBlank @Size(min = 1, max = 50) String> firstName,
        Optional<@NotBlank @Size(min = 1, max = 50) String> lastName
) {

}
