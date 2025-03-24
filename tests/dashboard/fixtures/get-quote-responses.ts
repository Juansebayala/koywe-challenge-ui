export const getQuoteResponses = {
  success: {
    status: 200,
    json: {
      id: "bde35e35-3437-4e1e-93f2-b2c122fe6e4f",
      amount: 1000000,
      from: "ARS",
      to: "USDC",
      rate: 0.00075547467117843,
      convertedAmount: 755.47467117843,
      timestamp: "2024-03-24T14:54:36Z",
      expiresAt: "2024-03-24T14:59:36Z",
    },
  },
  notFound: {
    status: 404,
    json: {
      statusCode: 404,
      message: "Quote not found",
      error: "Not Found",
    },
  },
  expired: {
    status: 410,
    json: {
      statusCode: 410,
      message: "This quote has expired",
      error: "Gone",
    },
  },
  badRequest: {
    status: 400,
    json: {
      statusCode: 400,
      message: "Validation failed (uuid v4 is expected)",
      error: "Bad Request",
    },
  },
};
