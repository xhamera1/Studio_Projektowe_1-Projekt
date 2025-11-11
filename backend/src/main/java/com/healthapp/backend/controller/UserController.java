package com.healthapp.backend.controller;

import com.healthapp.backend.dto.user.SignupRequest;
import com.healthapp.backend.dto.user.UserEditRequest;
import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.healthapp.backend.dto.user.UserResponse.createUserResponseFrom;
import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public UserResponse signup(@RequestBody @Valid SignupRequest request) {
        log.info("Received create user request: {}", request);
        var user = userService.createUser(request);
        return createUserResponseFrom(user);
    }

    @GetMapping(value = "/{username}", produces = APPLICATION_JSON)
    public UserResponse getUser(@PathVariable String username) {
        log.info("Received get user request with username: {}", username);
        var user = userService.getUserBy(username);
        return createUserResponseFrom(user);
    }

    @PutMapping(value = "/{username}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @PreAuthorize("@userSecurityService.isOwnerOrAdmin(#username, authentication)")
    public UserResponse updateUser(@PathVariable String username, @RequestBody @Valid UserEditRequest request) {
        log.info("Received update user request with username: {}", username);
        var updatedUser = userService.updateUser(username, request);
        return createUserResponseFrom(updatedUser);
    }

    @DeleteMapping(value = "/{username}", produces = APPLICATION_JSON)
    @PreAuthorize("@userSecurityService.isOwnerOrAdmin(#username, authentication)")
    public void deleteUser(@PathVariable String username) {
        log.info("Received delete user request with username: {}", username);
        userService.deleteUser(username);
    }
}
