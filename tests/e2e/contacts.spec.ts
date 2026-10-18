import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/lib/site-config";

test("контакты: адаптивность, ссылки и клавиатура", async ({ page }) => {
  await page.goto("/");
  const contacts = page.locator("#contacts");
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(contacts).toContainText(siteConfig.address.full);
    for (const { days, hours } of siteConfig.workingHours) {
      await expect(contacts).toContainText(days);
      await expect(contacts).toContainText(hours);
    }
    for (const { href, label } of siteConfig.phones) {
      await expect(contacts.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
    }
    await expect(contacts.getByRole("link", { name: siteConfig.email })).toHaveAttribute("href", `mailto:${siteConfig.email}`);
    await expect(contacts.getByRole("link", { name: "Написать в MAX" })).toHaveAttribute("href", siteConfig.maxUrl);
    for (const link of await contacts.getByRole("link", { name: "Открыть в Яндекс Картах" }).all()) {
      await expect(link).toHaveAttribute("href", siteConfig.mapsUrl);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const controls = contacts.locator("a, button");
    for (const control of await controls.all()) {
      const box = await control.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    }
    const cards = contacts.locator(":scope > div.grid > div");
    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    if (width >= 1024) {
      expect(first!.y).toBe(second!.y);
      expect(first!.height).toBe(second!.height);
      expect(first!.width).toBeCloseTo(second!.width, 0);
    } else {
      expect(second!.y).toBeGreaterThanOrEqual(first!.y + first!.height);
    }
  }
  const controls = await contacts.locator("a, button").all();
  await controls[0].focus();
  for (const control of controls) {
    await expect(control).toBeFocused();
    expect(await control.evaluate(el => el.matches(":focus-visible") && parseFloat(getComputedStyle(el).outlineWidth) >= 2)).toBe(true);
    await page.keyboard.press("Tab");
  }
});

test("карта: сеть только после Enter, прежний URL и стабильная высота", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => {
    if (/yandex|yastatic|yandexcloud|ya\.ru/i.test(new URL(request.url()).hostname)) requests.push(request.url());
  });
  // Фиксируем ответ внешнего сервиса, чтобы тест не зависел от его доступности.
  await page.route("https://yandex.ru/map-widget/**", route => route.fulfill({
    contentType: "text/html; charset=utf-8", body: "<!doctype html><html lang='ru'><title>Карта</title><body>Карта загружена</body></html>",
  }));
  await page.goto("/");
  const contacts = page.locator("#contacts");
  const figure = contacts.locator("figure");
  const button = contacts.getByRole("button", { name: "Показать карту" });
  await button.scrollIntoViewIfNeeded();
  await expect(button).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(figure.locator("iframe")).toHaveCount(0);
  expect(requests).toEqual([]);
  const before = await figure.boundingBox();
  const footerBefore = await page.locator("footer").evaluate(el => el.getBoundingClientRect().top + scrollY);
  const pageUrl = page.url();
  await button.focus();
  await page.keyboard.press("Enter");
  const iframe = figure.locator("iframe");
  await expect(iframe).toBeVisible();
  const coordinates = `${siteConfig.coordinates.longitude},${siteConfig.coordinates.latitude}`;
  await expect(iframe).toHaveAttribute("src", `https://yandex.ru/map-widget/v1/?ll=${coordinates}&z=17&pt=${coordinates},pm2rdm&l=map&lang=ru_RU`);
  await expect(iframe).toHaveAttribute("title", `Магазин ${siteConfig.name}: ${siteConfig.address.full}`);
  await expect(iframe.contentFrame().locator("body")).toHaveText("Карта загружена");
  expect(requests).toHaveLength(1);
  expect(page.url()).toBe(pageUrl);
  expect((await figure.boundingBox())!.height).toBe(before!.height);
  expect(await page.locator("footer").evaluate(el => el.getBoundingClientRect().top + scrollY)).toBe(footerBefore);
});
