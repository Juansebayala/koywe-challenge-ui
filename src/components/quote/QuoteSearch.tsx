"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getQuoteSchema,
  type GetQuoteFormData,
} from "@/schemas/quote/get-quote-schema";
import { useGetQuote } from "@/hooks/useGetQuote";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { QuoteResult } from "./QuoteResult";

export function QuoteSearch() {
  const { getQuote, isLoading, quote, error, errorMessage } = useGetQuote();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetQuoteFormData>({
    resolver: zodResolver(getQuoteSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: GetQuoteFormData) => {
    getQuote(data.id);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-medium text-gray-800">Search Quote</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter a quote ID to see its details
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          <FormInput
            id="quoteId"
            label="Quote ID"
            type="text"
            placeholder="123e4567-e89b-12d3-a456-426614174000"
            registration={register("id")}
            error={errors.id}
            data-testid="quote-id-input"
          />
        </div>

        {error && errorMessage && (
          <ErrorMessage message={errorMessage} data-testid="error-message" />
        )}

        <Button
          type="submit"
          disabled={isLoading}
          data-testid="search-quote-button"
          className="cursor-pointer"
        >
          {isLoading ? "Searching..." : "Search quote"}
        </Button>
      </form>

      {quote && <QuoteResult quote={quote} />}
    </div>
  );
}
