
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

  await expect(title).toHaveText("Моторные масла");

  await next.click();
  await expect(title).toHaveText("Незамерзающая жидкость");

  await next.click();
  await expect(title).toHaveText("Автомобильные аккумуляторы");

  await next.click();
  await expect(title).toHaveText("Моторные масла");

  await previous.click();
  await expect(title).toHaveText("Автомобильные аккумуляторы");
});

test("автопрокрутка останавливается и возобновляется", async ({ page }) => {
  await page.clock.install();

  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: "Сезонные предложения",
  });

  // Interact before advancing the fake clock: this waits for hydration and
  // starts a fresh six-second interval instead of racing the first effect.
  await carousel.getByRole("button", { name: /Пауза/ }).click();
  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  const title = carousel.getByRole("heading", {
    level: 2,
  });

  await expect(title).toHaveText("Моторные масла");

  await page.clock.runFor(6000);

  await expect(title).toHaveText("Незамерзающая жидкость");

  await carousel.getByRole("button", { name: /Пауза/ }).click();

  await page.clock.runFor(12000);

  await expect(title).toHaveText("Незамерзающая жидкость");

  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  await page.clock.runFor(6000);

  await expect(title).toHaveText("Автомобильные аккумуляторы");
});

test.describe("Пользователи с reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("автопрокрутка отключена", async ({ page }) => {
    await page.clock.install();

    await page.goto("/");

    const carousel = page.getByRole("region", {
      name: "Сезонные предложения",
    });

    const title = carousel.getByRole("heading", {
      level: 2,
    });

    await expect(title).toHaveText("Моторные масла");

    await page.clock.runFor(18000);

    await expect(title).toHaveText("Моторные масла");

    await carousel.getByRole("button", {
      name: "Следующий слайд",
    }).click();

    await expect(title).toHaveText("Незамерзающая жидкость");
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
    name: "Показать слайд 3: Автомобильные аккумуляторы",
  });

  await expect(title).toHaveText("Моторные масла");

  await thirdIndicator.click();

  await expect(title).toHaveText("Автомобильные аккумуляторы");
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

  // Interact before advancing the fake clock: this waits for hydration and
  // starts a fresh six-second interval instead of racing the first effect.
  await carousel.getByRole("button", { name: /Пауза/ }).click();
  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  const title = carousel.getByRole("heading", {
    level: 2,
  });

  await page.clock.runFor(6000);
  await expect(title).toHaveText("Незамерзающая жидкость");

  await page.evaluate(() => {
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
      document.documentElement.dataset.motionApplied = "reduce";
    }, { once: true });
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion-applied", "reduce");

  await page.clock.runFor(18000);
  await expect(title).toHaveText("Незамерзающая жидкость");

  await page.evaluate(() => {
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
      document.documentElement.dataset.motionApplied = "no-preference";
    }, { once: true });
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion-applied", "no-preference");

  await page.clock.runFor(6000);
  await expect(title).toHaveText("Автомобильные аккумуляторы");
});
test("Hero: размеры, клавиатура и стабильная высота всех слайдов", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Сезонные предложения" });
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    let height: number | undefined;
    for (let index = 0; index < 3; index++) {
      const indicator = carousel.getByRole("button", { name: new RegExp(`Показать слайд ${index + 1}:`) });
      await indicator.focus();
      await page.keyboard.press("Enter");
      await expect(indicator).toHaveAttribute("aria-pressed", "true");
      await expect(carousel.getByRole("heading", { level: 2 })).toHaveCount(1);
      await expect(carousel.getByRole("button", { name: /Продолжить/ })).toBeVisible();
      const box = await carousel.boundingBox();
      height ??= box!.height;
      expect(box!.height).toBe(height);
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
        if (index === 0) await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true, style: "nextjs-portal { display: none !important; }" });
      }
    }
  }
});

test("ручное управление ставит автопрокрутку на паузу", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Сезонные предложения" });
  // Interact before advancing the fake clock: this waits for hydration and
  // starts a fresh six-second interval instead of racing the first effect.
  await carousel.getByRole("button", { name: /Пауза/ }).click();
  await carousel.getByRole("button", { name: /Продолжить/ }).click();

  await page.clock.runFor(5900);
  await carousel.getByRole("button", { name: "Следующий слайд" }).click();
  await page.clock.runFor(12100);
  await expect(carousel.getByRole("heading")).toHaveText("Незамерзающая жидкость");
  await expect(carousel.getByRole("button", { name: /Продолжить/ })).toHaveAttribute("aria-pressed", "true");
});
