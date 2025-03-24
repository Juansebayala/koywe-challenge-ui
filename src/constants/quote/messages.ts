export enum ValidationMessages {
  AMOUNT_REQUIRED = "Amount is required",
  AMOUNT_INVALID = "Amount must be a positive number",
  FROM_REQUIRED = "Source currency is required",
  TO_REQUIRED = "Target currency is required",
}

export enum ErrorMessages {
  FAILED_TO_CREATE_QUOTE = "We couldn't create your quote at this moment. Please try again.",
  BAD_REQUEST = "Please check your quote information.",
  UNAUTHORIZED = "Your session has expired. Please sign in again.",
  GENERIC_ERROR = "Something went wrong. Please try again later.",
}
