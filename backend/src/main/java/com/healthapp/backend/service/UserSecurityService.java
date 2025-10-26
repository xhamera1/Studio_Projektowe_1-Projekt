package com.healthapp.backend.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityService {

    public boolean isOwnerOrAdmin(String username, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }

        String currentUsername = authentication.getName();
        return username.equals(currentUsername);
    }
}
