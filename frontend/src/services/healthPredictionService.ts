import type {
  DiabetesPredictionRecord,
  DiabetesPredictionRequest,
  HeartAttackPredictionRecord,
  HeartAttackPredictionRequest,
  StrokePredictionRecord,
  StrokePredictionRequest
} from '../utils/types.ts';
import { ENDPOINTS } from '../config/api.ts';
import { handleResponse } from '../utils/functions.ts';

const postPrediction = async <T, D>(
  endpoint: string,
  request: T,
  userId: number,
  token: string
): Promise<D> => {
  return fetch(`${endpoint}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(request)
  }).then(handleResponse<D>);
};

export const healthPredictionService = {
  predictDiabetes: (
    request: DiabetesPredictionRequest,
    userId: number,
    token: string
  ): Promise<DiabetesPredictionRecord> =>
    postPrediction(`${ENDPOINTS.PREDICTIONS}/diabetes`, request, userId, token),

  predictStroke: (
    request: StrokePredictionRequest,
    userId: number,
    token: string
  ): Promise<StrokePredictionRecord> =>
    postPrediction(`${ENDPOINTS.PREDICTIONS}/stroke`, request, userId, token),

  predictHeartAttack: (
    request: HeartAttackPredictionRequest,
    userId: number,
    token: string
  ): Promise<HeartAttackPredictionRecord> =>
    postPrediction(
      `${ENDPOINTS.PREDICTIONS}/heart-attack`,
      request,
      userId,
      token
    )
};
