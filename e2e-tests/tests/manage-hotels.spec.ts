import test, { expect } from "playwright/test";
import path from "path"
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


test("should allow the user to add an hotel", async ({page}) => {

    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test Hotel city");
    await page.locator('[name="description"]').fill("Test Hotel description");
    await page.locator('[name="country"]').fill("Test Hotel country");
    await page.locator('[name="pricePerNight"]').fill("100");

    await page.selectOption('select[name="starRating"]', '3');

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("3");
    await page.locator('[name="childCount"]').fill("2");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "image1.jpg"),
        path.join(__dirname, "files", "image2.jpg"),
    ]);

    await page.getByRole("button", {name: "Save"}).click();
    // await expect(page.getByText("Hotel saved")).toBeVisible();

});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText('Magodo Brooks Home').first()).toBeVisible();
  await expect(page.getByText('Ikeja, Nigeria').first()).toBeVisible();
  await expect(page.getByText('Budget').first()).toBeVisible();
  await expect(page.getByText("$300000 per night").first()).toBeVisible();
  await expect(page.getByText("2 adults, 2 children").first()).toBeVisible();
  await expect(page.getByText("3 Star Ratings").first()).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details"}).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel"}).first()).toBeVisible();

});


test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole("link", { name: "View Details"}).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached"});

  await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel 1");
  await page.locator('[name="name"]').fill("Test Hotel 1 updated");

  await page.getByRole("button", {name: "Save"}).click();
  await expect(page.getByText("Hotel updated")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel 1 updated");
  await page.locator('[name="name"]').fill("Test Hotel 1");

  await page.getByRole("button", {name: "Save"}).click();

});