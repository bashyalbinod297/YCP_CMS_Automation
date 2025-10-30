import { Page } from '@playwright/test';

export class CustomWorld {
  public page: Page;

  constructor({ page }: { page: Page }) {
    this.page = page;
  }
}

export default CustomWorld;