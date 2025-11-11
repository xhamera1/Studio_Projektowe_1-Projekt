from typing import List

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from .config import origins
from .schemas import PredictionResponse, ModelInfo, DiabetesPredictionRequest, HeartAttackPredictionRequest, StrokePredictionRequest
from .services import model_service, ModelService

app = FastAPI(
    title="Intelligent Health Prediction System - AI Service",
    version="1.0.0",
    description="A scalable API for health risk predictions using machine learning models."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def get_model_service():
    return model_service


@app.get("/api/models", response_model=List[ModelInfo], tags=["Models"])
async def list_available_models(service: ModelService = Depends(get_model_service)):
    """
    Retrieve a list of all available prediction models.

    This endpoint provides metadata for each model, including its ID, a description,
    and the list of features it requires for prediction.
    """
    return service.list_models()


@app.post("/api/models/diabetes/predict", response_model=PredictionResponse, tags=["Predictions"])
async def predict_diabetes(
        request: DiabetesPredictionRequest,
        service: ModelService = Depends(get_model_service)
):
    """
    Perform a prediction for diabetes risk.
    """
    model = service.get_model("diabetes")
    label, proba = model.predict_from_dict(request.dict())
    return PredictionResponse(prediction=label, probability=proba)


@app.post("/api/models/heart-attack/predict", response_model=PredictionResponse, tags=["Predictions"])
async def predict_heart_attack(
        request: HeartAttackPredictionRequest,
        service: ModelService = Depends(get_model_service)
):
    """
    Perform a prediction for heart attack risk.
    """
    model = service.get_model("heart-attack")
    label, proba = model.predict_from_dict(request.dict())
    return PredictionResponse(prediction=label, probability=proba)


@app.post(path="/api/models/stroke/predict", response_model=PredictionResponse, tags=["Predictions"])
async def predict_stroke(
    request: StrokePredictionRequest,
    service: ModelService = Depends(get_model_service)
) -> PredictionResponse:
    model = service.get_model("stroke")
    label, proba = model.predict_from_dict(request.dict())
    return PredictionResponse(prediction=label, probability=proba)
