import { test, expect } from '@playwright/test';

test.describe('Airports Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/airports');
  });

  test('should display airport search and filters', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h2')).toContainText('Airport Explorer');
    await expect(page.locator('.search-input')).toBeVisible();
    await expect(page.locator('.filter-select')).toBeVisible();
  });

  test('should search for airports', async ({ page }) => {
    const searchInput = page.locator('.search-input');
    await searchInput.fill('ATL');
    await page.waitForTimeout(500);
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toBeVisible();
  });

  test('should filter by country', async ({ page }) => {
    await page.waitForTimeout(1000);
    const select = page.locator('.filter-select');
    const options = await select.locator('option').all();
    if (options.length > 1) {
      await select.selectOption({ index: 1 });
    }
    await page.waitForTimeout(500);
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toBeVisible();
  });

  test('should show no results for invalid search', async ({ page }) => {
    const searchInput = page.locator('.search-input');
    await searchInput.fill('XYZ123');
    await page.waitForTimeout(500);
    // Check for "0" in results count
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toContainText('0');
  });

  test('should clear filters', async ({ page }) => {
    const searchInput = page.locator('.search-input');
    await searchInput.fill('ATL');
    await page.waitForTimeout(300);
    const clearBtn = page.locator('.clear-btn');
    await clearBtn.click();
    await expect(searchInput).toHaveValue('');
  });
});
