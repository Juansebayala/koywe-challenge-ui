"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteSearch } from "@/components/quote/QuoteSearch";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { QuoteTab } from "@/types/quote-tabs";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const [activeTab, setActiveTab] = useState<QuoteTab>(QuoteTab.CREATE);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <QuoteNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === QuoteTab.CREATE ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-medium text-gray-800">
                  Create Quote
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Enter the amount and select currencies to get a quote
                </p>
              </div>
              <QuoteForm />
            </>
          ) : (
            <QuoteSearch />
          )}
        </div>
      </div>
    </div>
  );
}
