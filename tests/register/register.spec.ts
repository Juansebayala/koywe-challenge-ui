import {
  ErrorMessages,
  ValidationMessages,
} from "@/constants/register/messages";
import { test, expect } from "@playwright/test";
import { mockResponses } from "./fixtures/responses";

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.IS_TEST_MODE = true;
    });
    await page.goto("/register");
  });

  test("should display register form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Create your account" })
    ).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create account" })
    ).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: "Create account" }).click();

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

  test("should show error for invalid password format", async ({ page }) => {
    await page.getByLabel("Password").fill("123456");
    await page.getByLabel("Email address").click();

    await expect(
      page.getByText(ValidationMessages.PASSWORD_PATTERN)
    ).toBeVisible();
  });

  test("should handle API error - User exists", async ({ page }) => {
    await page.route("**/auth/register", async (route) => {
      await route.fulfill(mockResponses.userExists);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("StrongP@ss123");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page.getByText(ErrorMessages.USER_EXISTS)).toBeVisible();
  });

  test("should handle API error - Bad Request", async ({ page }) => {
    await page.route("**/auth/register", async (route) => {
      await route.fulfill(mockResponses.badRequest);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("StrongP@ss123");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page.getByText(ErrorMessages.BAD_REQUEST)).toBeVisible();
  });

  test("should handle API error - Creation Error", async ({ page }) => {
    await page.route("**/auth/register", async (route) => {
      await route.fulfill(mockResponses.creationError);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("StrongP@ss123");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page.getByText(ErrorMessages.CREATION_ERROR)).toBeVisible();
  });

  test("should successfully register and redirect to dashboard", async ({
    page,
  }) => {
    await page.route("**/auth/register", async (route) => {
      await route.fulfill(mockResponses.success);
    });

    await page.getByLabel("Email address").fill("test@example.com");
    await page.getByLabel("Password").fill("StrongP@ss123");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL("/dashboard");
  });

  test("should redirect to dashboard if already authenticated", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("access_token", "fake-token");
      window.localStorage.setItem("refresh_token", "fake-refresh-token");
      window.localStorage.setItem("user_id", "35889");
      window.localStorage.setItem("username", "juan@example.com");
    });
    await page.goto("/register");

    await expect(page).toHaveURL("/dashboard");
  });
});
