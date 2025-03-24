import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthError } from "@/types/auth";
import { ErrorMessages } from "@/constants/quote/messages";
import { quoteApi } from "@/lib/quote-api";

interface QuoteError extends AuthError {
  message: string | string[];
}

export const useGetQuote = () => {
  const getQuoteMutation = useMutation({
    mutationFn: quoteApi.getQuote,
  });

  const getQuoteErrorMessage = () => {
    if (!getQuoteMutation.error) return null;

    const error = getQuoteMutation.error as AxiosError<QuoteError>;

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          return ErrorMessages.UNAUTHORIZED;
        case 404:
          return ErrorMessages.QUOTE_NOT_FOUND;
        case 409:
          return ErrorMessages.FAILED_TO_GET_QUOTE;
        case 410:
          return ErrorMessages.QUOTE_EXPIRED;
        case 400:
          return ErrorMessages.BAD_REQUEST;
        default:
          return ErrorMessages.GENERIC_ERROR;
      }
    }

    return ErrorMessages.GENERIC_ERROR;
  };

  return {
    getQuote: getQuoteMutation.mutate,
    isLoading: getQuoteMutation.isPending,
    quote: getQuoteMutation.data,
    error: getQuoteMutation.error,
    errorMessage: getQuoteErrorMessage(),
  };
};
