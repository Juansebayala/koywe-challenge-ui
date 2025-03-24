import { TokenResponse } from "@/types/auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_ID_KEY = "user_id";
const USERNAME_KEY = "username";

export const saveToken = (tokenData: TokenResponse): void => {
  if (typeof window === "undefined") return;

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
};

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUserId = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(USER_ID_KEY);
};

export const getUsername = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(USERNAME_KEY);
};

export const clearTokens = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USERNAME_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const getAuthHeader = (): string | null => {
  const token = getAccessToken();

  if (!token) return null;

  return `Bearer ${token}`;
};
