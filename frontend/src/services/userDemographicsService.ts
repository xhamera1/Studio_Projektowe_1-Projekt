import type {
  UserDemographics,
  UserDemographicsRequest
} from '../utils/types.ts';
import { ENDPOINTS } from '../config/api.ts';
import { handleResponse } from '../utils/functions.ts';

export const userDemographicsService = {
  getUserDemographics: async (
    userId: number,
    token: string
  ): Promise<UserDemographics> => {
    return fetch(`${ENDPOINTS.USER_DEMOGRAPHICS}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(handleResponse<UserDemographics>);
  },
  updateUserDemographics: async (
    request: UserDemographicsRequest,
    userId: number,
    token: string
  ): Promise<UserDemographics> => {
    return fetch(`${ENDPOINTS.USER_DEMOGRAPHICS}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    }).then(handleResponse<UserDemographics>);
  },
  addUserDemographics: async (
    request: UserDemographicsRequest,
    userId: number,
    token: string
  ): Promise<UserDemographics> => {
    return fetch(`${ENDPOINTS.USER_DEMOGRAPHICS}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    }).then(handleResponse<UserDemographics>);
  }
};
