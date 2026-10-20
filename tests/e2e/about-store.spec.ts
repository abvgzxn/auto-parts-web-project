import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/lib/site-config";

test("магазин: адаптивность, целое фото и доступный маршрут", async ({ page }) => {
  await page.goto("/");
  const section = page.getByRole("region", { name: "Магазин автозапчастей ВЕЛКАР в Калязине", exact: true });
  const photo = section.getByRole("img");
  const route = section.getByRole("link", { name: "Построить маршрут", exact: true });
  await expect(section.locator("address")).toHaveText(`г. ${siteConfig.address.short}.`);
  await expect(route).toHaveAttribute("href", siteConfig.mapsUrl);
  await expect(route).toHaveAttribute("target", "_blank");
  await expect(route).toHaveAttribute("rel", "noopener noreferrer");
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await photo.scrollIntoViewIfNeeded();
    await expect.poll(() => photo.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true);
    const imageBox = (await photo.boundingBox())!;
    const headingBox = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
    expect(imageBox.width / imageBox.height).toBeCloseTo(4 / 3, 2);
    if (width < 768) expect(headingBox.y).toBeGreaterThanOrEqual(imageBox.y + imageBox.height);
    else expect(headingBox.x).toBeGreaterThanOrEqual(imageBox.x + imageBox.width);
    expect((await route.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
  await route.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(route).toBeFocused();
  expect(await route.evaluate(el => el.matches(":focus-visible") && parseFloat(getComputedStyle(el).outlineWidth) >= 2)).toBe(true);
  // Intercept only the external navigation: verify activation without depending on Yandex availability.
  await page.context().route(siteConfig.mapsUrl, route => route.fulfill({ body: "Map destination" }));
  const popupPromise = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(popup.url()).toBe(siteConfig.mapsUrl);
  await popup.close();
});
