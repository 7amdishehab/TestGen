'use client'

import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AuthUser } from '../types'
import { ROUTES } from '../constants/routes'
import { AuthContext } from './authCore'
import { authApi } from '../lib/apiClient'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        if (typeof window === 'undefined') return null
        const stored = localStorage.getItem('testgen_user')
        if (!stored) return null
        try {
            return JSON.parse(stored) as AuthUser
        } catch {
            return null
        }
    })
    const navigate = useNavigate()

    const login = useCallback((userData: AuthUser) => {
        localStorage.setItem('testgen_user', JSON.stringify(userData))
        localStorage.setItem('testgen_token', userData.token)
        document.cookie = `testgen_token=${userData.token}; path=/; SameSite=Lax`
        setUser(userData)
    }, [])

    const logout = useCallback(async () => {
        try {
            await authApi.logout()
        } finally {
            localStorage.removeItem('testgen_user')
            localStorage.removeItem('testgen_token')
            document.cookie =
                'testgen_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
            setUser(null)
            navigate(ROUTES.signIn)
        }
    }, [navigate])

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            isAuthenticated: !!user,
        }),
        [login, logout, user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
