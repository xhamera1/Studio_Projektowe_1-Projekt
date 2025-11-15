import { useMutation } from '@tanstack/react-query';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import type {
  ApiError,
  DiabetesPredictionRequest,
  PredictionResponse
} from '../utils/types.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useDiabetesPrediction = () => {
  const { getTokenValue } = useAuthenticationContext();
  const { getUser } = useApplicationContext();

  return useMutation<PredictionResponse, ApiError, DiabetesPredictionRequest>({
    mutationKey: ['diabetesPrediction'],
    mutationFn: async (request: DiabetesPredictionRequest) => {
      const token = getTokenValue();
      const userId = getUser().id;
      return healthPredictionService.predictDiabetes(request, userId, token);
    }
  });
};
