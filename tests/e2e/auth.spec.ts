import { test, expect } from '@playwright/test'

test('sign in page loads', async ({ page }) => {
  await page.goto('/auth/signin')
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
})

test('sign up page loads', async ({ page }) => {
  await page.goto('/auth/signup')
  await expect(page.getByRole('heading', { name: /get started free/i })).toBeVisible()
})
