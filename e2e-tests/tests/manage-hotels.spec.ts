import test, { expect } from "playwright/test";
import path from "path"
const UI_URL = "http://localhost:5173"


test.beforeEach("It should allow user to signin", async ({page}) => {

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
    await expect(page.getByText("Hotel saved")).toBeVisible();

});