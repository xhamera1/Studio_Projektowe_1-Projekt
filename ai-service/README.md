# Intelligent Health Prediction Service (FastAPI)

## Project Overview

A modular FastAPI service providing AI-based health risk predictions using multiple machine learning models loaded from pickle files. It supports dynamic endpoints for various diseases, starting with diabetes and heart attack, with a flexible architecture for easy expansion.

## Project Structure

The service is organized into several key directories and files:

* **`app/main.py`** : Initializes the FastAPI application, configures CORS middleware, and defines the API endpoint routes for listing models and making predictions.
* **`app/schemas.py`** : Contains Pydantic models that define the data schemas for request validation and response formatting, ensuring all API inputs and outputs are consistent and type-safe.
* **`app/services.py`** : Implements the core logic. The `PredictionModel` class manages individual ML models, while the `ModelService` class orchestrates loading and accessing all models, validating input data, and performing predictions.
* **`trained_models/`** : A directory where serialized machine learning models (`.pkl` files) are stored.

## Installation

To set up the service locally, follow these steps:

1. Create and activate a Python virtual environment to isolate dependencies.
2. Install the required packages from the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

## Running the Service

To run the service for local development, navigate to the project's root directory (`ai-service/`) in your terminal and execute the following command:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

* `--reload` enables hot-reloading, so the server restarts automatically after code changes.
* The server will start and listen on `http://localhost:8000`.

## API Endpoints

### List Available Models

Retrieves metadata about all currently loaded models, including their unique ID, a brief description, and the features they require for prediction.

* **URL** : `/api/v1/models`
* **Method** : `GET`

**Example Request:**

```text
GET http://localhost:8000/api/v1/models
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
  }
]
```

### Make a Prediction

Executes a prediction using a specified model and returns the resulting label and probability of the positive class.

* **URL** : `/api/v1/models/{model_id}/predict`
* **Method** : `POST`
* **Path Parameter** :
* `model_id` (string): The unique identifier of the model to use (e.g., `diabetes` or `heart-attack`).
* **Request Body** :
* A JSON object containing a `features` dictionary with key-value pairs matching the `required_features` of the selected model.

**Example Request (Diabetes):**

```text
POST http://localhost:8000/api/v1/models/diabetes/predict
Content-Type: application/json

{
  "features": {
    "hba1c_level": 6.6,
    "blood_glucose_level": 140,
    "bmi": 27.9,
    "age": 55,
    "smoking_history": 1
  }
}
```

**Example Response (Diabetes):**

```json
{
  "prediction": 0,
  "probability": 0.31066831967388353
}
```

**Example Request (Heart Attack):**

```text
POST http://localhost:8000/api/v1/models/heart-attack/predict
Content-Type: application/json

{
  "features": {
    "age": 63,
    "sex": 1,
    "cp": 3,
    "trestbps": 145,
    "chol": 233,
    "thalach": 150,
    "oldpeak": 2.3,
    "exang": 0
  }
}
```

**Example Response (Heart Attack):**

```json
{
  "prediction": 1,
  "probability": 0.63878598859147
}
```
