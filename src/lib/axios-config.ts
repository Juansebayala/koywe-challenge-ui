import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";
import { authApi } from "./api-client";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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
    const authHeader = storage.getAccessToken();
    if (authHeader && config.headers) {
      config.headers.Authorization = `Bearer ${authHeader}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = storage.getRefreshToken();

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await authApi.refreshToken(refreshToken);
        storage.saveToken(response);
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
