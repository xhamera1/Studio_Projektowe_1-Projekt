import type { UpdateUserRequest, User } from '../utils/types.ts';
import { ENDPOINTS } from '../config/api.ts';
import { handleResponse } from '../utils/functions.ts';

export const userService = {
  getUser: async (userId: number, token: string): Promise<User> => {
    return fetch(`${ENDPOINTS.USERS}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(handleResponse<User>);
  },
  updateUser: async (
    request: UpdateUserRequest,
    userId: number,
    token: string
  ): Promise<User> => {
    return fetch(`${ENDPOINTS.USERS}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    }).then(handleResponse<User>);
  },
  deleteUser: async (userId: number, token: string): Promise<void> => {
    const response = await fetch(`${ENDPOINTS.USERS}/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw await response.json();
    }
    return;
  }
};
