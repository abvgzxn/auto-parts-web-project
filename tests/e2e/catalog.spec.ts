import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const response = await page.goto("/catalog");

  expect(response?.status()).toBe(200);
});

test("страница каталога отображается", async ({ page }) => {
  await expect(page).toHaveTitle(/Каталог автозапчастей/);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Каталог автозапчастей",
    }),
  ).toBeVisible();

  await expect(
    page.getByText("Найдено товаров: 4"),
  ).toBeVisible();
});

test("каталог содержит четыре карточки товаров", async ({ page }) => {
  const catalog = page.getByRole("region", {
    name: "Список товаров",
  });

  const cards = catalog.locator("article");

  await expect(cards).toHaveCount(4);

  await expect(
    cards.getByRole("heading", {
      name: "Моторное масло 5W-30",
    }),
  ).toBeVisible();

  await expect(
    cards.getByRole("heading", {
      name: "Масляный фильтр",
    }),
  ).toBeVisible();

  await expect(
    cards.getByRole("heading", {
      name: "Тормозные колодки",
    }),
  ).toBeVisible();

  await expect(
    cards.getByRole("heading", {
      name: "Амортизатор подвески",
    }),
  ).toBeVisible();
});

test("демонстрационные товары не содержат вымышленных цен", async ({ page }) => {
  const cards = page.locator("main article");

  await expect(cards).toHaveCount(4);

  for (const card of await cards.all()) {
    await expect(card.getByText("Цена по запросу")).toBeVisible();
    await expect(card.getByText(/Артикул: DEMO-/)).toBeVisible();
  }
});

test("демонстрационный каталог закрыт от индексации", async ({ page }) => {
  await expect(
    page.locator('meta[name="robots"]'),
  ).toHaveAttribute("content", /noindex/);
});

test("поиск фильтрует товары по названию и артикулу", async ({ page }) => {
  const search = page.getByRole("searchbox", {
    name: "Поиск по каталогу",
  });

  const cards = page.locator("main article");

  await search.fill("масляный");

  await expect(cards).toHaveCount(1);
  await expect(
    cards.getByRole("heading", { name: "Масляный фильтр" }),
  ).toBeVisible();

  await search.fill("DEMO-BRAKE-001");

  await expect(cards).toHaveCount(1);
  await expect(
    cards.getByRole("heading", { name: "Тормозные колодки" }),
  ).toBeVisible();

  await search.fill("несуществующий товар");

  await expect(cards).toHaveCount(0);
  await expect(
    page.getByText("По вашему запросу товары не найдены."),
  ).toBeVisible();

  await search.clear();

  await expect(cards).toHaveCount(4);
});


test("фильтрация по категории работает вместе с поиском", async ({ page }) => {
  const category = page.getByRole("combobox", {
    name: "Категория товаров",
  });

  const search = page.getByRole("searchbox", {
    name: "Поиск по каталогу",
  });

  const cards = page.locator("main article");

  await category.selectOption("filters");

  await expect(cards).toHaveCount(1);
  await expect(
    cards.getByRole("heading", { name: "Масляный фильтр" }),
  ).toBeVisible();

  await search.fill("тормозные");

  await expect(cards).toHaveCount(0);
  await expect(
    page.getByText("По вашему запросу товары не найдены."),
  ).toBeVisible();

  await search.fill("масляный");

  await expect(cards).toHaveCount(1);

  await category.selectOption("all");

  await search.clear();

  await expect(cards).toHaveCount(4);
});

test("страница отдельного товара открывается", async ({ page }) => {
  await page.goto("/catalog/oil-filter");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Масляный фильтр",
    }),
  ).toBeVisible();

  await expect(
    page.getByText("DEMO-FILTER-001"),
  ).toBeVisible();

  await expect(
    page.getByText("Производитель: Демонстрационный товар", {
    exact: true,
    }),
  ).toBeVisible();
});

test("несуществующий товар возвращает 404", async ({ page }) => {
  const response = await page.goto(
    "/catalog/non-existent-product",
  );

  expect(response?.status()).toBe(404);
});

test("из каталога можно открыть товар и вернуться обратно", async ({ page }) => {
  await page.goto("/catalog");

  await page.getByRole("link", {
    name: "Подробнее о товаре: Масляный фильтр",
  }).click();

  await expect(page).toHaveURL(/\/catalog\/oil-filter$/);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Масляный фильтр",
    }),
  ).toBeVisible();

  await page.getByRole("link", {
    name: "Вернуться в каталог",
  }).click();

  await expect(page).toHaveURL(/\/catalog$/);
});