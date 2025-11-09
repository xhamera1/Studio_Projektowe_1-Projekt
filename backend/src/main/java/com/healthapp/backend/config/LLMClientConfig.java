package com.healthapp.backend.config;

import com.google.genai.Client;
import com.google.genai.types.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

import static com.google.genai.types.HarmBlockThreshold.Known.BLOCK_LOW_AND_ABOVE;
import static com.google.genai.types.HarmCategory.Known.*;

@Slf4j
@Configuration
public class LLMClientConfig {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.version}")
    private String apiVersion;

    @Value("${gemini.model}")
    private String model;

    @Value("${gemini.max.output.tokens}")
    private int maxOutputTokens;

    @Value("${gemini.temperature}")
    private float temperature;

    @Value("${gemini.top.p}")
    private float topP;

    @Value("${gemini.system.instruction}")
    private String systemInstruction;

    @Value("${gemini.timeout.ms}")
    private int timeoutMs;

    @Bean
    public Client geminiClient() {
        log.info("Initializing Gemini LLM Client with model: {}", model);
        return Client.builder()
                .apiKey(apiKey)
                .httpOptions(HttpOptions.builder()
                        .timeout(timeoutMs)
                        .apiVersion(apiVersion)
                        .build())
                .build();
    }

    @Bean
    public GenerateContentConfig geminiConfig() {
        return GenerateContentConfig.builder()
                .maxOutputTokens(maxOutputTokens)
                .temperature(temperature)
                .topP(topP)
                .systemInstruction(systemInstruction())
                .safetySettings(safetySettings())
                .build();
    }

    private Content systemInstruction() {
        return Content.fromParts(Part.fromText(systemInstruction));
    }

    private List<SafetySetting> safetySettings() {
        return List.of(
                SafetySetting.builder()
                        .category(HARM_CATEGORY_DANGEROUS_CONTENT)
                        .threshold(BLOCK_LOW_AND_ABOVE)
                        .build(),
                SafetySetting.builder()
                        .category(HARM_CATEGORY_HARASSMENT)
                        .threshold(BLOCK_LOW_AND_ABOVE)
                        .build(),
                SafetySetting.builder()
                        .category(HARM_CATEGORY_HATE_SPEECH)
                        .threshold(BLOCK_LOW_AND_ABOVE)
                        .build(),
                SafetySetting.builder()
                        .category(HARM_CATEGORY_SEXUALLY_EXPLICIT)
                        .threshold(BLOCK_LOW_AND_ABOVE)
                        .build()
        );
    }

    @Bean
    public String defaultModel() {
        return model;
    }
}
