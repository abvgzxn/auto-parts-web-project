import { expect, test } from "@playwright/test";
import { siteConfig } from "../../src/lib/site-config";

const navigation = [
  ["Ассортимент", "assortment"],
  ["Масла", "oils"],
  ["Подбор", "selection"],
  ["О магазине", "about"],
  ["Контакты", "contacts"],
] as const;

test.beforeEach(async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
});

test("главная страница и основные секции", async ({ page }) => {
  await expect(page).toHaveTitle(/Wellcar/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Автозапчасти и моторные масла в наличии и на заказ",
  );
  for (const [id, title] of [
    ["benefits-title", "Почему выбирают Wellcar"],
    ["categories-title", "Ассортимент Wellcar"],
    ["oils-title", "Большой выбор моторных масел"],
    ["selection-title", "Не знаете артикул? Подберём по VIN"],
    ["about-title", "Магазин автозапчастей Wellcar в Калязине"],
    ["contacts-title", "Контакты Wellcar"],
  ]) {
    await expect(page.getByRole("region", { name: title, exact: true })).toBeVisible();
    await expect(page.locator(`#${id}`)).toHaveText(title);
  }
});

test("навигация ведёт к секциям", async ({ page, isMobile }) => {
  const nav = page.getByRole("navigation", {
    name: isMobile ? "Мобильная навигация" : "Основная навигация",
    exact: true,
  });

  const menu = page.locator("header summary");

  for (const [label, id] of navigation) {
    if (isMobile) {
      await menu.click();
    }

    await expect(nav).toBeVisible();

    await nav.getByRole("link", {
      name: label,
      exact: true,
    }).click();

    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    if (isMobile) {
      await expect(nav).toBeHidden();
    }
  }
});

test("мобильное меню открывается и закрывается", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Проверяется в мобильном профиле");
  const menu = page.locator("header summary");
  const nav = page.getByRole("navigation", { name: "Мобильная навигация" });
  await expect(nav).toBeHidden();
  await menu.click();
  await expect(nav).toBeVisible();
  await expect(page.locator("header details")).toHaveAttribute("open", "");
  await menu.click();
  await expect(nav).toBeHidden();
});

test("мобильное меню закрывается после выбора раздела", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Проверяется в мобильном профиле");

  const menu = page.locator("header summary");
  const details = page.locator("header details");
  const nav = page.getByRole("navigation", {
    name: "Мобильная навигация",
  });

  await menu.click();
  await expect(nav).toBeVisible();

  await nav.getByRole("link", {
    name: "Контакты",
    exact: true,
  }).click();

  await expect(page).toHaveURL(/#contacts$/);
  await expect(details).not.toHaveAttribute("open", "");
  await expect(nav).toBeHidden();
});

test("ссылки MAX и оба телефона", async ({ page }) => {
  // Проверяем публичные ссылки, не открывая мессенджер или приложение звонков.
  const maxLinks = page.locator('a[href^="https://max.ru/"]');
  await expect(maxLinks).toHaveCount(7);
  for (const link of await maxLinks.all()) {
    await expect(link).toHaveAttribute("href", siteConfig.maxUrl);
    if (!(await link.isVisible())) continue;
    await expect(link).toHaveAccessibleName(/MAX/);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const icon = link.locator('img[src="/images/logo/max.svg"]');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("alt", "");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await icon.scrollIntoViewIfNeeded();
    await expect.poll(() => icon.evaluate((element) => {
      const image = element as HTMLImageElement;
      return image.complete && image.naturalWidth > 0;
    })).toBe(true);
    const bounds = await link.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);

    // Возвращаемся на ссылку клавиатурой, чтобы проверить именно focus-visible.
    await link.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(link).toBeFocused();
    expect(await link.evaluate((element) => element.matches(":focus-visible"))).toBe(true);
    const outline = await link.evaluate((element) => {
      const style = getComputedStyle(element);
      return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
    });
    expect(outline.width).toBeGreaterThanOrEqual(2);
    expect(outline.style).toBe("solid");
  }
  for (const container of ["#contacts", "footer"]) {
    await expect(page.locator(`${container} a[href="mailto:${siteConfig.email}"]`)).toBeVisible();
    for (const phone of siteConfig.phones) {
      await expect(page.locator(`${container} a[href="${phone.href}"]`)).toBeVisible();
    }
  }
  const mapLinks = page.locator("#contacts, footer").getByRole("link", { name: "Открыть в Яндекс Картах" });
  await expect(mapLinks).toHaveCount(2);
  for (const link of await mapLinks.all()) {
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", siteConfig.mapsUrl);
  }
  for (const phone of ["tel:+79001155502", "tel:+79157315254"]) {
    await expect(page.locator(`#contacts a[href="${phone}"]`)).toBeVisible();
    await expect(page.locator(`#selection a[href="${phone}"]`)).toBeVisible();
  }
  await page.getByRole("region", {
    name: "Автозапчасти и моторные масла в наличии и на заказ",
  }).getByRole("link", { name: "Телефоны магазина" }).click();
  await expect(page).toHaveURL(/#contacts$/);
  await expect(page.locator("#contacts")).toBeInViewport();
});

test("шапка на всех контрольных ширинах", async ({ page }, testInfo) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const header = page.locator("header");
    const summary = header.locator("summary");
    const desktop = width >= 1280;
    await expect(header.getByRole("navigation", { name: "Основная навигация", exact: true })).toBeVisible({ visible: desktop });
    await expect(summary).toBeVisible({ visible: !desktop });
    await expect(header.getByRole("link", { name: /Позвонить в Wellcar/ })).toHaveAttribute("href", siteConfig.phones[0].href);
    const max = header.getByRole("link", { name: desktop ? "Написать в MAX" : "MAX", exact: true });
    await expect(max).toBeVisible();
    await expect(max.locator('img[src="/images/logo/max.svg"]')).toBeVisible();
    for (const open of desktop ? [false] : [false, true]) {
      if (open) await summary.click();
      await expect.poll(() => page.evaluate(() =>
        Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth
      )).toBeLessThanOrEqual(1);
      const controls = [header.locator(".header-logo"), header.locator(".header-phone"), max, ...(desktop ? [] : [summary])];
      const bounds = [];
      for (const control of controls) {
        const box = await control.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        bounds.push(box!);
      }
      for (let i = 1; i < bounds.length; i++) {
        expect(bounds[i].x).toBeGreaterThanOrEqual(bounds[i - 1].x + bounds[i - 1].width);
      }
      if (open) {
        const panel = header.locator(".header-menu-panel");
        await expect(panel).toContainText(siteConfig.address.full);
        for (const { days, hours } of siteConfig.workingHours) await expect(panel).toContainText(`${days} ${hours}`);
        for (const phone of siteConfig.phones) await expect(panel.locator(`a[href="${phone.href}"]`)).toBeVisible();
        await expect(panel.getByRole("link", { name: "Открыть в Яндекс Картах" })).toHaveAttribute("href", siteConfig.mapsUrl);
        await summary.click();
      }
    }
    if (desktop) {
      for (const [label, id] of navigation) await expect(header.getByRole("navigation", { name: "Основная навигация", exact: true }).getByRole("link", { name: label, exact: true })).toHaveAttribute("href", `#${id}`);
      await expect(header.locator(".header-info")).toContainText(siteConfig.address.short);
      await expect(header.locator(".header-info a")).toHaveAttribute("href", siteConfig.mapsUrl);
    }
    if (width === 390 || width === 1440) {
      await page.evaluate(() => document.fonts.ready);
      const logo = header.locator(".header-logo img");
      await expect.poll(() => logo.evaluate((el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true);
      const path = testInfo.outputPath(`header-${width}.png`);
      await header.screenshot({ path });
      await testInfo.attach(`header-${width}`, { path, contentType: "image/png" });
      if (width === 390) {
        await summary.click();
        const menuPath = testInfo.outputPath("header-390-open.png");
        await header.screenshot({ path: menuPath });
        await testInfo.attach("header-390-open", { path: menuPath, contentType: "image/png" });
        await summary.click();
      }
    }
  }
});

test("клавиатура: действия шапки и нативное мобильное меню", async ({ page, isMobile }) => {
  const header = page.locator("header");
  const logo = header.locator(".header-logo");
  await logo.focus();
  await page.keyboard.press("Tab");
  const first = isMobile ? header.locator(".header-phone") : header.getByRole("navigation", { name: "Основная навигация", exact: true }).getByRole("link", { name: "Ассортимент" });
  await expect(first).toBeFocused();
  for (const element of [logo, header.locator(".header-phone"), header.getByRole("link", { name: isMobile ? "MAX" : "Написать в MAX", exact: true })]) {
    await element.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(element).toBeFocused();
    expect(await element.evaluate(el => el.matches(":focus-visible") && parseFloat(getComputedStyle(el).outlineWidth) >= 2)).toBe(true);
  }
  if (!isMobile) return;
  const menu = header.locator("summary");
  const nav = header.getByRole("navigation", { name: "Мобильная навигация" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Ассортимент" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
  await page.keyboard.press("Space");
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#assortment$/);
  await expect(nav).toBeHidden();
});

test("скриншоты страницы и Hero", async ({ page }, testInfo) => {
  // Прокрутка загружает lazy images; networkidle не нужен из-за внешней карты и HMR.
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => {
      const img = element as HTMLImageElement;
      return img.complete && img.naturalWidth > 0;
    })).toBe(true);
  }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 0));
  for (const name of ["home", "hero"] as const) {
    const path = testInfo.outputPath(`${name}.png`);
    if (name === "home") {
      await page.screenshot({ path, fullPage: true, animations: "disabled" });
    } else {
      await page.locator('section[aria-labelledby="hero-title"]').screenshot({
        path, animations: "disabled",
      });
    }
    await testInfo.attach(name, { path, contentType: "image/png" });
  }
});

test("Яндекс Карта загружается только по нажатию", async ({ page }) => {
  const map = page.locator('iframe[src*="yandex.ru/map-widget"]');

  const showMapButton = page.getByRole("button", {
    name: "Показать карту",
  });

  await expect(map).toHaveCount(0);

  await expect(showMapButton).toBeVisible();

  await showMapButton.click();

  await expect(map).toHaveCount(1);
  await expect(map).toBeVisible();


  await expect(map).toHaveAttribute(
    "title",
    /Магазин Wellcar:/,
  );
});
