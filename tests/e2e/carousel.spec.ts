
import { expect, test } from "@playwright/test";

test("карусель циклически переключает слайды", async ({ page }) => {
  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: "Сезонные предложения",
  });

  const next = carousel.getByRole("button", {
    name: "Следующий слайд",
  });

  const previous = carousel.getByRole("button", {
    name: "Предыдущий слайд",
  });

  const title = carousel.getByRole("heading", {
    level: 2,
  });

  await expect(title).toHaveText("Автомобильные аккумуляторы");

  await next.click();
  await expect(title).toHaveText("Щётки стеклоочистителя");

  await next.click();
  await expect(title).toHaveText("Моторное масло на розлив");

  await next.click();
  await expect(title).toHaveText("Незамерзающая жидкость");

  await next.click();
  await expect(title).toHaveText("Автомобильные аккумуляторы");

  await previous.click();
  await expect(title).toHaveText("Незамерзающая жидкость");
});

test("автопрокрутка останавливается и возобновляется", async ({ page }) => {
  await page.clock.install();

  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: "Сезонные предложения",
  });


  await carousel.getByRole("button", { name: /Пауза/ }).click();
  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  const title = carousel.getByRole("heading", {
    level: 2,
  });

  await expect(title).toHaveText("Автомобильные аккумуляторы");

  await page.clock.runFor(6000);

  await expect(title).toHaveText("Щётки стеклоочистителя");

  await carousel.getByRole("button", { name: /Пауза/ }).click();

  await page.clock.runFor(12000);

  await expect(title).toHaveText("Щётки стеклоочистителя");

  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  await page.clock.runFor(6000);

  await expect(title).toHaveText("Моторное масло на розлив");
});

test.describe("Пользователи с reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("автопрокрутка отключена", async ({ page }) => {
    await page.clock.install();

    await page.goto("/");

    const carousel = page.getByRole("region", {
      name: "Сезонные предложения",
    });

    const pauseButton = carousel.locator(".hero-pause");

    await expect(pauseButton).toBeHidden();

    const title = carousel.getByRole("heading", {
      level: 2,
    });

    await expect(title).toHaveText("Автомобильные аккумуляторы");

    await page.clock.runFor(18000);

    await expect(title).toHaveText("Автомобильные аккумуляторы");

    await carousel.getByRole("button", {
      name: "Следующий слайд",
    }).click();

    await expect(title).toHaveText("Щётки стеклоочистителя");
  });
});

test("индикаторы переключают слайды", async ({ page }) => {
  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: "Сезонные предложения",
  });

  const title = carousel.getByRole("heading", {
    level: 2,
  });

  const thirdIndicator = carousel.getByRole("button", {
    name: "Показать слайд 3: Моторное масло на розлив",
  });

  await expect(title).toHaveText("Автомобильные аккумуляторы");

  await thirdIndicator.click();

  await expect(title).toHaveText("Моторное масло на розлив");
  await expect(thirdIndicator).toHaveAttribute("aria-pressed", "true");
});

test("карусель реагирует на изменение reduced motion", async ({ page }) => {
  await page.clock.install();

  await page.emulateMedia({
    reducedMotion: "no-preference",
  });

  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: "Сезонные предложения",
  });

  await carousel.getByRole("button", { name: /Пауза/ }).click();
  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  const title = carousel.getByRole("heading", {
    level: 2,
  });

  await page.clock.runFor(6000);
  await expect(title).toHaveText("Щётки стеклоочистителя");

  await page.evaluate(() => {
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
      document.documentElement.dataset.motionApplied = "reduce";
    }, { once: true });
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion-applied", "reduce");

  await expect(
  carousel.locator(".hero-pause")
  ).toBeHidden();

  await page.clock.runFor(18000);
  await expect(title).toHaveText("Щётки стеклоочистителя");

  await page.evaluate(() => {
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
      document.documentElement.dataset.motionApplied = "no-preference";
    }, { once: true });
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion-applied", "no-preference");

  await expect(
  carousel.getByRole("button", { name: "Пауза" })
).toBeVisible();

  await page.clock.runFor(6000);
  await expect(title).toHaveText("Моторное масло на розлив");
});
test("Hero: размеры, клавиатура и стабильная высота всех слайдов", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Сезонные предложения" });
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    let height: number | undefined;
    for (let index = 0; index < 4; index++) {
      const indicator = carousel.getByRole("button", { name: new RegExp(`Показать слайд ${index + 1}:`) });
      await indicator.focus();
      await page.keyboard.press("Enter");
      await expect(indicator).toHaveAttribute("aria-pressed", "true");
      await expect(carousel.getByRole("heading", { level: 2 })).toHaveCount(1);
      const titles = ["Автомобильные аккумуляторы", "Щётки стеклоочистителя", "Моторное масло на розлив", "Незамерзающая жидкость"];
      const sources = ["batteries", "wiper-blades", "bulk-motor-oil", "winter-fluid"];
      await expect(carousel.getByRole("heading", { level: 2 })).toHaveText(titles[index]);
      await expect(carousel.locator(".hero-indicators button")).toHaveCount(4);
      await expect(carousel.locator(".hero-arrows span")).toHaveText(`${index + 1} / 4`);
      const photo = carousel.locator(".hero-product");
      await expect(photo).toHaveCount(1);
      await expect(photo).toHaveAttribute("src", new RegExp(sources[index]));
      await expect(photo).toHaveAccessibleName(/.+/);
      await expect.poll(() => photo.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true);
      expect(await photo.evaluate(el => getComputedStyle(el).objectFit)).toBe("contain");
      await expect.poll(() => photo.evaluate(el => decodeURIComponent((el as HTMLImageElement).currentSrc))).toContain(`${sources[index]}-${width >= 768 ? "banner" : "mobile"}.webp`);
      const visual = carousel.locator('.hero-slide[data-active="true"] .hero-visual');
      const visualBox = await visual.boundingBox();
      const copyBox = await carousel.locator('.hero-slide[data-active="true"] .hero-details').boundingBox();
      const ctaBox = await carousel.getByRole("link").boundingBox();
      expect(ctaBox!.width).toBeGreaterThanOrEqual(44);
      expect(ctaBox!.height).toBeGreaterThanOrEqual(44);
      if (width >= 768) {
        expect(visualBox!.width / visualBox!.height).toBeCloseTo(1387 / 1134, 2);
        expect(copyBox!.x).toBeGreaterThanOrEqual(visualBox!.x + visualBox!.width - 1);
        expect(ctaBox!.x).toBeGreaterThanOrEqual(visualBox!.x + visualBox!.width - 1);
      } else {
        if (index === 0) {
          expect(copyBox!.y).toBeGreaterThanOrEqual(visualBox!.y + visualBox!.height);
          expect(visualBox!.width).toBeGreaterThanOrEqual(width - 68);
          expect(visualBox!.height).toBeGreaterThanOrEqual(180);
        } else {
          const titleBox = await carousel.getByRole("heading", { level: 2 }).boundingBox();
          expect(visualBox!.y).toBeGreaterThanOrEqual(titleBox!.y + titleBox!.height);
          expect(copyBox!.y).toBeGreaterThanOrEqual(visualBox!.y + visualBox!.height);
          expect(visualBox!.width).toBeGreaterThanOrEqual(width - 68);
          expect(copyBox!.width).toBeCloseTo(visualBox!.width, 1);
          expect(visualBox!.height).toBeGreaterThanOrEqual(230);
          expect(ctaBox!.y).toBeGreaterThanOrEqual(copyBox!.y + copyBox!.height);
        }
        expect(ctaBox!.y).toBeGreaterThanOrEqual(visualBox!.y + visualBox!.height);
        expect(await carousel.getByRole("heading", { level: 2 }).evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(26);
      }
      await expect(carousel.locator('.hero-slide[aria-hidden="true"]')).toHaveCount(3);
      for (const slide of await carousel.locator('.hero-slide[aria-hidden="true"]').all()) {
        await expect(slide).toHaveAttribute("inert", "");
      }
      await expect(carousel.locator(".hero-pause")).toBeHidden();
      const box = await carousel.boundingBox();
      height ??= box!.height;
      expect(box!.height).toBe(height);
      if (width === 320 || width === 390) {
        // The stacked composition may add at most 80px to the previous 543px Hero.
        expect(box!.height).toBeLessThanOrEqual(623);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      const link = carousel.getByRole("link");
      await expect(link).toHaveCount(1);
      await link.focus();
      await expect(link).toBeFocused();
      for (const control of await carousel.getByRole("button").all()) {
        const bounds = await control.boundingBox();
        expect(bounds!.height).toBeGreaterThanOrEqual(44);
        expect(bounds!.width).toBeGreaterThanOrEqual(44);
      }
      if (width === 390 || width === 1440) {
        await page.evaluate(() => window.scrollTo(0, 0));
        const path = testInfo.outputPath(`hero-${width}-slide-${index + 1}.png`);
        await carousel.screenshot({ path, style: "nextjs-portal { display: none !important; }" });
        await testInfo.attach(`hero-${width}-slide-${index + 1}`, { path, contentType: "image/png" });
        if (index === 0) {
          await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true, style: "nextjs-portal { display: none !important; }" });
          const frame = await page.locator(".hero-frame").boundingBox();
          await page.screenshot({ path: testInfo.outputPath(`header-hero-${width}.png`), clip: { x: 0, y: 0, width, height: Math.ceil(frame!.y + frame!.height + 16) }, style: "nextjs-portal { display: none !important; }" });
        }
      }
    }
  }
});

test("ручное управление ставит автопрокрутку на паузу", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Сезонные предложения" });
  await carousel.getByRole("button", { name: /Пауза/ }).click();
  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  await page.clock.runFor(5900);
  await carousel.getByRole("button", { name: "Следующий слайд" }).click();
  await page.clock.runFor(12100);
  await expect(carousel.getByRole("heading")).toHaveText("Щётки стеклоочистителя");
  await expect(carousel.getByRole("button", { name: /Продолжить/ })).toHaveAttribute("aria-pressed", "true");
});

test("автопрокрутка останавливается при фокусе на кнопке управления", async ({
  page,
}) => {
  await page.goto("/");

  const counter = page.locator(".hero-arrows span");
  const nextButton = page.getByRole("button", {
    name: "Следующий слайд",
  });

  await expect(counter).toHaveText("1 / 4");

  await nextButton.focus();

  await page.waitForTimeout(6500);

  await expect(counter).toHaveText("1 / 4");
});

test("кнопка паузы корректно останавливает и возобновляет автопрокрутку", async ({
  page,
}) => {
  await page.goto("/");

  const counter = page.locator(".hero-arrows span");

  await expect(counter).toHaveText("1 / 4");

  await page.getByRole("button", { name: "Пауза" }).click();

  await expect(
    page.getByRole("button", { name: "Продолжить" })
  ).toBeVisible();

  await page.waitForTimeout(6500);
  await expect(counter).toHaveText("1 / 4");

  await page.getByRole("button", { name: "Продолжить" }).click();

  await expect(
    page.getByRole("button", { name: "Пауза" })
  ).toBeVisible();

  await page.waitForTimeout(6500);
  await expect(counter).toHaveText("2 / 4");
});


test("art direction: загружается только подходящий первый баннер", async ({ browser }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const requested: string[] = [];
    const record = (request: import("@playwright/test").Request) => {
      const url = decodeURIComponent(request.url());
      if (url.includes("/images/hero/")) requested.push(url);
    };
    page.on("request", record);
    await page.goto("/");
    const photo = page.locator(".hero-product");
    await expect.poll(() => photo.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true);
    const composition = width >= 768 ? "banner" : "mobile";
    await expect.poll(() => photo.evaluate(el => decodeURIComponent((el as HTMLImageElement).currentSrc))).toContain(`batteries-${composition}.webp`);
    expect(requested.length).toBeGreaterThan(0);
    expect(requested, `width=${width}`).toEqual(expect.arrayContaining([expect.stringContaining(`batteries-${composition}.webp`)]));
    expect(requested.filter(url => !url.includes(`batteries-${composition}.webp`)), `width=${width}`).toEqual([]);
    await expect(photo).toHaveAttribute("fetchpriority", "high");
    await expect(photo).toHaveAttribute("loading", "eager");
    await page.close();
  }
});
