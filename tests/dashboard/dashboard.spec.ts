import { ErrorMessages, ValidationMessages } from "@/constants/quote/messages";
import { test, expect } from "@playwright/test";
import { mockResponses } from "./fixtures/responses";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("accessToken", "fake-token");
      window.IS_TEST_MODE = true;
    });
    await page.goto("/dashboard");
  });

  test("should display quote form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Create Quote" })
    ).toBeVisible();
    await expect(page.getByTestId("amount-input")).toBeVisible();
    await expect(page.getByTestId("from-select")).toBeVisible();
    await expect(page.getByTestId("to-select")).toBeVisible();
    await expect(page.getByTestId("create-quote-button")).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.getByTestId("create-quote-button").click();

    await expect(
      page.getByText(ValidationMessages.AMOUNT_REQUIRED)
    ).toBeVisible();
    await expect(
      page.getByText(ValidationMessages.FROM_REQUIRED)
    ).toBeVisible();
    await expect(page.getByText(ValidationMessages.TO_REQUIRED)).toBeVisible();
  });

  test("should show error for invalid amount", async ({ page }) => {
    await page.getByTestId("amount-input").fill("-100");
    await page.getByTestId("from-select").click();

    await expect(
      page.getByText(ValidationMessages.AMOUNT_INVALID)
    ).toBeVisible();
  });

  test("should handle API error - Unauthorized", async ({ page }) => {
    await page.route("**/quote", async (route) => {
      await route.fulfill(mockResponses.unauthorized);
    });

    await page.getByTestId("amount-input").fill("100");
    await page.getByTestId("from-select").selectOption("BTC");
    await page.getByTestId("to-select").selectOption("ETH");
    await page.getByTestId("create-quote-button").click();

    await expect(page.getByText(ErrorMessages.UNAUTHORIZED)).toBeVisible();
  });

  test("should handle API error - Bad Request", async ({ page }) => {
    await page.route("**/quote", async (route) => {
      await route.fulfill(mockResponses.badRequest);
    });

    await page.getByTestId("amount-input").fill("100");
    await page.getByTestId("from-select").selectOption("BTC");
    await page.getByTestId("to-select").selectOption("ETH");
    await page.getByTestId("create-quote-button").click();

    await expect(page.getByText(ErrorMessages.BAD_REQUEST)).toBeVisible();
  });

  test("should handle API error - Conflict", async ({ page }) => {
    await page.route("**/quote", async (route) => {
      await route.fulfill(mockResponses.conflict);
    });

    await page.getByTestId("amount-input").fill("100");
    await page.getByTestId("from-select").selectOption("BTC");
    await page.getByTestId("to-select").selectOption("ETH");
    await page.getByTestId("create-quote-button").click();

    await expect(
      page.getByText(ErrorMessages.FAILED_TO_CREATE_QUOTE)
    ).toBeVisible();
  });

  test("should handle API error - Generic error", async ({ page }) => {
    await page.route("**/quote", async (route) => {
      await route.fulfill(mockResponses.serverError);
    });

    await page.getByTestId("amount-input").fill("100");
    await page.getByTestId("from-select").selectOption("BTC");
    await page.getByTestId("to-select").selectOption("ETH");
    await page.getByTestId("create-quote-button").click();

    await expect(page.getByText(ErrorMessages.GENERIC_ERROR)).toBeVisible();
  });

  test("should successfully create quote and display result", async ({
    page,
  }) => {
    await page.route("**/quote", async (route) => {
      await route.fulfill(mockResponses.success);
    });

    await page.getByTestId("amount-input").fill("100");
    await page.getByTestId("from-select").selectOption("BTC");
    await page.getByTestId("to-select").selectOption("ETH");
    await page.getByTestId("create-quote-button").click();

    await expect(page.getByTestId("quote-result")).toBeVisible();
    await expect(page.getByTestId("rate-value")).toBeVisible();
    await expect(page.getByTestId("converted-amount")).toBeVisible();
    await expect(page.getByTestId("expires-at")).toBeVisible();

    const result = mockResponses.success.json;
    await expect(page.getByTestId("rate-value")).toHaveText(
      result.rate.toString()
    );
    await expect(page.getByTestId("converted-amount")).toHaveText(
      result.convertedAmount.toString()
    );
    await expect(page.getByTestId("expires-at")).toHaveText(
      new Date(result.expiresAt).toLocaleTimeString()
    );
  });
});
