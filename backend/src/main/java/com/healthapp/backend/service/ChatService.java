package com.healthapp.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final Client geminiClient;
    private final GenerateContentConfig geminiConfig;
    private final String defaultModel;

    public String chat(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            log.warn("Prompt is null or empty");
            throw new IllegalArgumentException("Prompt cannot be null or empty");
        }

        GenerateContentResponse response = geminiClient.models
                .generateContent(defaultModel, prompt, geminiConfig);

        if (response.candidates().isEmpty()) {
            log.warn("Received empty response from LLM");
            throw new RuntimeException("LLM returned no content");
        }
        String finishReason = response.candidates().get().getFirst().finishReason().map(Object::toString).orElse("UNKNOWN");

        if (finishReason.equals("SAFETY")) {
            log.warn("Response blocked due to safety settings");
            throw new RuntimeException("LLM response blocked due to safety settings");
        }

        return response.text();
    }

}
