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
  ,
  /* Update user data. Sends a PUT to /api/users/{username} with the provided body and optional JWT. */
  updateUser: async (username: string, body: Partial<{ username:string; email:string; firstName:string; lastName:string }>, token?: string) => {
    const headers: Record<string,string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${ENDPOINTS.USERS}/${encodeURIComponent(username)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user ${username}: ${response.status}`);
    }

    return response.json();
  },

  /* Delete the given user. Calls DELETE /api/users/{username} and requires authorization. */
  deleteUser: async (username: string, token?: string) => {
    const headers: Record<string,string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${ENDPOINTS.USERS}/${encodeURIComponent(username)}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user ${username}: ${response.status}`);
    }

    return;
  }
};
export { API_BASE_URL };
