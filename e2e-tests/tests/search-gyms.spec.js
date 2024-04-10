import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Anmelden" }).click();

  await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("12345678");

  await page.getByRole("button", { name: "Anmelden" }).click();

  await expect(page.getByText("Anmeldung erfolgreich!")).toBeVisible();
});

test("should show gym search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Suchen...").fill("Test Sporthalle");
  await page.getByRole("button", { name: "Suchen" }).click();

  await expect(page.getByText("Test Sporthalle").last()).toBeVisible();
  await expect(page.getByText("Test Address")).toBeVisible();
  await expect(page.getByText("Test Zip-Code")).toBeVisible();
  await expect(page.getByText("Test City")).toBeVisible();
  await expect(page.getByText("11€ pro Stunde")).toBeVisible();
});
