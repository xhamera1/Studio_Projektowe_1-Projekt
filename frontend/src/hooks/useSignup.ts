import { useNavigate } from "react-router-dom";
import { authenticationService } from "../services/authentificationService.ts";
import { useMutation } from "@tanstack/react-query";

export type SignupRequest = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, SignupRequest>({
    mutationKey: ["signup"],
    mutationFn: authenticationService.signup,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });
};