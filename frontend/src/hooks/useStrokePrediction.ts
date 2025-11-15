import { useMutation } from '@tanstack/react-query';
import type {
  ApiError,
  PredictionResponse,
  StrokePredictionRequest
} from '../utils/types.ts';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/UserContextProvider.tsx';

export const useStrokePrediction = () => {
  const { isAuthenticated, token } = useAuthenticationContext();
  const { user } = useApplicationContext();

  return useMutation<PredictionResponse, ApiError, StrokePredictionRequest>({
    mutationKey: ['strokePrediction'],
    mutationFn: async (request: StrokePredictionRequest) => {
      if (!isAuthenticated || !user) {
        throw new Error('User is not authenticated');
      }
      return healthPredictionService.predictStroke(
        request,
        user.id,
        token!.value
      );
    }
  });
};
