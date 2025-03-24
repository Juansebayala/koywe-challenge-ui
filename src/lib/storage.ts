import { TokenResponse } from "@/types/auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_ID_KEY = "user_id";
const USERNAME_KEY = "username";

export const storage = {
  saveToken: (tokenData: TokenResponse): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokenData.accessToken);
    if (tokenData.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, tokenData.refreshToken);
    }
    if (tokenData.id) {
      localStorage.setItem(USER_ID_KEY, tokenData.id);
    }
    if (tokenData.username) {
      localStorage.setItem(USERNAME_KEY, tokenData.username);
    }
  },

  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },
};
