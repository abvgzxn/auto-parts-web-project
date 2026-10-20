import { expect, test } from "@playwright/test";
import { heroSlides } from "../../src/lib/hero-slides";

 test("бренд, метаданные и отдельное расписание выходных", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("ВЕЛКАР — магазин автозапчастей в Калязине");
  await expect(page.locator("body")).not.toContainText(/Wellcar|Велкар/);
  for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:site_name"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]']) {
    await expect(page.locator(selector)).toHaveAttribute("content", /ВЕЛКАР/);
    await expect(page.locator(selector)).not.toHaveAttribute("content", /Wellcar/);
  }
  const schema = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(schema.name).toBe("ВЕЛКАР");
  expect(schema.openingHoursSpecification).toEqual([
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => `https://schema.org/${day}`), opens: "08:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["https://schema.org/Saturday"], opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["https://schema.org/Sunday"], opens: "09:00", closes: "15:00" },
  ]);
  for (const selector of ["#contacts dl", "footer dl"]) {
    await expect(page.locator(selector).locator("div").filter({ hasText: "Вс" })).toHaveText("Вс09:00–15:00");
    await expect(page.locator(selector).locator("div").filter({ hasText: "Сб" })).toHaveText("Сб09:00–17:00");
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".header-hours")).toContainText("Вс 09:00–15:00");
  await page.setViewportSize({ width: 375, height: 900 });
  await page.locator("header summary").click();
  await expect(page.locator(".header-menu-panel")).toContainText("Вс 09:00–15:00");
});

 test("все баннеры: выбор одного источника, пропорции и рекламные тексты", async ({ browser }, testInfo) => {
  for (const width of [320, 375, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    const requests: string[] = [];
    page.on("request", request => {
      const url = decodeURIComponent(request.url());
      if (url.includes("/images/hero/")) requests.push(url);
    });
    await page.goto("/");
    const carousel = page.locator(".hero-carousel");
    await expect(carousel).not.toContainText(/Незамерзающая жидкость|Чистое стекло даже в сильный мороз/i);
    const unexpectedSources = heroSlides.map(slide => width >= 768 ? slide.mobileImageSrc : slide.imageSrc);
    for (const [index, { id, imageSrc, mobileImageSrc }] of heroSlides.entries()) {
      await carousel.locator(".hero-indicators button").nth(index).click();
      const photo = carousel.locator(".hero-product");
      const expected = width >= 768 ? imageSrc : mobileImageSrc;
      await expect.poll(() => photo.evaluate(el => new URL((el as HTMLImageElement).currentSrc, location.href).searchParams.get("url"))).toBe(expected);
      await expect.poll(() => photo.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true);
      await expect(photo).toHaveCSS("object-fit", "contain");
      if (width < 768) {
        await page.evaluate(() => document.fonts.ready);
        const lines = await carousel.getByRole("heading").evaluate(heading => {
          const node = heading.firstChild!;
          const rows = new Map<number, string>();
          const bounds = heading.getBoundingClientRect();
          for (let i = 0; i < node.textContent!.length; i++) {
            const range = document.createRange();
            range.setStart(node, i);
            range.setEnd(node, i + 1);
            const rect = range.getBoundingClientRect();
            if (node.textContent![i].trim() && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) {
              throw new Error("Heading text overflows its container");
            }
            rows.set(rect.top, (rows.get(rect.top) ?? "") + node.textContent![i]);
          }
          return [...rows.values()].map(line => line.trim()).filter(Boolean);
        });
        for (const line of lines) expect(line.length, `${width}px ${id}: ${lines.join(" / ")}`).toBeGreaterThan(1);
      }
      expect(requests.some(url => url.includes(expected))).toBe(true);
      expect(requests.filter(url => unexpectedSources.some(source => url.includes(source)))).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      if (id === "winter-fluid") {
        await expect(carousel.getByRole("heading")).toHaveText("Реагент низкозамерзающий");
        await expect(carousel).toContainText("5 литров — 150 ₽");
        await expect(photo).toHaveAttribute("alt", /Реагент низкозамерзающий/);
      }
      await carousel.screenshot({ path: testInfo.outputPath(`customer-${width}-${id}.png`), animations: "disabled", style: "nextjs-portal { display: none !important; }" });
    }
    await page.close();
  }
});
