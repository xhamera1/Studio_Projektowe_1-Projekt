package com.healthapp.backend.exception;

import com.google.genai.errors.ClientException;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import static org.springframework.http.HttpStatus.*;
import static org.springframework.http.ProblemDetail.forStatusAndDetail;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFoundException(UserNotFoundException ex) {
        ProblemDetail problemDetail = forStatusAndDetail(NOT_FOUND, ex.getMessage());
        problemDetail.setTitle("User Not Found");
        problemDetail.setProperty("timestamp", now());

        log.warn("User not found: {}", ex.getMessage());
        return problemDetail;

    }

    @ExceptionHandler(ClientException.class)
    public ProblemDetail handleClientException(ClientException ex) {
        ProblemDetail problemDetail = forStatusAndDetail(INTERNAL_SERVER_ERROR, "Error communicating with external LLM service");
        problemDetail.setTitle("External Service Error");
        problemDetail.setProperty("timestamp", now());

        log.error("LLM ClientException: Message - {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDeniedException(AccessDeniedException ex) {
        ProblemDetail problemDetail = forStatusAndDetail(FORBIDDEN, "Access denied to the requested resource");
        problemDetail.setTitle("Access Denied");
        problemDetail.setProperty("timestamp", now());

        log.warn("Access denied: {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    public ProblemDetail handleAuthenticationException(Exception ex) {
        ProblemDetail problemDetail = forStatusAndDetail(UNAUTHORIZED, "Authentication failed due to invalid credentials");
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
        ProblemDetail problemDetail = forStatusAndDetail(BAD_REQUEST, "Validation failed for one or more fields");
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

        ProblemDetail problemDetail = forStatusAndDetail(BAD_REQUEST, "Constraint validation in request parameters");
        problemDetail.setTitle("Constraint Declaration Error");
        problemDetail.setProperty("timestamp", now());
        problemDetail.setProperty("errors", errors);

        log.warn("Constraint violations: {}", errors);
        return problemDetail;
    }


    // Handle resource not found exceptions for non-existing endpoints
    @ExceptionHandler(NoResourceFoundException.class)
    public ProblemDetail handleNoResourceFoundException(NoResourceFoundException ex) {
        ProblemDetail problemDetail = forStatusAndDetail(NOT_FOUND, "The requested resource was not found");
        problemDetail.setTitle("Resource Not Found");
        problemDetail.setProperty("timestamp", now());

        log.warn("Resource not found: {}", ex.getMessage());
        return problemDetail;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgumentException(IllegalArgumentException ex) {
        ProblemDetail problemDetail = forStatusAndDetail(BAD_REQUEST, ex.getMessage());
        problemDetail.setTitle("Illegal Argument");
        problemDetail.setProperty("timestamp", now());

        log.warn("Illegal argument: {}", ex.getMessage());
        return problemDetail;
    }


    // Generic fallback exception handler
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(Exception ex) {
        ProblemDetail problemDetail = forStatusAndDetail(INTERNAL_SERVER_ERROR, "An unexpected error occurred");
        problemDetail.setTitle("Internal Server Error");
        problemDetail.setProperty("timestamp", now());

        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return problemDetail;
    }
}
