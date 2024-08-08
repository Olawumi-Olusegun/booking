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
});

test("should show hotel detail", async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Search by city or country").fill("Ikeja");
  await page.getByRole("button", { name: "Search"}).click();

  await expect(page.getByText("Magodo Brooks Home").first()).toBeVisible();
  await expect(page).toHaveURL(/detail/);
  
  await expect(page.getByRole("button", {name: "Book now"})).toBeVisible();

});

test("should book hotel", async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Search by city or country").fill("Ikeja");

  const date = new Date();
  date.setDate(date.getDate() + 3);

  const formattedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search"}).click();

  await expect(page.getByText("Magodo Brooks Home").first()).toBeVisible();

  await page.getByRole("button", {name: "Book now"}).click();

  await expect(page.getByText("Total Cost: $300000.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("4242 4242 4242 4242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CSV"]').fill("234");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("23425");

  await page.getByRole("button", {name: "Confirm Booking"}).click();

  await expect(page.getByText("Booking Saved")).toBeVisible();

});