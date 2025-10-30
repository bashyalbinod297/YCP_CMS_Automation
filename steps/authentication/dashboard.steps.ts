import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/hooks';
import { expect } from '@playwright/test';

// 🔹 Selectors
const emailInputSelector = 'input[name="email"]';
const passwordInputSelector = 'input[name="password"]';
const signInButtonSelector = 'button[type="submit"]';
const otpInputSelector = 'input[name^="otp"], input[name^="code"]';
const continueButtonSelector = 'button:has-text("Continue")';
const dashboardWelcomeSelector = '#root > div > main > h2'; // Your provided selector

// 🔹 Step 1: Login with valid credentials
Given('I log in with valid credentials', async function (this: CustomWorld) {
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/');
  await this.page.waitForLoadState('networkidle');

  await this.page.waitForSelector(emailInputSelector, { state: 'visible', timeout: 30000 });
  await this.page.fill(emailInputSelector, 'bashyal.binod297@gmail.com');
  await this.page.fill(passwordInputSelector, 'Aa1234567@');

  await this.page.click(signInButtonSelector);

  // Wait until OTP page appears
  await this.page.waitForSelector(otpInputSelector, { state: 'visible', timeout: 60000 });
});

// 🔹 Step 2: Enter valid OTP
When('I enter valid OTP', async function (this: CustomWorld) {
  const otpDigits = ['1', '2', '3', '4']; // adjust if needed
  const otpInputs = await this.page.$$(otpInputSelector);

  for (let i = 0; i < otpDigits.length && i < otpInputs.length; i++) {
    await otpInputs[i].fill(otpDigits[i]);
  }
});

// 🔹 Step 3: Click Continue after OTP
When('I click Continue after OTP', async function (this: CustomWorld) {
  await this.page.waitForSelector(continueButtonSelector, { state: 'visible', timeout: 30000 });
  await this.page.click(continueButtonSelector);
  await this.page.waitForLoadState('networkidle', { timeout: 60000 });
});

// 🔹 Step 4: Verify Dashboard Welcome text
Then('I should be redirected to the dashboard', async function (this: CustomWorld) {
  await this.page.waitForSelector(dashboardWelcomeSelector, { state: 'visible', timeout: 60000 });

  const welcomeText = await this.page.textContent(dashboardWelcomeSelector);
  console.log('✅ Dashboard Text:', welcomeText?.trim());

  expect(welcomeText?.trim()).toBe('Welcome');
});
