import { z } from "zod";
import { ValidationMessages } from "@/constants/quote/messages";

export const getQuoteSchema = z.object({
  id: z
    .string()
    .min(1, ValidationMessages.QUOTE_ID_REQUIRED)
    .uuid(ValidationMessages.QUOTE_ID_INVALID),
});

export type GetQuoteFormData = z.infer<typeof getQuoteSchema>;
