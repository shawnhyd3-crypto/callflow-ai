import { test, expect } from '@playwright/test'

test('dashboard navigation works', async ({ page }) => {
  await page.goto('/dashboard/agents')
  await expect(page.getByRole('heading', { name: /ai agents/i })).toBeVisible()

  await page.getByRole('link', { name: 'Settings' }).click()
  await expect(page).toHaveURL(/\/dashboard\/settings/)
  await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible()
})
