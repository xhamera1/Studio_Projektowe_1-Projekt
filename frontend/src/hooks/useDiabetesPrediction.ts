import { useMutation } from '@tanstack/react-query';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import type {
  ApiError,
  DiabetesPredictionRequest,
  PredictionResponse
} from '../utils/types.ts';
import { useUserContext } from '../contexts/UserContextProvider.tsx';

export const useDiabetesPrediction = () => {
  const { isAuthenticated, token } = useAuthenticationContext();
  const { user } = useUserContext();

  return useMutation<PredictionResponse, ApiError, DiabetesPredictionRequest>({
    mutationKey: ['diabetesPrediction'],
    mutationFn: async (request: DiabetesPredictionRequest) => {
      if (!isAuthenticated || !user) {
        throw new Error('User is not authenticated');
      }
      return healthPredictionService.predictDiabetes(
        request,
        user.id,
        token!.value
      );
    }
  });
};
