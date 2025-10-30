import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/hooks';

//
// Login step (reusable)
//
When('I login with email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/');
  await this.page.fill('input[name="email"]', email);
  await this.page.fill('input[name="password"]', password);
  await this.page.click('button[type="submit"]');

  // Wait for dashboard or any successful login indicator
  await this.page.waitForURL('**/dashboard', { timeout: 10000 });
});

//
// Field validation errors
//
Then('I should see {string} error', async function (this: CustomWorld, errorMessage: string) {
  const emailError = this.page.locator('#standard-weight-helper-text-email-login');
  const passwordError = this.page.locator('#standard-weight-helper-text-password-login');

  if (errorMessage.includes('Email')) {
    await expect(emailError).toHaveText(errorMessage, { timeout: 10000 });
  } else if (errorMessage.includes('Password')) {
    await expect(passwordError).toHaveText(errorMessage, { timeout: 10000 });
  } else if (errorMessage.includes('valid email')) {
    const emailInvalid = this.page.locator('#standard-weight-helper-text-email-login');
    await expect(emailInvalid).toHaveText(errorMessage, { timeout: 10000 });
  } else if (errorMessage.includes('Invalid OTP')) {
    const otpError = this.page.locator('div.MuiAlert-message', { hasText: errorMessage });
    await expect(otpError).toBeVisible({ timeout: 10000 });
  } else {
    throw new Error(`Unknown field error: ${errorMessage}`);
  }
});

//
// Toast messages (Unauthorized, etc.)
//
Then('I should see toast message {string}', async function (this: CustomWorld, msg: string) {
  const toast = this.page.locator('div.MuiAlert-message', { hasText: msg }).first();
  await expect(toast).toBeVisible({ timeout: 10000 });
});
