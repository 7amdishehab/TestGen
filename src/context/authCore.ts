import { createContext } from 'react'
import type { AuthUser } from '../types'

export interface AuthContextType {
    user: AuthUser | null
    login: (user: AuthUser) => void
    logout: () => Promise<void>
    isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
)
