import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add gym", async ({ page }) => {
  await page.goto(`${UI_URL}/add-gym`);

  await page.locator('[name="name"]').fill("Test Gym");
  await page.locator('[name="zipCode"]').fill("Test Zip-Code");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="address"]').fill("Test Address");
  await page.locator('[name="pricePerHour"]').fill("11");

  await page.getByLabel("Basketball").check();
  await page.getByLabel("Volleyball").check();
  await page.getByLabel("Weichbodenmatte").check();
  await page.getByLabel("Trennwände").check();

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Speichern" }).click();

  await expect(page.getByText("Sporthalle gespeichert!")).toBeVisible();
});

test("should display gyms", async ({ page }) => {
  await page.goto(`${UI_URL}/my-gyms`);

  await expect(page.getByText("Meine Sporthallen")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Sporthalle Hinzufügen" })
  ).toBeVisible();

  await expect(page.getByText("Test Gym").first()).toBeVisible();
  await expect(page.getByText("Test Address").first()).toBeVisible();
  await expect(page.getByText("Test Zip-Code").first()).toBeVisible();
  await expect(page.getByText("Test City").first()).toBeVisible();
  await expect(page.getByText("€11 pro Stunde").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Bearbeiten" }).first()
  ).toBeVisible();
});
