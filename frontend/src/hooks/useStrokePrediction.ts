import { useMutation } from '@tanstack/react-query';
import type {
  ApiError,
  StrokePredictionRecord,
  StrokePredictionRequest
} from '../utils/types.ts';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useStrokePrediction = () => {
  const { isUserAuthenticated, accessToken } = useApplicationContext();
  const { user } = useApplicationContext();

  return useMutation<StrokePredictionRecord, ApiError, StrokePredictionRequest>(
    {
      mutationKey: ['strokePrediction'],
      mutationFn: async (request: StrokePredictionRequest) => {
        if (!isUserAuthenticated || !user) {
          throw new Error('User is not authenticated');
        }
        return healthPredictionService.predictStroke(
          request,
          user.id,
          accessToken!.value
        );
      }
    }
  );
};
