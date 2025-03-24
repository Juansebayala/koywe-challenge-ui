"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormData } from "@/schemas/quote/quote-schema";
import { useQuote } from "@/hooks/useQuote";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { Currency } from "@/types/quote";
import { FormSelect } from "@/components/ui/FormSelect";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { QuoteResult } from "./QuoteResult";

export function QuoteForm() {
  const { createQuote, isCreating, quote, error, errorMessage } = useQuote();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: QuoteFormData) => {
    createQuote({
      ...data,
      amount: Number(data.amount),
    });
  };

  return (
    <div className="space-y-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          <FormInput
            id="amount"
            label="Amount"
            type="number"
            placeholder="100"
            registration={register("amount")}
            error={errors.amount}
            data-testid="amount-input"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              id="from"
              label="From"
              registration={register("from")}
              error={errors.from}
              options={Object.values(Currency).map((currency) => ({
                value: currency,
                label: currency,
              }))}
              data-testid="from-select"
            />

            <FormSelect
              id="to"
              label="To"
              registration={register("to")}
              error={errors.to}
              options={Object.values(Currency).map((currency) => ({
                value: currency,
                label: currency,
              }))}
              data-testid="to-select"
            />
          </div>
        </div>

        {error && errorMessage && (
          <ErrorMessage message={errorMessage} data-testid="error-message" />
        )}

        <Button
          type="submit"
          disabled={isCreating}
          data-testid="create-quote-button"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isCreating ? "Creating quote..." : "Create quote"}
        </Button>
      </form>

      {quote && <QuoteResult quote={quote} />}
    </div>
  );
}
