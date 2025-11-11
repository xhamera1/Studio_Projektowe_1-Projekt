package com.healthapp.backend.exception;

import com.google.genai.errors.ClientException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

import static java.time.LocalDateTime.now;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ProblemDetail.forStatusAndDetail;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(GeminiException.class)
    public ProblemDetail handleGeminiException(GeminiException ex) {
        var problemDetail = forStatusAndDetail(INTERNAL_SERVER_ERROR, ex.getMessage());
        problemDetail.setTitle("LLM Service Error");
        problemDetail.setProperty("timestamp", now());

        log.error("GeminiException: {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFoundException(UserNotFoundException ex) {
        var problemDetail = forStatusAndDetail(NOT_FOUND, ex.getMessage());
        problemDetail.setTitle("User Not Found");
        problemDetail.setProperty("timestamp", now());

        log.warn("User not found: {}", ex.getMessage());
        return problemDetail;

    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ProblemDetail handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        var problemDetail = forStatusAndDetail(CONFLICT, ex.getMessage());
        problemDetail.setTitle("User Already Exists");
        problemDetail.setProperty("timestamp", now());

        log.warn("User already exists: {}", ex.getMessage());
        return problemDetail;

    }

    @ExceptionHandler(ClientException.class)
    public ProblemDetail handleClientException(ClientException ex) {
        var problemDetail = forStatusAndDetail(INTERNAL_SERVER_ERROR, "Error communicating with external LLM service");
        problemDetail.setTitle("External Service Error");
        problemDetail.setProperty("timestamp", now());

        log.error("LLM ClientException: Message - {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDeniedException(AccessDeniedException ex) {
        var problemDetail = forStatusAndDetail(FORBIDDEN, "Access denied to the requested resource");
        problemDetail.setTitle("Access Denied");
        problemDetail.setProperty("timestamp", now());

        log.warn("Access denied: {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    public ProblemDetail handleAuthenticationException(Exception ex) {
        var problemDetail = forStatusAndDetail(UNAUTHORIZED, "Authentication failed due to invalid credentials");
        problemDetail.setTitle("Authentication Failed");
        problemDetail.setProperty("timestamp", now());

        log.warn("Authentication failed: {}", ex.getMessage());
        return problemDetail;
    }

    // @Valid validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        var problemDetail = forStatusAndDetail(BAD_REQUEST, "Validation failed for one or more fields");
        problemDetail.setTitle("Validation Error");
        problemDetail.setProperty("timestamp", now());
        problemDetail.setProperty("errors", errors);

        log.warn("Validation errors: {}", errors);
        return problemDetail;
    }

    // Constraint validation errors (e.g. @PathVariable, @RequestParam)
    @ExceptionHandler(ConstraintViolationException.class)
    public ProblemDetail handleConstraintDeclarationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(error -> errors.put(error.getPropertyPath().toString(), error.getMessage()));

        var problemDetail = forStatusAndDetail(BAD_REQUEST, "Constraint validation in request parameters");
        problemDetail.setTitle("Constraint Declaration Error");
        problemDetail.setProperty("timestamp", now());
        problemDetail.setProperty("errors", errors);

        log.warn("Constraint violations: {}", errors);
        return problemDetail;
    }


    // Handle resource not found exceptions for non-existing endpoints
    @ExceptionHandler(NoResourceFoundException.class)
    public ProblemDetail handleNoResourceFoundException(NoResourceFoundException ex) {
        var problemDetail = forStatusAndDetail(NOT_FOUND, "The requested resource was not found");
        problemDetail.setTitle("Resource Not Found");
        problemDetail.setProperty("timestamp", now());

        log.warn("Resource not found: {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgumentException(IllegalArgumentException ex) {
        var problemDetail = forStatusAndDetail(BAD_REQUEST, ex.getMessage());
        problemDetail.setTitle("Illegal Argument");
        problemDetail.setProperty("timestamp", now());

        log.warn("Illegal argument: {}", ex.getMessage());
        return problemDetail;
    }


    // Generic fallback exception handler
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(Exception ex) {
        var problemDetail = forStatusAndDetail(INTERNAL_SERVER_ERROR, "An unexpected error occurred");
        problemDetail.setTitle("Internal Server Error");
        problemDetail.setProperty("timestamp", now());

        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return problemDetail;
    }
}
