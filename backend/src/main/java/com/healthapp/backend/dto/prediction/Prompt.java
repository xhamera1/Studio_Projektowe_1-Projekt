package com.healthapp.backend.dto.prediction;

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


    public static String createHeartAttackPromptFrom(HeartAttackPredictionRequest request, HealthPredictionServiceResponse prediction) {
        String chestPainType = switch (request.cp()) {
            case 1 -> "typical angina";
            case 2 -> "atypical angina";
            case 3 -> "non-anginal pain";
            case 4 -> "asymptomatic";
            default -> "unknown type";
        };

        return String.format(HEART_ATTACK_PROMPT_TEMPLATE,
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

        return String.format(DIABETES_PROMPT_TEMPLATE,
                prediction.probability() * 100,
                prediction.hasDisease() ? "has" : "does not have",
                request.hba1cLevel(),
                request.bloodGlucoseLevel(),
                request.bmi(),
                request.age(),
                smokingHistory
        );
    }
}
