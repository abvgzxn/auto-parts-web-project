import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/lib/site-config";

test("футер: подтверждённый рейтинг, контакты, адаптивность и клавиатура", async ({ page }, testInfo) => {
  const yandexRequests: string[] = [];
  page.on("request", request => {
    if (/yandex|yastatic|ya\.ru/i.test(new URL(request.url()).hostname)) yandexRequests.push(request.url());
  });
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  const rating = footer.getByRole("region", { name: "Рейтинг на Яндекс Картах" });
  await expect(rating).toContainText("4,8");
  await expect(rating).toContainText("из 5");
  await expect(rating).toContainText("78 оценок");
  await expect(rating.locator('[aria-hidden="true"]').filter({ hasText: "★★★★★" })).toHaveCount(1);
  const reviews = rating.getByRole("link", { name: "Читать отзывы на Яндекс Картах", exact: true });
  await expect(reviews).toHaveAttribute("href", "https://yandex.ru/maps/org/velkar/1292103816/?ll=37.839843%2C57.236642&z=17");
  await expect(footer.getByRole("link", { name: "Wellcar", exact: true })).toHaveAttribute("href", "/");
  await expect(footer).toContainText(siteConfig.address.full);
  await expect(footer).toContainText("Автозапчасти и моторные масла в наличии и на заказ. Подбор запчастей по VIN.");
  await expect(footer).toContainText(`© ${new Date().getFullYear()} Wellcar. Все права защищены.`);
  for (const { days, hours } of siteConfig.workingHours) {
    await expect(footer).toContainText(days);
    await expect(footer).toContainText(hours);
  }
  for (const phone of siteConfig.phones) {
    await expect(footer.getByRole("link", { name: phone.label, exact: true })).toHaveAttribute("href", phone.href);
  }
  await expect(footer.getByRole("link", { name: siteConfig.email })).toHaveAttribute("href", `mailto:${siteConfig.email}`);
  await expect(footer.getByRole("link", { name: "Написать в MAX" })).toHaveAttribute("href", siteConfig.maxUrl);
  for (const link of await footer.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  const links = await footer.getByRole("link").all();
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await footer.scrollIntoViewIfNeeded();
    await expect(rating).toBeVisible();
    // Компактность важна и на самом узком экране: без высокой карточки.
    expect((await rating.boundingBox())!.height).toBeLessThanOrEqual(130);
    const score = rating.locator("p").first();
    const stars = rating.locator('[aria-hidden="true"]').filter({ hasText: "★★★★★" });
    const scoreBox = await score.boundingBox();
    const starsBox = await stars.boundingBox();
    expect(starsBox!.x).toBeGreaterThan(scoreBox!.x);
    expect(Math.abs(starsBox!.y + starsBox!.height / 2 - scoreBox!.y - scoreBox!.height / 2)).toBeLessThan(2);
    expect(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth)).toBeLessThanOrEqual(1);
    for (const link of links) {
      await expect(link).toHaveAccessibleName(/\S/);
      const box = await link.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }
    await links[0].focus();
    for (const link of links) {
      await expect(link).toBeFocused();
      expect(await link.evaluate(el => el.matches(":focus-visible") && parseFloat(getComputedStyle(el).outlineWidth) >= 2)).toBe(true);
      await page.keyboard.press("Tab");
    }
    if (width === 390 || width === 1440) {
      await page.evaluate(() => document.fonts.ready);
      await page.locator("footer img").evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())));
      const path = testInfo.outputPath(`footer-${width}.png`);
      await footer.screenshot({ path, style: "nextjs-portal { display: none !important; }" });
      await testInfo.attach(`footer-${width}`, { path, contentType: "image/png" });
    }
  }
  expect(yandexRequests).toEqual([]);
  await footer.getByRole("link", { name: "Наверх", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#top$/);
});
