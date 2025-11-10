import { type ChangeEvent, type FormEvent, useState } from 'react';
import { type SignupRequest, useSignup } from './useSignup.ts';

export const useSignupForm = () => {
  const [credentials, setCredentials] = useState<SignupRequest>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { mutate: signup, isPending } = useSignup({
    onSuccess: () => {
      setSubmitError(null);
    },
    onError: error => {
      setSubmitError(error.message);
    }
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    };

    if (!credentials.username || credentials.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
      isValid = false;
    }

    if (!credentials.password || credentials.password.length < 11) {
      newErrors.password = 'Password must be at least 11 characters long.';
      isValid = false;
    }

    if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!credentials.firstName || /\d/.test(credentials.firstName)) {
      newErrors.firstName = 'Please enter a valid first name.';
      isValid = false;
    }

    if (!credentials.lastName || /\d/.test(credentials.lastName)) {
      newErrors.lastName = 'Please enter a valid last name.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev: SignupRequest) => ({ ...prev, [name]: value }));
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      signup(credentials);
    }
  };

  return {
    credentials,
    errors,
    isPending,
    submitError,
    handleChange,
    handleSubmit
  };
};
