/* // support/helpers/otp.helper.ts
import { Page } from '@playwright/test';

export async function enterOTP(page: Page, otpCode: string = '1234') {
  const otpArray = otpCode.split('');

  // Select all OTP inputs (adjust selector if needed)
  const otpInputs = await page.$$('input[name^="otp"]');
  if (otpInputs.length !== 4) {
    throw new Error('OTP input fields not found or not 4 fields.');
  }

  for (let i = 0; i < 4; i++) {
    await otpInputs[i].fill(otpArray[i]);
  }

  // Submit OTP
  await page.click('button[type="submit"]');
}
*/