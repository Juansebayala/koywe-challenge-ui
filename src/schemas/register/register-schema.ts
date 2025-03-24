import { z } from "zod";

export enum RegisterValidationMessages {
  EMAIL_REQUIRED = "Email is required",
  EMAIL_INVALID = "Invalid email format",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_MIN_LENGTH = "Password must be at least 6 characters",
  PASSWORD_MAX_LENGTH = "Password must not exceed 50 characters",
  PASSWORD_PATTERN = "Password must contain uppercase, lowercase, number and special character",
}

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, RegisterValidationMessages.EMAIL_REQUIRED)
    .email(RegisterValidationMessages.EMAIL_INVALID),
  password: z
    .string()
    .min(1, RegisterValidationMessages.PASSWORD_REQUIRED)
    .min(6, RegisterValidationMessages.PASSWORD_MIN_LENGTH)
    .max(50, RegisterValidationMessages.PASSWORD_MAX_LENGTH)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      RegisterValidationMessages.PASSWORD_PATTERN
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
