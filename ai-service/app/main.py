from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from .schemas import PredictionRequest, PredictionResponse, ModelInfo
from .services import model_service, ModelService

app = FastAPI(
    title="Intelligent Health Prediction System - AI Service",
    version="1.0.0",
    description="A scalable API for health risk predictions using machine learning models."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

def get_model_service():
    return model_service



@app.get("/api/v1/models", response_model=List[ModelInfo], tags=["Models"])
async def list_available_models(service: ModelService = Depends(get_model_service)):
    """
    Retrieve a list of all available prediction models.
    
    This endpoint provides metadata for each model, including its ID, a description,
    and the list of features it requires for prediction.
    """
    return service.list_models()

@app.post("/api/v1/models/{model_id}/predict", response_model=PredictionResponse, tags=["Predictions"])
async def predict(
    model_id: str, 
    request: PredictionRequest,
    service: ModelService = Depends(get_model_service)
):
    """
    Perform a prediction using a specified model.

    - **model_id**: The unique identifier for the model (e.g., 'diabetes', 'heart-attack').
    - **request body**: A JSON object containing a `features` dictionary with the data required by the model.
    """
    model = service.get_model(model_id)
    label, proba = model.predict(request)
    return PredictionResponse(prediction=label, probability=proba)
