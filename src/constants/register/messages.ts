export enum ValidationMessages {
  EMAIL_REQUIRED = "Email is required",
  EMAIL_INVALID = "Invalid email format",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_MIN_LENGTH = "Password must be at least 6 characters",
  PASSWORD_MAX_LENGTH = "Password must not exceed 50 characters",
  PASSWORD_PATTERN = "Password must contain uppercase, lowercase, number and special character",
}

export enum ErrorMessages {
  USER_EXISTS = "This email is already registered. Please try logging in.",
  CREATION_ERROR = "Could not create account. Please try again later.",
  BAD_REQUEST = "Please check your information and try again.",
  GENERIC_ERROR = "We couldn't register you. Please try again later.",
}
