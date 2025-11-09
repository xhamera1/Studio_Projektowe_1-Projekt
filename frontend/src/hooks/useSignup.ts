import {useNavigate} from "react-router-dom";
import {authenticationService} from "../services/authentificationService.ts";
import {useMutation} from "@tanstack/react-query";

export type SignupRequest = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const useSignup = ({onSuccess, onError}: {
  onSuccess?: (data: void, variables: SignupRequest, context: unknown) => void;
  onError?: (error: Error, variables: SignupRequest, context: unknown) => void;
} = {}) => {
  const navigate = useNavigate();

  return useMutation<void, Error, SignupRequest>({
    mutationKey: ["signup"],
    mutationFn: authenticationService.signup,
    onSuccess: (data, variables, context) => {
      navigate("/login");
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error("Signup failed:", error.message);
      if (onError) {
        onError(error, variables, context);
      }
    },
  });
};
