/*

// support/hooks.ts
import { Before, After, setDefaultTimeout, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000); // 60 seconds

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
}

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await this.browser.newContext({
    javaScriptEnabled: true,
  });
  this.page = await context.newPage();
});

Before({ tags: "@login" }, async function (this: CustomWorld) {
  await this.page.goto('https://cmsdev.youchoosepetsandlivestock.com/', {
    waitUntil: 'networkidle',
    timeout: 60000,
  });

  await this.page.waitForSelector('#root', { state: 'attached', timeout: 30000 });
  await this.page.waitForSelector('form', { state: 'visible', timeout: 30000 });
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.browser.close();
});

*/


import { Before, After, setDefaultTimeout, IWorldOptions, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(60 * 1000);

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  // Add this
  public async getLatestOTP(): Promise<string[]> {
    // Return the OTP array, replace with dynamic retrieval if needed
    return ['1', '2', '3', '4'];
  }

  constructor(options: IWorldOptions) {
    super(options); // Important!
  }
}

// Launch browser
Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await this.browser.newContext({ javaScriptEnabled: true });
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  await this.page.close();
  await this.browser.close();
});

export default CustomWorld;
