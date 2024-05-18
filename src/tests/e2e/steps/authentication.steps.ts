import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page as page } from "../hooks";
import { getEnv } from "../../../../env.config";

getEnv();
// Scenario 1: User enters valid email and password

Given("I navigate to the login page", async function () {
  await page.goto(`${process.env.MAIN_SITE_URL}/authentications?action=sign-in`);
  const title = await page.title();
  expect(title).toBe("Authentications | Galley Cloud");
});

When("I enter the email as {string}", async function (email: string) {
  await page.fill('input[name="email"]', email);
  const emailValue = await page.$eval('input[name="email"]', (el: HTMLInputElement) => el.value);
  expect(emailValue).toBe(email);
});

When("I enter the password as {string}", async function (password: string) {
  await page.fill('input[name="password"]', password);
  const passwordValue = await page.$eval('input[name="password"]', (el: HTMLInputElement) => el.value);
  expect(passwordValue).toBe(password);
});

When("I press the sign in button", async function () {
  await page.click('button[type="submit"]');
  await page.waitForURL(`${process.env.MAIN_SITE_URL}/dashboard`);
});

Then("I should be redirected to the dashboard page", async function () {
  const title = await page.title();
  expect(title).toBe("Dashboard | Caterer's Galley Cloud");
});

// Scenario 2: User enters invalid email and password

Given("I am on the login page", async function () {
  await page.goto(`${process.env.MAIN_SITE_URL}/authentications?action=sign-in`);
  const title = await page.title();
  expect(title).toBe("Authentications | Galley Cloud");
});

When("I fill in email with {string}", async function (email: string) {
  await page.fill('input[name="email"]', email);
});

When("I fill in password with {string}", async function (password: string) {
  await page.fill('input[name="password"]', password);
});

When("I press sign in button", async function () {
  await page.click('button[type="submit"]');
});

Then("I should see {string}", async function (expectedMessage: string) {
  const errorMessageSelector = ".notistack-SnackbarContainer";
  await page.waitForSelector(errorMessageSelector, { state: "visible" });
  const errorMessage = await page.textContent(errorMessageSelector);
  expect(errorMessage).toContain(
    expectedMessage || "Authentication Required: To proceed, please log in or provide valid credentialsDismiss"
  );
});
