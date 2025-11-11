package com.healthapp.backend.service;

import com.healthapp.backend.dto.user.SignupRequest;
import com.healthapp.backend.dto.user.UserEditRequest;
import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.model.User;
import com.healthapp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.healthapp.backend.dto.user.UserResponse.createUserResponseFrom;
import static com.healthapp.backend.exception.UserAlreadyExistsException.userAlreadyExistsException;
import static com.healthapp.backend.exception.UserNotFoundException.userNotFoundException;
import static com.healthapp.backend.model.User.createUserFrom;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findUserBy(Long userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> userNotFoundException(userId));
    }

    @Transactional(readOnly = true)
    public UserResponse getUserBy(Long userId) {
        var user = findUserBy(userId);
        return createUserResponseFrom(user);
    }

    @Transactional
    public UserResponse createUser(SignupRequest request) {
        if (userRepository.existsByUsernameOrEmail(request.username(), request.email())) {
            throw userAlreadyExistsException();
        }

        var encodedPassword = passwordEncoder.encode(request.password());
        var user = createUserFrom(request, encodedPassword);

        userRepository.save(user);
        return createUserResponseFrom(user);
    }

    @Transactional
    public UserResponse updateUser(Long userId, UserEditRequest request) {
        var user = findUserBy(userId);
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());

        var updatedUser = userRepository.save(user);
        return createUserResponseFrom(updatedUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        var user = findUserBy(userId);
        userRepository.delete(user);
    }
}
