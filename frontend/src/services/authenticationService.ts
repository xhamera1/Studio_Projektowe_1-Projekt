import type { LoginRequest, LoginResponse } from '../hooks/useLogin.ts';
import { API_BASE_URL, ENDPOINTS } from '../config/api.ts';
import type { SignupRequest } from '../hooks/useSignup.ts';

export const authenticationService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Invalid username or password');
    }

    return response.json();
  },

  signup: async (credentials: SignupRequest): Promise<void> => {
    const response = await fetch(`${ENDPOINTS.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Failed to create account');
    }

    return response.json();
  },
  getUser: async (username: string, token?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${ENDPOINTS.USERS}/${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user ${username}: ${response.status}`);
    }

    return response.json();
  }
};
export { API_BASE_URL };
