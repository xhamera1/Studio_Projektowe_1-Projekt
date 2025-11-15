import { useMutation } from '@tanstack/react-query';
import type {
  ApiError,
  HeartAttackPredictionRequest,
  PredictionResponse
} from '../utils/types.ts';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/UserContextProvider.tsx';

export const useHeartAttackPrediction = () => {
  const { isAuthenticated, token } = useAuthenticationContext();
  const { user } = useApplicationContext();

  return useMutation<
    PredictionResponse,
    ApiError,
    HeartAttackPredictionRequest
  >({
    mutationKey: ['heartAttackPrediction'],
    mutationFn: async (request: HeartAttackPredictionRequest) => {
      if (!isAuthenticated || !user) {
        throw new Error('User is not authenticated');
      }
      return healthPredictionService.predictHeartAttack(
        request,
        user.id,
        token!.value
      );
    }
  });
};
