import { z } from "zod";
import { Currency } from "@/types/quote";
import { ValidationMessages } from "@/constants/quote/messages";

export const quoteSchema = z.object({
  amount: z
    .string()
    .min(1, ValidationMessages.AMOUNT_REQUIRED)
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      ValidationMessages.AMOUNT_INVALID
    ),
  from: z.nativeEnum(Currency, {
    errorMap: () => ({ message: ValidationMessages.FROM_REQUIRED }),
  }),
  to: z.nativeEnum(Currency, {
    errorMap: () => ({ message: ValidationMessages.TO_REQUIRED }),
  }),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
