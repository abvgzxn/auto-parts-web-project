const benefits = [
  {
    title: "Подбор по VIN",
    description:
      "Поможем подобрать совместимые запчасти по VIN автомобиля.",
  },
  {
    title: "В наличии и на заказ",
    description:
      "Запчасти из наличия и под заказ со сроком поставки от одного дня.",
  },
  {
    title: "Большой выбор масел",
    description:
      "Моторные масла для автомобилей, мотоциклов, квадроциклов и лодочных моторов.",
  },
  {
    title: "Быстрая связь",
    description:
      "Консультация и подбор запчастей по телефону или через MAX.",
  },
];

export default function Benefits() {
  return (
    <section
      aria-labelledby="benefits-title"
      className="py-12 md:py-16"
    >
      <h2
        id="benefits-title"
        className="text-3xl font-bold text-brand-navy"
      >
        Почему выбирают Wellcar
      </h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-xl border border-border bg-white p-6"
          >
            <h3 className="text-xl font-semibold text-brand-navy">
              {benefit.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted">
              {benefit.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}