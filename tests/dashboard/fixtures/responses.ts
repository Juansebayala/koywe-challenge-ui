export const mockResponses = {
  success: {
    status: 200,
    json: {
      id: "123",
      amount: 100,
      from: "BTC",
      to: "ETH",
      rate: 0.000025,
      convertedAmount: 0.0025,
      timestamp: "2024-03-24T11:00:00Z",
      expiresAt: "2024-03-24T12:00:00Z",
    },
  },
  unauthorized: {
    status: 401,
    json: {
      statusCode: 401,
      message: "Unauthorized",
      error: "Unauthorized",
    },
  },
  badRequest: {
    status: 400,
    json: {
      statusCode: 400,
      message: ["amount must be a positive number"],
      error: "Bad Request",
    },
  },
  conflict: {
    status: 409,
    json: {
      statusCode: 409,
      message: "Failed to create quote",
      error: "Conflict",
    },
  },
  serverError: {
    status: 500,
    json: {
      statusCode: 500,
      message: "Internal server error",
      error: "Server Error",
    },
  },
};
