"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/login/login-schema";
import { useAuth } from "@/hooks/useAuth";
import { FormInput } from "@/components/ui/FormInput";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const { login, isLoggingIn, loginError, loginErrorMessage } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-4">
        <FormInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          registration={register("username")}
          error={errors.username}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          registration={register("password")}
          error={errors.password}
        />
      </div>

      {loginError && loginErrorMessage && (
        <ErrorMessage message={loginErrorMessage} />
      )}

      <Button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
