import { useQuery } from '@tanstack/react-query';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import { userDemographicsService } from '../services/userDemographicsService.ts';
import type { ApiError, UserDemographics } from '../utils/types.ts';

export const useUserDemographicsQuery = () => {
  const { user, accessToken, isUserAuthenticated } = useApplicationContext();

  return useQuery<UserDemographics | null, ApiError>({
    queryKey: ['userDemographics', user?.id],
    queryFn: async () => {
      if (!user || !accessToken || !isUserAuthenticated) {
        throw new Error('User not authenticated');
      }
      try {
        return await userDemographicsService.getUserDemographics(
          user.id,
          accessToken.value
        );
      } catch (err) {
        const apiError = err as ApiError;
        if (apiError?.status === 404) {
          return null;
        }
        throw err;
      }
    },
    enabled: !!user && !!accessToken && isUserAuthenticated
  });
};

