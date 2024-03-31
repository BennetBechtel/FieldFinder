const { test, expect } = require("@playwright/test");

const UI_URL = "http://localhost:5173";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Anmelden" }).click();

  await expect(page.getByRole("heading", { name: "Anmelden" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("12345678");

  await page.getByRole("button", { name: "Anmelden" }).click();

  await expect(page.getByText("Anmeldung erfolgreich!")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meine Buchungen" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Abmelden" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Anmelden" }).click();
  await page.getByRole("link", { name: "Registrieren" }).click();
  await expect(
    page.getByRole("heading", { name: "Registrieren" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_firstName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("12345678");
  await page.getByRole("button", { name: "Registrieren" }).click();

  await expect(page.getByText("Registrierung erfolgreich!")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Meine Buchungen" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Abmelden" })).toBeVisible();
});
