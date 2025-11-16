import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider.tsx';
import { useUserContext } from '../contexts/UserContextProvider.tsx';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { ApiError, LoginRequest, LoginResponse } from '../utils/types.ts';
import { authenticationService } from '../services/authenticationService.ts';

export const useLogin = () => {
  const { saveAuthentication } = useAuthenticationContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationKey: ['login'],
    mutationFn: authenticationService.login,
    onSuccess: response => {
      saveAuthentication(response.jwtToken);
      setUser(response.user);
      navigate('/');
    }
  });
};
