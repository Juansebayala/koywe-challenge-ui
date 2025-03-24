import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthError } from "@/types/auth";
import { ErrorMessages } from "@/constants/quote/messages";
import { quoteApi } from "@/lib/quote-api";

interface QuoteError extends AuthError {
  message: string | string[];
}

export const useQuote = () => {
  const createQuoteMutation = useMutation({
    mutationFn: quoteApi.createQuote,
  });

  const getQuoteErrorMessage = () => {
    if (!createQuoteMutation.error) return null;

    const error = createQuoteMutation.error as AxiosError<QuoteError>;

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          return ErrorMessages.UNAUTHORIZED;
        case 409:
          return ErrorMessages.FAILED_TO_CREATE_QUOTE;
        case 400:
          return ErrorMessages.BAD_REQUEST;
        default:
          return ErrorMessages.GENERIC_ERROR;
      }
    }

    return ErrorMessages.GENERIC_ERROR;
  };

  return {
    createQuote: createQuoteMutation.mutate,
    isCreating: createQuoteMutation.isPending,
    quote: createQuoteMutation.data,
    error: createQuoteMutation.error,
    errorMessage: getQuoteErrorMessage(),
  };
};
