export enum ValidationMessages {
  EMAIL_REQUIRED = "Email is required",
  EMAIL_INVALID = "Invalid email format",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_MIN_LENGTH = "Password must be at least 6 characters",
}

export enum ErrorMessages {
  INVALID_CREDENTIALS = "Invalid email or password. Please try again.",
  BAD_REQUEST = "Please check your information and try again.",
  GENERIC_ERROR = "We couldn't sign you in. Please try again later.",
}
