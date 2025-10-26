import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
    baseURL: API_URL,
})

/* This function sets or clears the Authorization header on the shared axios instance.
   It stores "Bearer <token>" when token is given and removes the header when token is null. */
export function setAuthToken(token: string | null) {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete api.defaults.headers.common['Authorization']
}

export default api
