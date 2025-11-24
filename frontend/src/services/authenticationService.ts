import { ENDPOINTS } from '../config/api.ts';
import { handleResponse } from '../utils/functions.ts';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest
} from '../utils/types.ts';

export const authenticationService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return fetch(`${ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(handleResponse<LoginResponse>);
  },

  signup: async (credentials: SignupRequest) => {
    return fetch(`${ENDPOINTS.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(handleResponse<void>);
  }
};
