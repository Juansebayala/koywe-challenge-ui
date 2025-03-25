"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/register/register-schema";
import { useRegister } from "@/hooks/useRegister";
import { FormInput } from "@/components/ui/FormInput";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function RegisterForm() {
  const {
    register: registerUser,
    isRegistering,
    registerError,
    registerErrorMessage,
  } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
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

      {registerError && registerErrorMessage && (
        <ErrorMessage message={registerErrorMessage} />
      )}

      <Button type="submit" disabled={isRegistering}>
        {isRegistering ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </p>
    </form>
  );
}
