import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api-client";
import { LoginFormData } from "@/schemas/login/login-schema";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth-service";
import { AxiosError } from "axios";
import { AuthError } from "@/types/auth";
import { ErrorMessages } from "@/constants/login/messages";

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormData) => authApi.login(credentials),
    onSuccess: (data) => {
      saveToken(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const getLoginErrorMessage = () => {
    if (!loginMutation.error) return null;

    const error = loginMutation.error as AxiosError<AuthError>;

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        return ErrorMessages.INVALID_CREDENTIALS;
      }

      if (status === 400) {
        return ErrorMessages.BAD_REQUEST;
      }
    }

    return ErrorMessages.GENERIC_ERROR;
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    loginErrorMessage: getLoginErrorMessage(),
  };
};
