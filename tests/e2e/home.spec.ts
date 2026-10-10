import { expect, test } from "@playwright/test";

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
  if (isMobile) await page.locator("header summary").click();
  const nav = page.getByRole("navigation", {
    name: isMobile ? "Мобильная навигация" : "Основная навигация",
    exact: true,
  });
  await expect(nav).toBeVisible();
  for (const [label, id] of navigation) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
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

test("ссылки MAX и оба телефона", async ({ page }) => {
  // Проверяем публичные ссылки, не открывая мессенджер или приложение звонков.
  const maxLinks = page.locator('a[href^="https://max.ru/"]');
  await expect(maxLinks).toHaveCount(5);
  for (const link of await maxLinks.all()) {
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      "href",
      "https://max.ru/u/f9LHodD0cOLmcWNX5wXIbjxDoKYYStL6WgeNilZp7bWKjuCzsPDkU_Y9qFM",
    );
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
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

test("нет горизонтального переполнения на мобильных ширинах", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Проверяется в мобильном профиле");
  for (const width of [320, 375, 390, 414]) {
    await page.setViewportSize({ width, height: 844 });
    for (const open of [false, true]) {
      await page.locator("header details").evaluate((element, value) => {
        (element as HTMLDetailsElement).open = value;
      }, open);
      await expect.poll(() => page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      })).then(({ viewport, content }) => content - viewport), {
        message: `Переполнение при ширине ${width}, меню ${open ? "открыто" : "закрыто"}`,
      }).toBeLessThanOrEqual(1);
    }
  }
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
