import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/hooks';
import { expect } from '@playwright/test';

// 🔹 Selectors
const forgotPasswordLinkSelector =
  '#root > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root.css-1q3h47q > div > div > form > div.css-l5c1s3 > div.css-dod3v8 > a';
const forgotPasswordFormSelector = 'form';
const emailInputSelector = 'input[name="email"]';
const continueButtonSelector = 'button[type="submit"]';
const toastMessageSelector = '.MuiSnackbar-root';

// 🔹 Step 1: Click Forgot Password link
Given('I click on Forgot Password link', async function (this: CustomWorld) {
  // Wait until the login page is fully loaded
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/');
  await this.page.waitForLoadState('networkidle');

  // Wait for forgot password link to appear
  await this.page.waitForSelector(forgotPasswordLinkSelector, {
    state: 'visible',
    timeout: 60000,
  });

  // Click the link
  await this.page.click(forgotPasswordLinkSelector);

  // Wait for forgot password form to load
  await this.page.waitForSelector(forgotPasswordFormSelector, {
    state: 'visible',
    timeout: 60000,
  });
});

// 🔹 Step 2: Enter forgot password email
When('I enter forgot password email {string}', async function (this: CustomWorld, email: string) {
  await this.page.waitForSelector(emailInputSelector, { state: 'visible', timeout: 30000 });
  await this.page.fill(emailInputSelector, email);
});

// 🔹 Step 3: Click Continue button
When('I click on Continue button', async function (this: CustomWorld) {
  await this.page.waitForSelector(continueButtonSelector, { state: 'visible', timeout: 30000 });
  await this.page.click(continueButtonSelector);
});

// 🔹 Step 4: Verify toast message (renamed to avoid conflicts)
Then('I should see forgot password toast message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const toast = await this.page.waitForSelector(toastMessageSelector, {
    state: 'visible',
    timeout: 60000,
  });
  const toastText = await toast.textContent();
  expect(toastText?.trim()).toContain(expectedMessage);
});

// 🔹 Step 5: Verify redirect to OTP/code verification page
Then('I should be redirected to code verification page', async function (this: CustomWorld) {
  await this.page.waitForSelector('input[name^="otp"]', { state: 'visible', timeout: 60000 });
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('verification'); // adjust based on your app URL
});
