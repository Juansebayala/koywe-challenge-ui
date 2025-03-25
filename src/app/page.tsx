"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function HomePage() {
  return (
    <AuthGuard requireAuth={false}>
      <AuthLayout title="Welcome to Koywe Quotation App">
        <LoginForm />
      </AuthLayout>
    </AuthGuard>
  );
}
