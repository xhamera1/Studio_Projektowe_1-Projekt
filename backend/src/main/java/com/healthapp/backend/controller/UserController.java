package com.healthapp.backend.controller;

import com.healthapp.backend.dto.user.SignupRequest;
import com.healthapp.backend.dto.user.UserEditRequest;
import com.healthapp.backend.dto.user.UserResponse;
import com.healthapp.backend.model.User;
import com.healthapp.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static com.healthapp.backend.dto.user.UserResponse.createUserResponseFrom;
import static io.netty.handler.codec.http.HttpHeaders.Values.APPLICATION_JSON;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<UserResponse> signup(@RequestBody @Valid SignupRequest request) {
        log.info("Received create user request: {}", request);
        User user = userService.createUser(request);
        return ResponseEntity.ok(createUserResponseFrom(user));
    }

    @GetMapping(value = "/{username}", produces = APPLICATION_JSON)
    public ResponseEntity<UserResponse> getUser(@PathVariable String username) {
        log.info("Received get user request with username: {}", username);
        User user = userService.getUserBy(username);
        return ResponseEntity.ok(createUserResponseFrom(user));
    }

    @PutMapping(value = "/{username}", consumes = APPLICATION_JSON, produces = APPLICATION_JSON)
    @PreAuthorize("@userSecurityService.isOwnerOrAdmin(#username, authentication)")
    public ResponseEntity<UserResponse> updateUser(@PathVariable String username, @RequestBody @Valid UserEditRequest request) {
        log.info("Received update user request with username: {}", username);
        User updatedUser = userService.updateUser(username, request);
        return ResponseEntity.ok(createUserResponseFrom(updatedUser));
    }

    @DeleteMapping(value = "/{username}", produces = APPLICATION_JSON)
    @PreAuthorize("@userSecurityService.isOwnerOrAdmin(#username, authentication)")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        log.info("Received delete user request with username: {}", username);
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
