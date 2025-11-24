import { useNavigate } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService.ts';
import { useMutation } from '@tanstack/react-query';
import type { ApiError, SignupRequest } from '../utils/types.ts';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<void, ApiError, SignupRequest>({
    mutationKey: ['signup'],
    mutationFn: authenticationService.signup,
    onSuccess: () => {
      navigate('/login');
    }
  });
};
