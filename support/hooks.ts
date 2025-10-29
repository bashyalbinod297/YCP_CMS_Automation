// support/hooks.ts
import { Before, After, setDefaultTimeout, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60 seconds

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
}

Before(async function (this: CustomWorld) {
  // Default browser setup for all scenarios
  this.browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

// Tag-specific Before hook for login/forgot-password tests
Before({ tags: "@login" }, async function (this: CustomWorld) {
  // Navigate to login page only for @login scenarios
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });

  // Wait for login form to appear
  await this.page.waitForSelector('form', { state: 'visible', timeout: 30000 });
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.browser.close();
});
