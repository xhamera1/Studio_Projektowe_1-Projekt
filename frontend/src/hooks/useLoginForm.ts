import {type LoginRequest, useLogin} from "./useLogin.ts";
import {type ChangeEvent, type FormEvent, useState} from "react";

export const useLoginForm = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    mutate: login,
    isPending,
  } = useLogin({
    onSuccess: () => {
      setSubmitError(null);
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {username: "", password: ""};

    if (!credentials.username || credentials.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
      isValid = false;
    }

    if (!credentials.password || credentials.password.length < 11) {
      newErrors.password = "Password must be at least 11 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setCredentials((prev: LoginRequest) => ({...prev, [name]: value}));
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      login(credentials);
    }
  };

  return {
    credentials,
    errors,
    isPending,
    submitError,
    handleChange,
    handleSubmit,
  };
};
