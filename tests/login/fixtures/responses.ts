export const mockResponses = {
  success: {
    status: 200,
    json: {
      id: "123",
      username: "test@example.com",
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
    },
  },
  invalidCredentials: {
    status: 401,
    json: {
      statusCode: 401,
      message: "Invalid credentials",
      error: "Unauthorized",
    },
  },
  badRequest: {
    status: 400,
    json: {
      statusCode: 400,
      message: ["username must be an email"],
      error: "Bad Request",
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
