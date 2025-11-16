import { useQuery } from '@tanstack/react-query';
import type { ApiError, PredictionHistoryResponse } from '../utils/types.ts';
import { useUserContext } from '../contexts/UserContextProvider.tsx';
import useAuthenticationContext from '../contexts/AuthenticationContextProvider.tsx';
import { predictionHistoryService } from '../services/predictionHistoryService.ts';

export const usePredictionHistory = () => {
  const { user } = useUserContext();
  const { isAuthenticated, token } = useAuthenticationContext();

  return useQuery<PredictionHistoryResponse, ApiError>({
    queryKey: ['predictionHistory'],
    queryFn: () => {
      if (!user || !isAuthenticated) {
        throw new Error('User is not authenticated');
      }
      return predictionHistoryService.getPredictionHistory(
        user.id,
        token!.value
      );
    },
    enabled: !!user && isAuthenticated
  });
};
