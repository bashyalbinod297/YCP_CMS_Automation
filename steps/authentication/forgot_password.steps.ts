// steps/authentication/forgot_password.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/hooks';
import { expect } from '@playwright/test';

// Navigate to Forgot Password page
Given('I click on Forgot Password link', async function (this: CustomWorld) {
  // Wait until login form is visible first
  await this.page.waitForSelector('form', { state: 'visible', timeout: 30000 });

  // Wait until the link is visible, then click
  await this.page.waitForSelector('text=Forgot Password', { state: 'visible', timeout: 30000 });
  await this.page.click('text=Forgot Password');

  // Wait for navigation to forgot password page
  await this.page.waitForURL('**/forgot', { timeout: 30000 });
});

// Enter email for forgot password
When('I enter forgot password email {string}', async function (this: CustomWorld, email: string) {
  const emailInput = '#outlined-adornment-email-forgot';

  // Wait until input is visible
  await this.page.waitForSelector(emailInput, { state: 'visible', timeout: 10000 });

  // Clear any existing value
  await this.page.fill(emailInput, '');

  // Type the new email
  await this.page.fill(emailInput, email);
});

// Click Continue button
When('I click on Continue button', async function (this: CustomWorld) {
  // Wait until the button is visible and enabled
  await this.page.waitForSelector('button[type="submit"]:not([disabled])', { state: 'visible', timeout: 10000 });
  await this.page.click('button[type="submit"]');
});

// ✅ Toast messages are handled in common.steps.ts

// Redirect to code verification (valid email case)
Then('I should be redirected to code verification page', async function (this: CustomWorld) {
  await this.page.waitForURL('**/code-verification', { timeout: 30000 });
});
