import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/hooks';

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
    // Adjust selector if needed for invalid email
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
