package com.healthapp.backend.service;

import com.healthapp.backend.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityService {

    public boolean isOwnerOrAdmin(Long userId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (isAdmin) {
            return true;
        }

        var principal = authentication.getPrincipal();
        if (principal instanceof User user) {
            return userId.equals(user.getId());
        }
        return false;
    }
}
