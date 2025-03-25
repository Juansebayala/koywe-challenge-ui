"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = false }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/login");
    } else if (!requireAuth && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [router, isAuthenticated, requireAuth]);

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null;
  }

  return <>{children}</>;
}
