package com.healthapp.backend.service;

import com.healthapp.backend.dto.user.SignupRequest;
import com.healthapp.backend.dto.user.UserEditRequest;
import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.exception.UserAlreadyExistsException.userAlreadyExistsException;
import static com.healthapp.backend.exception.UserNotFoundException.userNotFoundException;
import static com.healthapp.backend.model.User.Role.USER;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public User getUserBy(String username) {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> userNotFoundException(username));
    }

    public User createUser(SignupRequest request) {
        if (userRepository.existsByUsernameOrEmail(request.username(), request.email())) {
            throw userAlreadyExistsException();
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .password(passwordEncoder.encode(request.password()))
                .role(USER)
                .build();

        return userRepository.save(user);
    }

    public User updateUser(String username, UserEditRequest request) {
        User user = getUserBy(username);

        request.email().ifPresent(user::setEmail);
        request.firstName().ifPresent(user::setFirstName);
        request.lastName().ifPresent(user::setLastName);

        return userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = getUserBy(username);
        userRepository.delete(user);
    }
}
