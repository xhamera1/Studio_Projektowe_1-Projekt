import { useMutation } from '@tanstack/react-query';
import type {
  ApiError,
  HeartAttackPredictionRequest,
  PredictionResponse
} from '../utils/types.ts';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useHeartAttackPrediction = () => {
  const { isUserAuthenticated, accessToken } = useApplicationContext();
  const { user } = useApplicationContext();

  return useMutation<
    PredictionResponse,
    ApiError,
    HeartAttackPredictionRequest
  >({
    mutationKey: ['heartAttackPrediction'],
    mutationFn: async (request: HeartAttackPredictionRequest) => {
      if (!isUserAuthenticated || !user) {
        throw new Error('User is not authenticated');
      }
      return healthPredictionService.predictHeartAttack(
        request,
        user.id,
        accessToken!.value
      );
    }
  });
};
