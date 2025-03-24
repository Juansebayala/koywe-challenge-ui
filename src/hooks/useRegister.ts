import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api-client";
import { RegisterFormData } from "@/schemas/register/register-schema";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { AxiosError } from "axios";
import { AuthError } from "@/types/auth";
import { ErrorMessages } from "@/constants/register/messages";

export const useRegister = () => {
  const router = useRouter();
  const { login } = useAuthContext();

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterFormData) =>
      authApi.register(credentials),
    onSuccess: (data) => {
      login(data);
      router.push("/dashboard");
    },
  });

  const getRegisterErrorMessage = () => {
    if (!registerMutation.error) return null;

    const error = registerMutation.error as AxiosError<AuthError>;

    if (error.response) {
      const status = error.response.status;

      if (status === 409) {
        const message = error.response.data.message;
        return message.includes("already exists")
          ? ErrorMessages.USER_EXISTS
          : ErrorMessages.CREATION_ERROR;
      }

      if (status === 400) {
        return ErrorMessages.BAD_REQUEST;
      }
    }

    return ErrorMessages.GENERIC_ERROR;
  };

  return {
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    registerErrorMessage: getRegisterErrorMessage(),
  };
};
