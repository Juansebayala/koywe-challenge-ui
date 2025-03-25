import { ErrorMessages, ValidationMessages } from "@/constants/quote/messages";
import { test, expect } from "@playwright/test";
import { createQuoteResponses } from "./fixtures/create-quote-responses";
import { getQuoteResponses } from "./fixtures/get-quote-responses";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("access_token", "fake-token");
      window.localStorage.setItem("refresh_token", "fake-refresh-token");
      window.localStorage.setItem("user_id", "35889");
      window.localStorage.setItem("username", "test@example.com");
      window.IS_TEST_MODE = true;
    });
    await page.goto("/dashboard");
  });

  test.describe("Create Quote Form", () => {
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
      await expect(
        page.getByText(ValidationMessages.TO_REQUIRED)
      ).toBeVisible();
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
        await route.fulfill(createQuoteResponses.unauthorized);
      });

      await page.getByTestId("amount-input").fill("100");
      await page.getByTestId("from-select").selectOption("BTC");
      await page.getByTestId("to-select").selectOption("ETH");
      await page.getByTestId("create-quote-button").click();

      await expect(page.getByText(ErrorMessages.UNAUTHORIZED)).toBeVisible();
    });

    test("should handle API error - Bad Request", async ({ page }) => {
      await page.route("**/quote", async (route) => {
        await route.fulfill(createQuoteResponses.badRequest);
      });

      await page.getByTestId("amount-input").fill("100");
      await page.getByTestId("from-select").selectOption("BTC");
      await page.getByTestId("to-select").selectOption("ETH");
      await page.getByTestId("create-quote-button").click();

      await expect(page.getByText(ErrorMessages.BAD_REQUEST)).toBeVisible();
    });

    test("should handle API error - Conflict", async ({ page }) => {
      await page.route("**/quote", async (route) => {
        await route.fulfill(createQuoteResponses.conflict);
      });

      await page.getByTestId("amount-input").fill("100");
      await page.getByTestId("from-select").selectOption("BTC");
      await page.getByTestId("to-select").selectOption("ETH");
      await page.getByTestId("create-quote-button").click();

      await expect(
        page.getByText(ErrorMessages.FAILED_TO_CREATE_QUOTE)
      ).toBeVisible();
    });

    test("should successfully create quote and display result", async ({
      page,
    }) => {
      await page.route("**/quote", async (route) => {
        await route.fulfill(createQuoteResponses.success);
      });

      await page.getByTestId("amount-input").fill("100");
      await page.getByTestId("from-select").selectOption("BTC");
      await page.getByTestId("to-select").selectOption("ETH");
      await page.getByTestId("create-quote-button").click();

      await expect(page.getByTestId("quote-result")).toBeVisible();
      await expect(page.getByTestId("rate-value")).toBeVisible();
      await expect(page.getByTestId("converted-amount")).toBeVisible();
      await expect(page.getByTestId("expires-at")).toBeVisible();

      const result = createQuoteResponses.success.json;
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

  test.describe("Search Quote Form", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByText("Search Quote").click();
    });

    test("should display search form", async ({ page }) => {
      await expect(
        page.getByRole("heading", { name: "Search Quote" })
      ).toBeVisible();
      await expect(page.getByTestId("quote-id-input")).toBeVisible();
      await expect(page.getByTestId("search-quote-button")).toBeVisible();
    });

    test("should show validation error for empty ID", async ({ page }) => {
      await page.getByTestId("search-quote-button").click();

      await expect(
        page.getByText(ValidationMessages.QUOTE_ID_REQUIRED)
      ).toBeVisible();
    });

    test("should show validation error for invalid UUID format", async ({
      page,
    }) => {
      await page.getByTestId("quote-id-input").fill("invalid-uuid");
      await page.getByTestId("search-quote-button").click();

      await expect(
        page.getByText(ValidationMessages.QUOTE_ID_INVALID)
      ).toBeVisible();
    });

    test("should handle API error - Not Found", async ({ page }) => {
      await page.route("**/quote/*", async (route) => {
        await route.fulfill(getQuoteResponses.notFound);
      });

      await page
        .getByTestId("quote-id-input")
        .fill("bde35e35-3437-4e1e-93f2-b2c122fe6e4f");
      await page.getByTestId("search-quote-button").click();

      await expect(page.getByText(ErrorMessages.QUOTE_NOT_FOUND)).toBeVisible();
    });

    test("should handle API error - Quote Expired", async ({ page }) => {
      await page.route("**/quote/*", async (route) => {
        await route.fulfill(getQuoteResponses.expired);
      });

      await page
        .getByTestId("quote-id-input")
        .fill("bde35e35-3437-4e1e-93f2-b2c122fe6e4f");
      await page.getByTestId("search-quote-button").click();

      await expect(page.getByText(ErrorMessages.QUOTE_EXPIRED)).toBeVisible();
    });

    test("should successfully fetch and display quote", async ({ page }) => {
      await page.route("**/quote/*", async (route) => {
        await route.fulfill(getQuoteResponses.success);
      });

      await page
        .getByTestId("quote-id-input")
        .fill("bde35e35-3437-4e1e-93f2-b2c122fe6e4f");
      await page.getByTestId("search-quote-button").click();

      await expect(page.getByTestId("quote-result")).toBeVisible();

      const result = getQuoteResponses.success.json;
      await expect(page.getByTestId("quote-id")).toHaveText(result.id);
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

    test("should copy quote ID to clipboard", async ({ page, context }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);

      await page.route("**/quote/*", async (route) => {
        await route.fulfill(getQuoteResponses.success);
      });

      await page
        .getByTestId("quote-id-input")
        .fill("bde35e35-3437-4e1e-93f2-b2c122fe6e4f");
      await page.getByTestId("search-quote-button").click();

      await expect(page.getByTestId("quote-result")).toBeVisible();

      await page.getByTestId("copy-id-button").click();
      await expect(page.getByTestId("copy-id-button-copied")).toBeVisible();
    });
  });

  test.describe("Logout", () => {
    test("should display logout button", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Sign out" })
      ).toBeVisible();
    });

    test("should redirect to login page after logout", async ({ page }) => {
      await page.getByRole("button", { name: "Sign out" }).click();

      await expect(page).toHaveURL("/login");

      const accessToken = await page.evaluate(() =>
        window.localStorage.getItem("access_token")
      );
      const refreshToken = await page.evaluate(() =>
        window.localStorage.getItem("refresh_token")
      );
      const userId = await page.evaluate(() =>
        window.localStorage.getItem("user_id")
      );
      const username = await page.evaluate(() =>
        window.localStorage.getItem("username")
      );

      expect(accessToken).toBeNull();
      expect(refreshToken).toBeNull();
      expect(userId).toBeNull();
      expect(username).toBeNull();
    });
  });
});
