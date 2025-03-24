import { ErrorMessages, ValidationMessages } from "@/constants/login/messages";
import { test, expect } from "@playwright/test";
import { mockResponses } from "./fixtures/responses";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Welcome to Koywe Quotation App" })
    ).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByText(ValidationMessages.EMAIL_REQUIRED)
    ).toBeVisible();
    await expect(
      page.getByText(ValidationMessages.PASSWORD_REQUIRED)
    ).toBeVisible();
  });

  test("should show error for invalid email format", async ({ page }) => {
    await page.getByLabel("Email address").fill("invalid-email");
    await page.getByLabel("Password").click();

    await expect(
      page.getByText(ValidationMessages.EMAIL_INVALID)
    ).toBeVisible();
  });

  test("should show error for short password", async ({ page }) => {
    await page.getByLabel("Password").fill("12345");
    await page.getByLabel("Email address").click();

    await expect(
      page.getByText(ValidationMessages.PASSWORD_MIN_LENGTH)
    ).toBeVisible();
  });

  test("should handle API error - Invalid credentials", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill(mockResponses.invalidCredentials);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByText(ErrorMessages.INVALID_CREDENTIALS)
    ).toBeVisible();
  });

  test("should handle API error - Bad Request", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill(mockResponses.badRequest);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByText(ErrorMessages.BAD_REQUEST)).toBeVisible();
  });

  test("should handle API error - Generic error", async ({ page }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill(mockResponses.serverError);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page.getByText(ErrorMessages.GENERIC_ERROR)).toBeVisible();
  });

  test("should successfully login and redirect to dashboard", async ({
    page,
  }) => {
    await page.route("**/auth/login", async (route) => {
      await route.fulfill(mockResponses.success);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(page).toHaveURL("/dashboard");
  });
});
