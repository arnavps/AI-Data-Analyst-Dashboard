import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test('should load the dashboard and verify key elements', async ({ page }) => {
    await page.goto('/');

    // Check if the file upload section is visible initially (assuming that's the landing state)
    // For this mock, if the dashboard view loads directly, we verify it.
    // Wait for the main grid or header to be visible
    await expect(page.locator('text=AI Data Analyst Dashboard').first()).toBeVisible({ timeout: 10000 });
  });
});
