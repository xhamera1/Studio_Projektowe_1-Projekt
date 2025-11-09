const DEFAULT_BASE = 'http://localhost:8080';

function getApiBaseUrl(): string {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (import.meta.env.PROD && !envUrl) {
    console.error('VITE_API_BASE_URL is not defined in production environment');
  }

  const baseUrl = envUrl || DEFAULT_BASE;

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export const API_BASE_URL = getApiBaseUrl();

export function apiUrl(path: string): string {
  if (!path) {
    throw new Error('API path cannot be empty');
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export const ENDPOINTS = {
  PREDICTIONS: apiUrl('/api/predictions'),
  USERS: apiUrl('/api/users'),
  LOGIN: apiUrl('/auth/login')
} as const;

export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  environment: import.meta.env.VITE_ENV || 'development'
} as const;
