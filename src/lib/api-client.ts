import { LoginCredentials, TokenResponse } from "@/types/auth";
import api from "./axios-config";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
    const { data } = await api.post<TokenResponse>("/auth/login", credentials);
    return data;
  },
  refreshToken: async (token: string): Promise<TokenResponse> => {
    const { data } = await api.post<TokenResponse>("/auth/refresh", { token });
    return data;
  },
};
