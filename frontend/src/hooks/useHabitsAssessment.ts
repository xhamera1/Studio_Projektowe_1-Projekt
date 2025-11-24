import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  ApiError,
  HabitsAssessmentRecord,
  HabitsAssessmentRequest
} from '../utils/types.ts';
import { healthPredictionService } from '../services/healthPredictionService.ts';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';

export const useHabitsAssessment = () => {
  const { isUserAuthenticated, accessToken, user } = useApplicationContext();
  const queryClient = useQueryClient();

  return useMutation<HabitsAssessmentRecord, ApiError, HabitsAssessmentRequest>({
    mutationKey: ['habitsAssessment'],
    mutationFn: async (request: HabitsAssessmentRequest) => {
      if (!isUserAuthenticated || !user) {
        throw new Error('User is not authenticated');
      }
      return healthPredictionService.assessHabits(
        request,
        user.id,
        accessToken!.value
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['predictionHistory'] });
    }
  });
};

