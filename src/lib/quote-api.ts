import api from "./axios-config";
import { CreateQuoteRequest, Quote } from "@/types/quote";

export const quoteApi = {
  createQuote: async (data: CreateQuoteRequest): Promise<Quote> => {
    const { data: response } = await api.post<Quote>("/quote", data);
    return response;
  },
  getQuote: async (id: string): Promise<Quote> => {
    const { data: response } = await api.get<Quote>(`/quote/${id}`);
    return response;
  },
};
