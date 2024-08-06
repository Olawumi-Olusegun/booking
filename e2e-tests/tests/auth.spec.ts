import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole("heading", { name: "Signin to your account!"})).toBeVisible();

  await page.locator("[name=email]").fill("olawumi.olusegun@gmail.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "SignIn"}).click();

  await expect(page.getByText("Signin successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out"})).toBeVisible();
});


test("should allow user to register", async ({page}) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 1000}@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In"}).click();
  await page.getByRole("link", { name: "Sign Up"}).click();

  await expect(page.getByRole("heading", {name: "Create an account!"})).toBeVisible();

  await page.locator("[name=firstName]").fill("Olawumi");
  await page.locator("[name=lastName]").fill("Olusegun");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", {name: "SignUp"}).click();

  await expect(page.getByText("Signup successful")).toBeVisible();

  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
})