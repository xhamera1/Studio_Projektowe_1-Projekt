from typing import List

from pydantic import BaseModel, Field


class BasePredictionRequest(BaseModel):
    class Config:
        extra = "allow"


class DiabetesPredictionRequest(BaseModel):
    hba1c_level: float
    blood_glucose_level: float
    bmi: float
    age: int
    smoking_history: int


class HeartAttackPredictionRequest(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    thalach: int
    oldpeak: float
    exang: int

class StrokePredictionRequest(BaseModel):
    age: int
    sex: int
    hypertension: int
    heart_disease: int
    work_type: int
    avg_glucose_level: int
    bmi: float


class PredictionResponse(BaseModel):
    prediction: int = Field(..., example=1, description="The predicted class label (0 or 1).")
    probability: float = Field(..., example=0.85, description="The probability of the positive class (1).")


class ModelInfo(BaseModel):
    model_id: str = Field(..., example="heart-attack", description="Unique identifier for the model.")
    description: str = Field(..., example="Model to predict heart attack risk.",
                             description="A brief description of the model's purpose.")
    required_features: List[str] = Field(..., example=["age", "sex", "cp", "..."],
                                         description="List of feature names the model expects as input.")
