package com.healthapp.backend.dto.prediction;

import static java.lang.String.format;

public class Prompt {

    private static final String DIABETES_PROMPT_TEMPLATE = """
            Analyze the following health data for a patient and provide personalized recommendations.
            The patient has a %.2f%% probability of having diabetes, and the prediction is that the patient %s diabetes.
            
            Patient's data:
            - HbA1c Level: %.2f
            - Blood Glucose Level: %d
            - BMI: %.2f
            - Age: %d
            - Smoking History: %s
            
            Based on this information, provide a set of actionable recommendations for the patient.
            Focus on lifestyle changes, diet, and exercise.
            If the probability of diabetes is high, strongly recommend consulting a healthcare professional.
            Your response should be empathetic and encouraging.
            """;

    private static final String HEART_ATTACK_PROMPT_TEMPLATE = """
            Analyze the following health data for a patient and provide personalized recommendations.
            The patient has a %.2f%% probability of having a heart attack, and the prediction is that the patient %s a heart attack.
            
            Patient's data:
            - Age: %d
            - Sex: %d
            - Chest Pain Type: %s
            - Resting Blood Pressure: %d
            - Serum Cholesterol Level in mg/dl: %d
            - Maximum Heart Rate Achieved: %d
            - ST Depression Induced by Exercise Relative to Rest: %.2f
            - Exercise Induced Angina: %d
            
            Based on this information, provide a set of actionable recommendations for the patient.
            Focus on lifestyle changes, diet, and exercise.
            If the probability of a heart attack is high, strongly recommend consulting a healthcare professional.
            Your response should be empathetic and encouraging.
            """;

    private static final String STROKE_PROMPT_TEMPLATE = """
            Analyze the following health data for a patient and provide personalized recommendations.
            The patient has a %.2f%% probability of having a stroke, and the prediction is that the patient %s a stroke.
            
            Patient's data:
            - Age: %d
            - Sex: %d
            - Hypertension: %b
            - Heart Disease: %b
            - Work Type: %s
            - Average Glucose Level in blood: %d
            - BMI: %.2f
            
            Based on this information, provide a set of actionable recommendations for the patient.
            Focus on lifestyle changes, diet, and exercise.
            If the probability of a stroke is high, strongly recommend consulting a healthcare professional.
            Your response should be empathetic and encouraging.
            """;

    private static final String HABITS_PROMPT_TEMPLATE = """
            You are a compassionate wellness coach. Review the following lifestyle snapshot and provide a concise,
            actionable plan to improve the individual's daily habits. Organize the response under short headings
            (e.g., Hydration, Movement, Sleep) and include 2-3 bullet points per section.

            Lifestyle snapshot:
            - Daily water intake: %d glasses
            - Average sleep duration: %.1f hours
            - Average steps per day: %d
            - Intentional exercise minutes per day: %d
            - Recreational screen time: %.1f hours
            - Self-reported stress level (1 low - 5 high): %d
            - Fruit/vegetable servings per day: %d
            - Calculated wellness score: %.0f / 100

            Highlight the strongest habit first, then focus on the top areas to improve.
            Close with a brief uplifting sentence encouraging consistency and follow-ups with healthcare professionals if needed.
            """;

    public static String createHeartAttackPromptFrom(HeartAttackPredictionRequest request, HealthPredictionServiceResponse prediction) {
        String chestPainType = switch (request.cp()) {
            case 1 -> "typical angina";
            case 2 -> "atypical angina";
            case 3 -> "non-anginal pain";
            case 4 -> "asymptomatic";
            default -> "unknown type";
        };

        return format(HEART_ATTACK_PROMPT_TEMPLATE,
                prediction.probability() * 100,
                prediction.hasDisease() ? "will have" : "will not have",
                request.age(),
                request.sex(),
                chestPainType,
                request.trestbps(),
                request.chol(),
                request.thalach(),
                request.oldpeak(),
                request.exang()
        );
    }

    public static String createDiabetesPromptFrom(DiabetesPredictionRequest request, HealthPredictionServiceResponse prediction) {
        String smokingHistory = switch (request.smokingHistory()) {
            case 0 -> "no information";
            case 1 -> "current";
            case 2 -> "ever";
            case 3 -> "former";
            case 4 -> "never";
            default -> "not current";
        };

        return format(DIABETES_PROMPT_TEMPLATE,
                prediction.probability() * 100,
                prediction.hasDisease() ? "has" : "does not have",
                request.hba1cLevel(),
                request.bloodGlucoseLevel(),
                request.bmi(),
                request.age(),
                smokingHistory
        );
    }

    public static String createStrokePromptFrom(StrokePredictionRequest request, HealthPredictionServiceResponse prediction) {
        String workType = switch (request.workType()) {
            case 0 -> "Private";
            case 1 -> "Self-employed";
            case 2 -> "Government job";
            case 3 -> "Children";
            case 4 -> "Never worked";
            default -> "Unknown";
        };

        return format(STROKE_PROMPT_TEMPLATE,
                prediction.probability() * 100,
                prediction.hasDisease() ? "will have" : "will not have",
                request.age(),
                request.sex(),
                request.hypertension() == 1,
                request.heartDisease() == 1,
                workType,
                request.avgGlucoseLevel(),
                request.bmi()
        );
    }

    public static String createHabitsPromptFrom(HabitsPredictionRequest request, float wellnessScore) {
        return format(HABITS_PROMPT_TEMPLATE,
                request.waterIntakeGlasses(),
                request.sleepHours(),
                request.stepsPerDay(),
                request.exerciseMinutes(),
                request.screenTimeHours(),
                request.stressLevel(),
                request.fruitsVeggiesServings(),
                wellnessScore
        );
    }
}
