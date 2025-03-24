export enum ValidationMessages {
  AMOUNT_REQUIRED = "Amount is required",
  AMOUNT_INVALID = "Amount must be a positive number",
  FROM_REQUIRED = "Source currency is required",
  TO_REQUIRED = "Target currency is required",
  QUOTE_ID_REQUIRED = "Quote ID is required",
  QUOTE_ID_INVALID = "Invalid quote ID format",
}

export enum ErrorMessages {
  FAILED_TO_CREATE_QUOTE = "We couldn't create your quote at this moment. Please try again.",
  FAILED_TO_GET_QUOTE = "We couldn't retrieve your quote at this moment. Please try again.",
  QUOTE_NOT_FOUND = "Quote not found.",
  QUOTE_EXPIRED = "This quote has expired.",
  BAD_REQUEST = "Please check your quote information.",
  UNAUTHORIZED = "Your session has expired. Please sign in again.",
  GENERIC_ERROR = "Something went wrong. Please try again later.",
}
