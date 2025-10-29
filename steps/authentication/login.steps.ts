// steps/authentication/login.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/hooks';
import { expect } from '@playwright/test';

Given('I navigate to the login page', async function (this: CustomWorld) {
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/');
});

When('I enter email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  await this.page.fill('input[name="email"]', email);
  await this.page.fill('input[name="password"]', password);
});

When('I click on Sign In without entering email and password', async function (this: CustomWorld) {
  await this.page.click('button[type="submit"]');
});

// New step for valid login button click
When('I click on Sign In button', async function (this: CustomWorld) {
  // Using stable CSS selector for Sign In
  await this.page.click('#root > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root.css-1q3h47q > div > div > form > div.MuiBox-root.css-wmz062 > button');
});

// New step to handle redirect to OTP
Then('I should be redirected to OTP verification screen', async function (this: CustomWorld) {
  await this.page.waitForURL('**/otp-verification', { timeout: 15000 });
  expect(this.page.url()).toContain('/otp-verification');
});
