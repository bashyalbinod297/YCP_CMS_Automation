import { Before, After, setDefaultTimeout, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60 seconds

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
}

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.browser.close();
});
