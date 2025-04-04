"use client";

import { useState } from "react";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteSearch } from "@/components/quote/QuoteSearch";
import { QuoteNavigation } from "@/components/quote/QuoteNavigation";
import { QuoteTab } from "@/types/quote-tabs";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<QuoteTab>(QuoteTab.CREATE);

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto relative">
          <div className="absolute -top-8 right-0">
            <LogoutButton />
          </div>
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
    </AuthGuard>
  );
}
