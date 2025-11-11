package com.healthapp.backend.exception;

public class GeminiException extends RuntimeException {
    public GeminiException(String message) {
        super(message);
    }

    public static GeminiException geminiNoContentException() {
        return new GeminiException("LLM returned no content");
    }

    public static GeminiException geminiSafetyBlockException() {
        return new GeminiException("LLM response blocked due to safety settings");
    }

    public static GeminiException geminiEmptyPromptException() {
        return new GeminiException("LLM prompt cannot be null or empty");
    }
}
