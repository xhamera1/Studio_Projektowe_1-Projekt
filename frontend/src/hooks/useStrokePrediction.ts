import { useMutation } from '@tanstack/react-query';
import type { ApiError, PredictionResponse, StrokePredictionRequest } from '../utils/types.ts';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useStrokePrediction = () => {
  const { getTokenValue } = useAuthenticationContext();
  const { getUser } = useApplicationContext();

  return useMutation<PredictionResponse, ApiError, StrokePredictionRequest>({
    mutationKey: ['strokePrediction'],
    mutationFn: async (request: StrokePredictionRequest) => {
      const token = getTokenValue();
      const userId = getUser().id;
      return healthPredictionService.predictStroke(request, userId, token);
    }
  });
};
