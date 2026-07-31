import { test, expect } from '@playwright/test';

test.describe('Routes Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/routes');
  });

  test('should display routes search', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h2')).toContainText('Routes');
    const fromInput = page.locator('.search-box').first().locator('.search-input');
    await expect(fromInput).toBeVisible();
    const toInput = page.locator('.search-box').nth(1).locator('.search-input');
    await expect(toInput).toBeVisible();
  });

  test('should filter routes by origin', async ({ page }) => {
    const fromInput = page.locator('.search-box').first().locator('.search-input');
    await fromInput.fill('ATL');
    await page.waitForTimeout(500);
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toBeVisible();
  });

  test('should filter routes by destination', async ({ page }) => {
    const toInput = page.locator('.search-box').nth(1).locator('.search-input');
    await toInput.fill('LAX');
    await page.waitForTimeout(500);
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toBeVisible();
  });

  test('should filter routes by both origin and destination', async ({ page }) => {
    const fromInput = page.locator('.search-box').first().locator('.search-input');
    const toInput = page.locator('.search-box').nth(1).locator('.search-input');
    await fromInput.fill('ATL');
    await toInput.fill('LAX');
    await page.waitForTimeout(500);
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toBeVisible();
  });

  test('should show no results for invalid search', async ({ page }) => {
    const fromInput = page.locator('.search-box').first().locator('.search-input');
    await fromInput.fill('XYZ123');
    await page.waitForTimeout(500);
    // Check for "0" in results count
    const resultsCount = page.locator('.results-count strong').first();
    await expect(resultsCount).toContainText('0');
  });

  test('should clear filters', async ({ page }) => {
    const fromInput = page.locator('.search-box').first().locator('.search-input');
    await fromInput.fill('ATL');
    await page.waitForTimeout(300);
    const clearBtn = page.locator('.clear-btn');
    await clearBtn.click();
    await expect(fromInput).toHaveValue('');
  });
});
