import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { JwtToken, User } from "../utils/types.ts";
import { authenticationService } from "../services/authentificationService.ts";

export type LoginResponse = {
  jwtToken: JwtToken;
  user: User;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const { saveAuthentication } = useAuthenticationContext();
  const { setUser } = useApplicationContext();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: authenticationService.login,
    onSuccess: (response) => {
      saveAuthentication(response.jwtToken);
      setUser(response.user);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};