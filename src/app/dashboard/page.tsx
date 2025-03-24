"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { QuoteForm } from "@/components/quote/QuoteForm";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-medium text-gray-800">Create Quote</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the amount and select currencies to get a quote
            </p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
