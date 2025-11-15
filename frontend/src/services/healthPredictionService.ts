import type {
  DiabetesPredictionRequest,
  HeartAttackPredictionRequest,
  PredictionResponse,
  StrokePredictionRequest
} from '../utils/types.ts';
import { ENDPOINTS } from '../config/api.ts';
import { handleResponse } from '../utils/functions.ts';

const postPrediction = async <T>(
  endpoint: string,
  request: T,
  userId: number,
  token: string
): Promise<PredictionResponse> => {
  return fetch(`${endpoint}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  }).then(handleResponse<PredictionResponse>);
};

export const healthPredictionService = {
  predictDiabetes: (
    request: DiabetesPredictionRequest,
    userId: number,
    token: string
  ): Promise<PredictionResponse> =>
    postPrediction(`${ENDPOINTS.PREDICTIONS}/diabetes`, request, userId, token),

  predictStroke: (
    request: StrokePredictionRequest,
    userId: number,
    token: string
  ): Promise<PredictionResponse> =>
    postPrediction(`${ENDPOINTS.PREDICTIONS}/stroke`, request, userId, token),

  predictHeartAttack: (
    request: HeartAttackPredictionRequest,
    userId: number,
    token: string
  ): Promise<PredictionResponse> =>
    postPrediction(
      `${ENDPOINTS.PREDICTIONS}/heart-attack`,
      request,
      userId,
      token
    )
};
