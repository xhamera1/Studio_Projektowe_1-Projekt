import { ENDPOINTS } from '../config/api.ts';
import { handleResponse } from '../utils/functions.ts';
import type { PredictionHistoryResponse } from '../utils/types.ts';

export const predictionHistoryService = {
  getPredictionHistory: async (userId: number, token: string) => {
    return fetch(`${ENDPOINTS.PREDICTION_HISTORY}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(handleResponse<PredictionHistoryResponse>);
  }
};
