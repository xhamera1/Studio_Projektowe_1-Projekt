import api from './api'

/* This function calls the backend signup endpoint and returns the response body.
   It is used by a useMutation hook to register a new user. */
export async function registerUser(payload: { email: string; password: string }) {
    const resp = await api.post('/auth/signup', payload)
    return resp.data
}

/* This function calls the backend login endpoint and returns a normalized object
   containing the token (if found) and the full response body. It tries common token locations. */
export async function loginUser(payload: { email: string; password: string }) {
    const resp = await api.post('/auth/login', payload)
    const body = resp.data || {}
    let token: string | null = body.token || body.jwt || body.accessToken || body.authToken || null

    const authHeader = resp.headers && (resp.headers.authorization || resp.headers.Authorization)
    if (!token && authHeader && typeof authHeader === 'string') {
        token = authHeader.replace(/^Bearer\s+/i, '')
    }

    return { token, data: body }
}