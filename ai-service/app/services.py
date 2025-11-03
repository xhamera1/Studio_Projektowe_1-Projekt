import joblib
import numpy as np
from pathlib import Path
from fastapi import HTTPException
from typing import Dict, Any, List, Tuple

from .schemas import PredictionRequest

class PredictionModel:
    def __init__(self, model_path: Path, required_features: List[str], description: str):
        if not model_path.exists():
            raise FileNotFoundError(f"Model file not found at: {model_path}")
        self.model = joblib.load(model_path)
        self.required_features = required_features
        self.description = description

    def _validate_payload(self, payload: Dict[str, Any]) -> List[float]:
        missing_features = [f for f in self.required_features if f not in payload]
        if missing_features:
            raise HTTPException(status_code=422, detail=f"Missing required features: {missing_features}")

        try:
            return [float(payload[f]) for f in self.required_features]
        except (ValueError, TypeError) as e:
            raise HTTPException(status_code=422, detail=f"Feature type conversion error: {e}")

    def predict(self, request: PredictionRequest) -> Tuple[int, float]:
        validated_features = self._validate_payload(request.features)
        
        try:
            X = np.array(validated_features).reshape(1, -1)
            label = int(self.model.predict(X)[0])
            proba = float(self.model.predict_proba(X)[0][1])
            return label, proba
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred during model inference: {e}")


class ModelService:

    def __init__(self):
        self._models: Dict[str, PredictionModel] = {}
        self._load_models()

    def _load_models(self):
        base_dir = Path(__file__).resolve().parent.parent
        models_dir = base_dir / "trained_models"

        model_configs = {
            "diabetes": {
                "path": models_dir / "diabetes-random_forest_model.pkl",
                "features": ["hba1c_level", "blood_glucose_level", "bmi", "age", "smoking_history"],
                "description": "A model to predict the risk of diabetes."
            },
            "heart-attack": {
                "path": models_dir / "heart_attack-ada_boost_model.pkl",
                "features": ["age", "sex", "cp", "trestbps", "chol", "thalach", "oldpeak", "exang"],
                "description": "A model to predict the risk of a heart attack."
            }
        }

        for model_id, config in model_configs.items():
            self._models[model_id] = PredictionModel(
                model_path=config["path"],
                required_features=config["features"],
                description=config["description"]
            )
            print(f"Successfully loaded model: {model_id}")

    def get_model(self, model_id: str) -> PredictionModel:
        model = self._models.get(model_id)
        if not model:
            raise HTTPException(status_code=404, detail=f"Model with ID '{model_id}' not found.")
        return model

    def list_models(self) -> List[Dict[str, Any]]:
        return [
            {
                "model_id": model_id,
                "description": model.description,
                "required_features": model.required_features
            }
            for model_id, model in self._models.items()
        ]

# jedna instancja do uzywania przez aplikacje
model_service = ModelService()
