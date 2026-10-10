export const siteConfig = {
  name: "Wellcar",
  url: "https://well-car.ru/",
  city: "Калязин",

  address: {
    country: "RU",
    region: "Тверская область",
    street: "улица Салтыкова-Щедрина, 24А",
    full: "Тверская область, г. Калязин, ул. Салтыкова-Щедрина, д. 24А",
    short: "Калязин, ул. Салтыкова-Щедрина, 24А",
  },

  coordinates: {
    latitude: 57.236612,
    longitude: 37.839808,
  },

  phones: [
    {
      label: "+7 900-115-55-02",
      href: "tel:+79001155502",
    },
    {
      label: "+7 915-731-52-54",
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
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      days: "Сб–Вс",
      hours: "09:00–17:00",
      schemaDays: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
} as const;
