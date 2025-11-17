import { useMutation } from '@tanstack/react-query';
import type { ApiError, HeartAttackPredictionRecord, HeartAttackPredictionRequest } from '../utils/types.ts';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useHeartAttackPrediction = () => {
  const { isUserAuthenticated, accessToken } = useApplicationContext();
  const { user } = useApplicationContext();

  return useMutation<
    HeartAttackPredictionRecord,
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
