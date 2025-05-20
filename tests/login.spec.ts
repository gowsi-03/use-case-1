import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import assert from "assert/strict";

dotenv.config({ path: ".env.local" });

// Assert required environment variables
assert(process.env.EMAIL, "Missing CONTENTFUL_EMAIL");
assert(process.env.PASSWORD, "Missing CONTENTFUL_PASSWORD");

// Destructure after asserting
const { EMAIL, PASSWORD } = process.env;

test("Login contentful", async ({ page }) => {
  await page.goto("https://be.contentful.com/login");
  await page.waitForTimeout(3000);
  await page.locator('[data-test-id="email-input"]').click();
  await page.waitForTimeout(3000);
  await page.locator('[data-test-id="email-input"]').fill(EMAIL || "");
  await page.locator('[data-test-id="password-input"]').click();
  await page.locator('[data-test-id="password-input"]').fill(PASSWORD || "");
  await page.locator('[data-test-id="login-button"]').click();
  await page.waitForTimeout(3000);
  await page.waitForURL("https://app.contentful.com/spaces/7oe0gd5c4ilv/");
  expect(page.url()).toBe("https://app.contentful.com/spaces/7oe0gd5c4ilv/");
  // Close the page and browser after the test completes
  await page.close();
});
