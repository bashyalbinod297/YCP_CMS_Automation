import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/hooks';
import { expect } from '@playwright/test';

Given('I am on the OTP verification page after valid login', async function (this: CustomWorld) {
  // Ensure the user logs in first
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/');

  // Fill valid credentials
  await this.page.fill('input[name="email"]', 'bashyal.binod297@gmail.com');
  await this.page.fill('input[name="password"]', 'Aa1234567@');

  // Click Sign In using stable selector
  await this.page.click('#root > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root.css-1q3h47q > div > div > form > div.MuiBox-root.css-wmz062 > button');

  // Wait explicitly for OTP page to load using URL + unique element
  await this.page.waitForURL('**/otp-verification', { timeout: 20000 });
  await this.page.waitForSelector('div.MuiPaper-root form'); // OTP form container
});

When('I enter OTP {string}', async function (this: CustomWorld, otp: string) {
  const otpDigits = otp.split(''); // split 1234 -> ['1','2','3','4']

  for (let i = 0; i < otpDigits.length; i++) {
    const selector = `#root > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root.css-1pfqyh3 > div > div > form > div > div > div:nth-child(1) > div:nth-child(${i + 1}) > input[type=text]`;
    await this.page.fill(selector, otpDigits[i]);
  }
});

When('I click on {string} button', async function (this: CustomWorld, buttonName: string) {
  const selector = '#root > div > div > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root.css-1pfqyh3 > div > div > form > div > div > div.css-1kkk1uy > button';
  await this.page.click(selector);
});

Then('I should be redirected to dashboard', async function (this: CustomWorld) {
  await this.page.waitForURL('**/dashboard', { timeout: 20000 });
  expect(this.page.url()).toContain('/dashboard');
});
