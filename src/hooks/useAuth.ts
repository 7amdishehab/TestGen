import { STORAGE_KEYS } from "../constants/storageKeys";
import { getItem } from "../services/storage";

export type AuthState = {
  isAuthenticated: boolean;
};

export function useAuth(): AuthState {
  const token = getItem(STORAGE_KEYS.authToken);

  return {
    isAuthenticated: Boolean(token),
  };
}
