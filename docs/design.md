# Велкар — V1 Website Design Specification

## 1. Purpose

Велкар is a local auto-parts store.

V1 is a modern business website whose primary goals are:

- explain what the store offers;
- help customers contact the store for part selection;
- provide store location and contact information;
- build trust in the business;
- establish a frontend foundation that can later evolve into an online store.

V1 is not an e-commerce application.

The website may later evolve into an online store with approximately 5,000 products and integration with 1C.

## 2. Primary user actions

The most important actions on the website are:

1. Request help selecting a part.
2. Call the store.
3. Find the store and build a route.
4. Understand what products the store sells.

The primary CTA is:

**Подобрать запчасть**

Its exact behavior must be defined before implementation.

For V1, preference should be given to existing communication channels rather than building a backend form without a real processing workflow.

## 3. Page structure

The V1 website consists primarily of one landing page.

Recommended section order:

1. Header
2. Hero
3. Quick benefits
4. Product categories
5. Part-selection CTA
6. About the store
7. Contacts
8. Footer

The About section should also contain the strongest reasons for choosing Велкар instead of creating a repetitive separate "Why Велкар" section.

## 4. Header

The header should contain:

- Велкар logo;
- navigation;
- phone/contact action;
- primary CTA.

Suggested navigation:

- Ассортимент
- Подбор
- О магазине
- Контакты

Navigation should use page anchors in V1.

## 5. Hero

Primary message:

**Запчасти для иномарок  
в наличии и на заказ**

Supporting copy should briefly explain the store's offering without duplicating the rest of the page.

Primary action:

**Подобрать запчасть**

Secondary action:

**Позвонить**

The hero should use a dark automotive visual consistent with the Велкар brand.

The image supports the content and must not reduce text readability.

## 6. Quick benefits

Show approximately three short, verified benefits.

Potential examples:

- товары в наличии;
- помощь с подбором;
- заказные позиции с быстрым сроком поставки.

Claims about delivery times must only be used if confirmed by the business.

## 7. Product categories

Initial categories:

- Запчасти
- Масла и жидкости
- Автохимия
- Для ТО
- Шины и диски
- Для АКПП и трансмиссии
- Для мотоциклов и квадроциклов
- Для прицепов

In V1 these are informational cards.

Do not create empty catalog/category pages just to make the cards clickable.

Each category may include a short description or examples where useful.

## 8. Part selection

This section should explain that customers do not need to know the exact part number.

Possible process:

1. Customer provides information about the vehicle and required part.
2. Велкар checks suitable options.
3. Price and delivery time are clarified.
4. Customer decides whether to order or purchase the part.

Useful information a customer may provide:

- make;
- model;
- year;
- VIN, if available;
- part number, if known;
- photo or description of the required part.

The actual communication channel must be confirmed before implementing the CTA.

## 9. About the store

Use real information rather than generic marketing copy.

The section may include:

- a real photograph of the store;
- short store description;
- local experience;
- assortment;
- help selecting parts;
- ordering capability.

Avoid unsupported marketing claims.

## 10. Contacts

The contacts section should provide information as actual HTML text, not only inside a map.

Include:

- address;
- phone numbers;
- opening hours;
- link to Yandex Maps;
- route action.

A map embed is optional for V1.

A simple external map link may initially be preferable for performance.

## 11. Brand

### Naming

Use:

- **Велкар** in Cyrillic;
- **Wellcar** when Latin characters are required.

Never use **Velkar**.

### Colors

Primary existing brand colors:

- Navy: `#004772`
- Cyan: `#00A0E3`
- Light Blue: `#00B1EB`
- Light Gray: `#D4DBE1`
- White: `#FFFFFF`

Additional neutral web colors may be introduced for:

- page background;
- surfaces;
- primary text;
- secondary text;
- borders.

They should complement rather than replace the brand palette.

### Typography

Brand fonts:

- Days One — selected headings and brand accents;
- Arimo — interface and body text.

Days One should be used selectively rather than for all interface text.

Only necessary font weights should be loaded.

## 12. Visual direction

The website should feel:

- modern;
- automotive;
- trustworthy;
- clean;
- spacious;
- local rather than corporate/generic.

General direction:

- mostly light content sections;
- dark navy automotive hero;
- cyan as an accent;
- generous whitespace;
- strong typography;
- high-quality automotive photography.

The existing Велкар car/star pattern should be used sparingly in decorative areas.

Do not repeat the pattern throughout every section.

## 13. Reference direction

References are used for principles rather than direct copying.

- FCP Euro — brand presentation and automotive visual hierarchy.
- Tire Rack — product/category presentation.
- ECS Tuning — vehicle and part-selection UX.
- Autodoc / Exist — Russian auto-parts selection and search logic.

The final interface should remain visually identifiable as Велкар.

## 14. Responsive strategy

Design mobile-first.

The website must work well on:

- mobile phones;
- tablets;
- laptops;
- desktop screens.

Important considerations:

- no horizontal content scrolling;
- readable text sizes;
- accessible contact actions;
- suitable hero image crop on small screens;
- category grid adapts to available width;
- navigation remains usable on mobile.

Desktop content should use a reasonable maximum width rather than stretching indefinitely.

## 15. Accessibility

From the beginning:

- use `lang="ru"`;
- use semantic HTML;
- use one meaningful `h1`;
- keep heading hierarchy logical;
- use links for navigation and buttons for actions;
- provide visible keyboard focus;
- provide meaningful image `alt` text;
- decorative images should use empty alt text where appropriate;
- maintain sufficient text contrast;
- keep interactive targets comfortably usable on touch devices.

## 16. SEO

V1 should include:

- meaningful page title;
- useful meta description;
- correct language;
- favicon;
- Open Graph metadata;
- real business address and contact information in page content.

After the production domain is selected:

- canonical URL;
- sitemap;
- robots configuration.

Structured data for a local automotive-parts business may be added using confirmed business information.

Do not create empty SEO pages.

## 17. Performance

Prefer:

- React Server Components;
- static rendering where possible;
- `next/image` for content photography;
- appropriately sized responsive images;
- lazy loading below-the-fold media;
- limited font weights;
- minimal client-side JavaScript.

Avoid in V1:

- background video;
- heavy animation libraries;
- carousels without a clear reason;
- unnecessarily large image files;
- unnecessary third-party scripts.

## 18. Initial component direction

Potential structure:

src/
  app/
    layout.tsx
    page.tsx
    globals.css

  components/
    site-header.tsx
    site-footer.tsx

    home/
      hero.tsx
      benefits.tsx
      categories.tsx
      part-selection.tsx
      about-store.tsx
      contacts.tsx

  data/
    site.ts
    home.ts

This is a direction, not a requirement to create all files immediately.

Components should be introduced as they become useful.

## 19. Server and Client Components

Use Server Components by default.

The initial static sections do not require Client Components.

Client Components should only be introduced when actual browser-side interactivity requires them.

Potential future examples:

- mobile navigation state;
- interactive form state;
- map loaded on demand.

Do not add `"use client"` to entire page sections unnecessarily.

## 20. Content data

Repeated business information should eventually live in simple TypeScript data structures.

Examples for `site.ts`:

- business name;
- address;
- phone numbers;
- opening hours;
- map URL;
- navigation.

Examples for `home.ts`:

- categories;
- benefits;
- selection steps.

Unique page copy does not need to be converted into configuration objects.

## 21. Deliberately excluded from V1

Do not implement yet:

- product database;
- real catalog;
- shopping cart;
- checkout;
- online payments;
- user accounts;
- 1C integration;
- CRM integration;
- VIN API;
- full vehicle compatibility system;
- CMS;
- global state management;
- speculative product/order domain architecture.

These features should be introduced when the project reaches the stage where they solve a real requirement.

## 22. Implementation order

1. Confirm real store content and CTA behavior.
2. Prepare brand assets.
3. Configure language, fonts, colors and base page styles.
4. Build the semantic page structure.
5. Implement Header and Hero.
6. Implement benefits and categories.
7. Implement part-selection section.
8. Implement About section.
9. Implement Contacts and Footer.
10. Add only required interactivity.
11. Complete responsive and accessibility review.
12. Complete SEO metadata.
13. Run lint, TypeScript and production build checks.
14. Review the completed V1 before adding new functionality.

## 23. Confirmed business requirements

### Business identity

- Brand name: Велкар (Cyrillic), Wellcar (Latin).
- Location: Калязин, ул. Салтыкова-Щедрина, 24А.
- Business type: local auto-parts and automotive supplies store.
- Primary V1 objective: advertising, customer inquiries, and in-store visits.

### Contact channels

- Phone 1: +7 900 115-55-02.
- Phone 2: +7 915 731-52-54.
- Both phone numbers are equally important.
- Both numbers are associated with MAX messenger accounts.
- Business email: dir@well-car.ru.

The primary CTA "Подобрать запчасть" should open a working MAX conversation.

A verified public MAX chat link must be obtained before implementation. Do not invent messenger URLs.

Both phone numbers should remain visible in the contacts section.

### Product selection

The store selects auto parts using VIN-based catalogs.

V1 does not need a VIN search engine.

Customers should be able to contact the store to request part selection.

### Product assortment

The store offers:

- auto parts for imported vehicles;
- filters, spark plugs, belts, brake components and suspension parts;
- engine oils and technical fluids;
- oils for motorcycles, ATVs, boat engines and other equipment;
- automotive chemicals;
- tires and wheels;
- transmission and automatic transmission products;
- motorcycle and ATV products;
- maintenance consumables.

Oil and technical fluid assortment is an important business differentiator and should receive a dedicated section on the homepage.

Do not create a separate trailer-parts category in V1.

### Availability and delivery

Products may be available immediately or supplied to order.

Depending on the item, delivery may be possible on the same day or from one day.

Exact availability, pricing and delivery time must be confirmed with the store.

Avoid unconditional delivery promises.

### Domains

Previously purchased domains:

- well-car.ru
- велкар.рф

Proposed primary domain: well-car.ru.

Proposed secondary domain: велкар.рф, redirected to the primary domain.

Before deployment, verify domain ownership, registration status, DNS access and existing email records.

### Photography

Real store photographs may be available through the store's Yandex Maps listing.

Prefer original images supplied by the business or photographs with confirmed reuse permission.

### V1 contact form decision

Do not implement a custom application form in the initial release.

Use direct MAX contact and telephone links.

A future form may submit inquiries to dir@well-car.ru through a server-side email delivery mechanism, with appropriate validation, spam protection and personal-data safeguards.