import test, { expect } from "playwright/test";

const UI_URL = "http://localhost:5173"


test.beforeEach(async ({page}) => {

  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole("heading", { name: "Signin to your account!"})).toBeVisible();

  await page.locator("[name=email]").fill("olawumi.olusegun@gmail.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "SignIn"}).click();
  await expect(page.getByText("Signin successful")).toBeVisible();
});

test("should show hotel search results", async ({page}) => {

    await page.goto(UI_URL);

    await page.getByPlaceholder("Search by city or country").fill("Ikeja");
    await page.getByRole("button", { name: "Search"}).click();

    await expect(page.getByText("Magodo Brooks Home").first()).toBeVisible();
    await expect(page.getByText("Magodo Brooks Home Description")).toBeVisible();
})