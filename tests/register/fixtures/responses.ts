export const mockResponses = {
  success: {
    status: 201,
    json: {
      id: "123",
      username: "test@example.com",
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
    },
  },
  userExists: {
    status: 409,
    json: {
      statusCode: 409,
      message: "User already exists",
      error: "Conflict",
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
  creationError: {
    status: 409,
    json: {
      statusCode: 409,
      message: "Failed to create user",
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
