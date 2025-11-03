from pydantic import BaseModel, Field
from typing import Any, Dict, List

class PredictionRequest(BaseModel):
    features: Dict[str, Any] = Field(..., example={"age": 55, "sex": 1, "cp": 2, "trestbps": 140, "chol": 240, "thalach": 150, "oldpeak": 1.2, "exang": 0})

class PredictionResponse(BaseModel):
    prediction: int = Field(..., example=1, description="The predicted class label (0 or 1).")
    probability: float = Field(..., example=0.85, description="The probability of the positive class (1).")

class ModelInfo(BaseModel):
    model_id: str = Field(..., example="heart-attack", description="Unique identifier for the model.")
    description: str = Field(..., example="Model to predict heart attack risk.", description="A brief description of the model's purpose.")
    required_features: List[str] = Field(..., example=["age", "sex", "cp", "..."], description="List of feature names the model expects as input.")
