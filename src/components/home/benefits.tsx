const benefits = [
  {
    title: "Для обслуживания автомобиля",
    description: "Фильтры, свечи, ремни, тормозные колодки и детали подвески для распространённых иномарок.",
  },
  {
    title: "Моторные масла в наличии",
    description: "Большой ассортимент моторных масел, масла для ГУР, КП и АКПП.",
  },
  {
    title: "Для другой техники",
    description: "Масла и расходники для лодочных моторов, мототехники, зимней и садовой техники.",
  },
];

export default function Benefits() {
  return (
    <section
      aria-labelledby="benefits-title"
    >
      <h2
        id="benefits-title"
        className="text-3xl font-bold text-brand-navy"
      >
        Хорошие запчасти для хорошего авто
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="border-t-2 border-brand-cyan py-6 pr-4"
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
