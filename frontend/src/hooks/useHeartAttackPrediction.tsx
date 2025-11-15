import { useMutation } from '@tanstack/react-query';
import type {
  ApiError,
  HeartAttackPredictionRequest,
  PredictionResponse
} from '../utils/types.ts';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useHeartAttackPrediction = () => {
  const { getTokenValue } = useAuthenticationContext();
  const { getUser } = useApplicationContext();

  return useMutation<
    PredictionResponse,
    ApiError,
    HeartAttackPredictionRequest
  >({
    mutationKey: ['heartAttackPrediction'],
    mutationFn: async (request: HeartAttackPredictionRequest) => {
      const token = getTokenValue();
      const userId = getUser().id;
      return healthPredictionService.predictHeartAttack(request, userId, token);
    }
  });
};
