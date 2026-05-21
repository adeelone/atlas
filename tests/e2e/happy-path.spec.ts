import { expect, test } from "@playwright/test";

test("chat plan happy path", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /build my trip/i }).click();
  await expect(page.getByText("Cities allocated")).toBeVisible();
  await expect(page.getByRole("button", { name: "ICS" })).toBeVisible();
});
