import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test('should load the dashboard and verify key elements', async ({ page }) => {
    // Navigate to the dashboard directly for now to test the main app logic
    await page.goto('/dashboard');

    // Check if the sidebar logo text is visible
    await expect(page.locator('text=AI Analyst').first()).toBeVisible({ timeout: 20000 });
    
    // Check if the main Dashboard header is visible
    await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();

    // Verify file uploader is present
    await expect(page.locator('text=Drag CSV file here')).toBeVisible();
  });
});
