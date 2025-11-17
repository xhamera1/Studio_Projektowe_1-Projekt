import { useMutation } from '@tanstack/react-query';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import type {
  ApiError,
  DiabetesPredictionRequest,
  PredictionResponse
} from '../utils/types.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useDiabetesPrediction = () => {
  const { isUserAuthenticated, accessToken } = useApplicationContext();
  const { user } = useApplicationContext();

  return useMutation<PredictionResponse, ApiError, DiabetesPredictionRequest>({
    mutationKey: ['diabetesPrediction'],
    mutationFn: async (request: DiabetesPredictionRequest) => {
      if (!isUserAuthenticated || !user) {
        throw new Error('User is not authenticated');
      }
      return healthPredictionService.predictDiabetes(
        request,
        user.id,
        accessToken!.value
      );
    }
  });
};
