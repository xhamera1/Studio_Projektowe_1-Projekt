
# Intelligent Health Prediction Service (FastAPI)

## Project Overview

A modular FastAPI service providing AI-based health risk predictions using multiple machine learning models loaded from pickle files. It supports dynamic endpoints for various diseases, starting with diabetes, heart attack, and stroke, with a flexible architecture for easy expansion.

## Project Structure

The service is organized into several key directories and files:

- **app/main.py**: Initializes the FastAPI application, configures CORS middleware, and defines the API endpoint routes for listing models and making predictions.
- **app/schemas.py**: Contains Pydantic models that define the data schemas for request validation and response formatting, ensuring all API inputs and outputs are consistent and type-safe.
- **app/services.py**: Implements the core logic. The `PredictionModel` class manages individual ML models, while the `ModelService` class orchestrates loading and accessing all models, validating input data, and performing predictions.
- **trained_models/**: A directory where serialized machine learning models (.pkl files) are stored.

## Configuration

The service is configured using environment variables. For local development, you can create a `.env` file in the project root directory by copying the provided `.env.example` file.

Key configuration variables include:

- **ALLOWED_ORIGINS**: A comma-separated list of URLs that are allowed to make cross-origin requests (e.g., `"http://localhost:5173,http://localhost:8080"`).
- **APP_HOST**: The host address on which the server will run (defaults to `0.0.0.0`).
- **APP_PORT**: The port on which the server will listen (defaults to `5000`).
- **APP_RELOAD**: A boolean (`True` or `False`) to enable or disable hot-reloading (defaults to `False`).

## Installation

To set up the service locally, follow these steps:

1. Create and activate a Python virtual environment to isolate dependencies.
2. Install the required packages from the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file from the example to configure your local environment:

```bash
cp .env.example .env
```

## Running the Service

To run the service for local development, navigate to the project's root directory and execute the following command:

```bash
python run.py
```

The script uses `uvicorn` to run the application and enables hot-reloading, so the server restarts automatically after code changes.

The server will start and listen on the host and port specified in your `.env` file (e.g., `http://0.0.0.0:5000`).

## API Endpoints

### List Available Models

Retrieves metadata for all available prediction models, including their unique IDs, descriptions, and required features.

- **URL**: `/api/models`
- **Method**: `GET`
- **Success Response**: `200 OK` with an array of model information objects.

**Example Request:**

```bash
curl http://localhost:5000/api/models
```

**Example Response:**

```json
[
    {
        "model_id": "diabetes",
        "description": "A model to predict the risk of diabetes.",
        "required_features": [
            "hba1c_level",
            "blood_glucose_level",
            "bmi",
            "age",
            "smoking_history"
        ]
    },
    {
        "model_id": "heart-attack",
        "description": "A model to predict the risk of a heart attack.",
        "required_features": [
            "age",
            "sex",
            "cp",
            "trestbps",
            "chol",
            "thalach",
            "oldpeak",
            "exang"
        ]
    },
    {
        "model_id": "stroke",
        "description": "A model to predict the risk of stroke.",
        "required_features": [
            "age",
            "sex",
            "hypertension",
            "heart_disease",
            "work_type",
            "avg_glucose_level",
            "bmi"
        ]
    }
]
```

### Make a Prediction

The service provides dedicated endpoints for each type of health risk prediction.

#### Diabetes Prediction

- **URL**: `/api/models/diabetes/predict`
- **Method**: `POST`
- **Request Body**: A JSON object with the required features for the diabetes model.
- **Success Response**: `200 OK` with the prediction result and probability.

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/models/diabetes/predict \
-H "Content-Type: application/json" \
-d '{
      "hba1c_level": 6.6,
      "blood_glucose_level": 140,
      "bmi": 27.9,
      "age": 55,
      "smoking_history": 1
    }'
```

**Example Response:**

```json
{
  "prediction": 0,
  "probability": 0.31066831967388353
}
```

#### Heart Attack Prediction

- **URL**: `/api/models/heart-attack/predict`
- **Method**: `POST`
- **Request Body**: A JSON object with the required features for the heart attack model.
- **Success Response**: `200 OK` with the prediction result and probability.

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/models/heart-attack/predict \
-H "Content-Type: application/json" \
-d '{
      "age": 63,
      "sex": 1,
      "cp": 3,
      "trestbps": 145,
      "chol": 233,
      "thalach": 150,
      "oldpeak": 2.3,
      "exang": 0
    }'
```

**Example Response:**

```json
{
  "prediction": 1,
  "probability": 0.63878598859147
}
```

#### Stroke Prediction

- **URL**: `/api/models/stroke/predict`
- **Method**: `POST`
- **Request Body**: A JSON object with the required features for the stroke model.
- **Success Response**: `200 OK` with the prediction result and probability.

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/models/stroke/predict \
-H "Content-Type: application/json" \
-d '{
      "age": 67,
      "sex": 0,
      "hypertension": 2,
      "heart_disease": 1,
      "work_type": 3,
      "avg_glucose_level": 278,
      "bmi": 39.6
    }'
```

**Example Response:**

```json
{
  "prediction": 0,
  "probability": 0.028109999956546738
}
```
