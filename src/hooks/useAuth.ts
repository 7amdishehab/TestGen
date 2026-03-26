import { STORAGE_KEYS } from '../constants/storageKeys'
import { getItem } from '../services/storage'

export type AuthState = {
    isAuthenticated: boolean
}

export function useAuth(): AuthState {
    const token = getItem(STORAGE_KEYS.authToken)
    const devBypass =
        import.meta.env.DEV &&
        (new URLSearchParams(window.location.search).get('devAuth') === '1' ||
            getItem('devAuth') === '1')

    return {
        isAuthenticated: Boolean(token) || devBypass,
    }
}
