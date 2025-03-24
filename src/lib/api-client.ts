import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { LoginCredentials, TokenResponse } from "@/types/auth";
import { getAuthHeader, getRefreshToken, saveToken } from "./auth-service";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const authHeader = getAuthHeader();

    if (authHeader && config.headers) {
      config.headers.Authorization = authHeader;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (refreshToken) {
          const response = await api.post<TokenResponse>("/auth/refresh", {
            token: refreshToken,
          });

          saveToken(response.data);

          if (originalRequest.headers) {
            const newAuthHeader = getAuthHeader();
            if (newAuthHeader) {
              originalRequest.headers.Authorization = newAuthHeader;
            }
          }

          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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

export default api;
