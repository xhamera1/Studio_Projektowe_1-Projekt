import { useQuery } from '@tanstack/react-query';
import type { ApiError, PredictionHistoryResponse } from '../utils/types.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import { predictionHistoryService } from '../services/predictionHistoryService.ts';

export const usePredictionHistory = () => {
  const { user } = useApplicationContext();
  const { isUserAuthenticated, accessToken } = useApplicationContext();

  return useQuery<PredictionHistoryResponse, ApiError>({
    queryKey: ['predictionHistory'],
    queryFn: () => {
      if (!user || !isUserAuthenticated) {
        throw new Error('User is not authenticated');
      }
      return predictionHistoryService.getPredictionHistory(
        user.id,
        accessToken!.value
      );
    },
    enabled: !!user && isUserAuthenticated
  });
};
