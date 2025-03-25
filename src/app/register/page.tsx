"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function RegisterPage() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthLayout title="Create your account">
        <RegisterForm />
      </AuthLayout>
    </AuthGuard>
  );
}
