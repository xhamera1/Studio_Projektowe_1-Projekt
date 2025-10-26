/* COPILOT */

import { useEffect, useState, type ReactNode } from 'react'
import { setAuthToken } from '../services/api'
import { AuthContext } from './AuthContext.tsx'

/* This component provides auth state (token) and functions (login, logout) to the app.
   It reads a stored token on mount, sets the axios header, and exposes login/logout methods. */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const t = localStorage.getItem('token')
        if (t) {
            setToken(t)
            setAuthToken(t)
        }
    }, [])

    /* This function stores the token, updates state, and sets the axios header for future requests. */
    function login(newToken: string) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
        setAuthToken(newToken)
    }

    /* This function clears stored token, updates state, and removes the axios Authorization header. */
    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        setAuthToken(null)
    }

    return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}