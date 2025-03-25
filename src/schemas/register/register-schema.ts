import { ValidationMessages } from "@/constants/register/messages";
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, ValidationMessages.EMAIL_REQUIRED)
    .email(ValidationMessages.EMAIL_INVALID),
  password: z
    .string()
    .min(1, ValidationMessages.PASSWORD_REQUIRED)
    .min(6, ValidationMessages.PASSWORD_MIN_LENGTH)
    .max(50, ValidationMessages.PASSWORD_MAX_LENGTH)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      ValidationMessages.PASSWORD_PATTERN
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
