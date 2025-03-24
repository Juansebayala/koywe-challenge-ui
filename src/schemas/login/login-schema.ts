import { ValidationMessages } from "@/constants/login/messages";
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, ValidationMessages.EMAIL_REQUIRED)
    .email(ValidationMessages.EMAIL_INVALID),
  password: z
    .string()
    .min(1, ValidationMessages.PASSWORD_REQUIRED)
    .min(6, ValidationMessages.PASSWORD_MIN_LENGTH),
});

export type LoginFormData = z.infer<typeof loginSchema>;
