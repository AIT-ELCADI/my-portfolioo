import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:4173/';
const selector = process.argv[3] || '#projects';
const out = process.argv[4] || 'shot.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const el = await page.$(selector);
if (el) {
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  await el.screenshot({ path: out });
  console.log('OK', out);
} else {
  console.log('NOT FOUND', selector);
}
await browser.close();