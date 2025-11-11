package com.healthapp.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.healthapp.backend.exception.GeminiException.geminiEmptyPromptException;
import static com.healthapp.backend.exception.GeminiException.geminiNoContentException;
import static com.healthapp.backend.exception.GeminiException.geminiSafetyBlockException;

@Service
@Slf4j
@RequiredArgsConstructor
public class Gemini {

    private final Client geminiClient;
    private final GenerateContentConfig geminiConfig;
    private final String defaultModel;

    public String chat(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            log.warn("Prompt is null or empty");
            throw geminiEmptyPromptException();
        }

        GenerateContentResponse response = geminiClient.models
                .generateContent(defaultModel, prompt, geminiConfig);

        if (response.candidates().isEmpty()) {
            log.warn("Received empty response from LLM");
            throw geminiNoContentException();
        }
        String finishReason = response.candidates().get().getFirst().finishReason().map(Object::toString).orElse("UNKNOWN");

        if (finishReason.equals("SAFETY")) {
            log.warn("Response blocked due to safety settings");
            throw geminiSafetyBlockException();
        }
        
        return response.text();
    }

}
