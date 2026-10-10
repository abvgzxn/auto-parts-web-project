export const siteConfig = {
  name: "Wellcar",
  city: "Калязин",

  address: {
    full: "Тверская область, г. Калязин, ул. Салтыкова-Щедрина, д. 24А",
    short: "Калязин, ул. Салтыкова-Щедрина, 24А",
  },

  phones: [
    {
      label: "8 900 11 555 02",
      href: "tel:+79001155502",
    },
    {
      label: "8 915 731 52 54",
      href: "tel:+79157315254",
    },
  ],

  email: "dir@well-car.ru",

  maxUrl:
    "https://max.ru/u/f9LHodD0cOLmcWNX5wXIbjxDoKYYStL6WgeNilZp7bWKjuCzsPDkU_Y9qFM",

  mapsUrl:
    "https://yandex.ru/maps/-/CXuIVX1D",

  workingHours: [
    {
      days: "Пн–Пт",
      hours: "08:00–19:00",
    },
    {
      days: "Сб–Вс",
      hours: "09:00–17:00",
    },
  ],
} as const;
