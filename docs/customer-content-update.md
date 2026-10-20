# Обновление контента ВЕЛКАР

Все четыре требования реализованы. Изменены только контент, изображения, необходимая мобильная компоновка и проверки.

## Изображения

Все пути ниже относительно `public/images/hero/`. Desktop: 1387 × 1134. Источники находятся в `/home/abvgzxn/wellcar-photo-sources`, сохранены без изменений. PNG преобразованы в WebP без обрезки и изменения размеров, quality 90.

| Слайд | Desktop | Mobile | Размер mobile | Исходный PNG mobile |
|---|---|---|---|---|
| Аккумуляторы | batteries-banner.webp (сохранён) | batteries-mobile.webp | 640 × 360 | 3bafd021-3b5a-47b9-84eb-90b32358e4ee.png |
| Щётки | wiper-blades-banner.webp (сохранён) | wiper-blades-mobile.webp | 640 × 360 | 898ebcd6-dd74-4c26-8ece-9faa4e2e3f02.png |
| Масла | bulk-motor-oil-banner.webp (сохранён) | bulk-motor-oil-mobile.webp | 640 × 359 | f7115dea-b597-403e-8ee6-3cf2fe446e43.png |
| Реагент | winter-fluid-banner.webp (заменён) | winter-fluid-mobile.webp | 640 × 360 | 633f6be7-c9fa-4279-8610-df4a01081d47.png |

Источник нового desktop-баннера реагента: `978cb505-1de4-4586-9ab8-7900b08dc88e.png` (1387 × 1134). Остальные подготовленные desktop PNG: аккумуляторы `51d81afe-289d-4078-8eb4-94751a605825.png`, щётки `ce5c47ea-0e23-4592-b467-982a07e18f6e.png`, масла `bd29fb4c-92f6-4a84-bedb-996cf8aabf7f.png` (все 1387 × 1134); существующие desktop WebP этих слайдов сохранены.

`<picture>` + `getImageProps` выбирает desktop от 768 px. Только активный слайд монтирует изображение; первый сохраняет eager/high. На mobile область 16:9, `object-fit: contain`; исходные 640 × 359 масла не растянуты. Двойная загрузка mobile/desktop исключается проверкой сетевых запросов.

## Тексты и график

- Wellcar/Велкар → ВЕЛКАР в конфигурации, разделах, футере через конфигурацию, доступных названиях, SEO, Open Graph, Twitter и preview. JSON-LD получает новое имя из конфигурации.
- Заголовок реагента: «Реагент низкозамерзающий». Alt уточняет название товара. Цена «5 литров — 150 ₽», описание и CTA сохранены.
- Нежелательные формулировки отсутствуют в данных слайда и новых изображениях (проверены визуально). Новые баннеры уже содержат ВЕЛКАР.
- Логотип уже содержит ВЕЛКАР; OG-изображение не содержит текста. Фирменная графика сохранена.
- Пн–Пт 08:00–19:00, Сб 09:00–17:00, Вс 09:00–15:00. Шапка, мобильное меню, контакты, футер и JSON-LD используют одну конфигурацию.
- Домены, URL, технические идентификаторы и пути сохранены.

## Проверки

- `npm run lint`: успешно.
- `npx tsc --noEmit`: успешно.
- `npm run build`: ограничение среды. Сначала недоступен Google Fonts, затем Turbopack не смог открыть внутренний порт обработки CSS (`Operation not permitted`), в том числе при повторе с запросом расширенных разрешений.
- `npm run build -- --webpack`: production build успешно, все статические страницы созданы. Конфигурация проекта не изменена.
- `npm run test:e2e`: 60 passed, 2 skipped (существующие desktop-условия мобильных тестов), 1.9 мин.
- `git diff --check`: успешно.
- Проверены 320, 375, 390, 768, 1440 px: все слайды, выбор изображения, отсутствие горизонтальной прокрутки; существующие тесты также проверяют клавиатуру, паузу, автопрокрутку, reduced-motion, стабильную высоту и пересечения областей управления.

Next.js сообщает о внешнем package-lock.json и при прокрутке тестами — об LCP у существующих фотографий фасада/масел. Эти участки не изменялись. Замер полевого LCP не выполнялся; eager/high и загрузка одного варианта первого баннера подтверждены E2E.

## Скриншоты

`reviews/customer-content-update/customer-{320,375,390,768,1440}-{batteries,wiper-blades,bulk-motor-oil,winter-fluid}.png` — 20 снимков.

Также в этой папке: `contact-sheet.png`, `header-1440.png`, `header-390-open.png`.

## Изменённые файлы

- `public/images/hero/batteries-mobile.webp`
- `public/images/hero/bulk-motor-oil-mobile.webp`
- `public/images/hero/winter-fluid-banner.webp`
- `public/images/hero/winter-fluid-mobile.webp`
- `public/images/hero/wiper-blades-mobile.webp`
- `src/app/carousel-preview/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/home/about-store.tsx`
- `src/components/home/categories.tsx`
- `src/components/home/contacts.tsx`
- `src/components/home/hero-carousel.tsx`
- `src/components/home/hero.tsx`
- `src/components/home/oils.tsx`
- `src/components/site-header.tsx`
- `src/components/ui/brand-logo.tsx`
- `src/lib/hero-slides.ts`
- `src/lib/site-config.ts`
- `tests/e2e/about-store.spec.ts`
- `tests/e2e/carousel.spec.ts`
- `tests/e2e/footer.spec.ts`
- `tests/e2e/home.spec.ts`
- `tests/e2e/customer-content.spec.ts`
- `docs/customer-content-update.md`

Дополнительно добавлены 23 PNG для визуального ревью в `reviews/customer-content-update/`. Существующие artifacts/reviews и скрипты не удалялись. Коммиты, push, PR, изменения деплоя и подключения к VPS не выполнялись. Открытых вопросов по контенту нет; ограничение стандартного Turbopack build описано выше.
