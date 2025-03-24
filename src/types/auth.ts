export interface TokenResponse {
  id: string;
  username: string;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
