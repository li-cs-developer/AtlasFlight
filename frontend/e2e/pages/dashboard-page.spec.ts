import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard stats', async ({ page }) => {
    // Use domcontentloaded instead of networkidle for Firefox
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000); // Extra wait for stats to render
    await expect(page.locator('.stat-number')).toHaveCount(4);
    await expect(page.locator('.stat-label').first()).toContainText('Airports');
    await expect(page.locator('.stat-label').nth(1)).toContainText('Airlines');
    await expect(page.locator('.stat-label').nth(2)).toContainText('Routes');
    await expect(page.locator('.stat-label').nth(3)).toContainText('Countries');
  });

  test('should display charts', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    await expect(page.locator('.chart-card')).toHaveCount(3);
    await expect(page.locator('.chart-card').first().locator('h3')).toContainText('Top Airlines');
  });

  test('should navigate to airports page via feature card', async ({ page }) => {
    const airportCard = page.locator('.feature-card').filter({ has: page.locator('.feature-icon:has-text("✈️")') });
    await airportCard.click();
    await expect(page).toHaveURL('/airports');
  });

  test('should navigate to airlines page via feature card', async ({ page }) => {
    const airlineCard = page.locator('.feature-card').filter({ has: page.locator('.feature-icon:has-text("🏢")') });
    await airlineCard.click();
    await expect(page).toHaveURL('/airlines');
  });

  test('should navigate to routes page via feature card', async ({ page }) => {
    const routesCard = page.locator('.feature-card').filter({ has: page.locator('.feature-icon:has-text("🗺️")') });
    await routesCard.click();
    await expect(page).toHaveURL('/routes');
  });

  test('should navigate to fleet page via feature card', async ({ page }) => {
    const fleetCard = page.locator('.feature-card').filter({ has: page.locator('.feature-icon:has-text("🛩️")') });
    await fleetCard.click();
    await expect(page).toHaveURL('/fleet');
  });

  test('should navigate to route finder page via feature card', async ({ page }) => {
    const routeFinderCard = page.locator('.feature-card').filter({ has: page.locator('.feature-icon:has-text("🔍")') });
    await routeFinderCard.click();
    await expect(page).toHaveURL('/route-finder');
  });
});
