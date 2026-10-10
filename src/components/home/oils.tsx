import OilCategoryCard from "./oil-category-card";

const oilCategories = [
  {
    id: "cars",
    title: "Для автомобилей",
    description:
      "Моторные масла для бензиновых и дизельных двигателей.",
  },
  {
    id: "motorcycles",
    title: "Для мотоциклов",
    description:
      "Масла для мотоциклетных двигателей.",
  },
  {
    id: "atvs",
    title: "Для квадроциклов",
    description:
      "Масла для двигателей квадроциклов и другой мототехники.",
  },
  {
    id: "boats",
    title: "Для лодочных моторов",
    description:
      "Масла для двухтактных и четырёхтактных лодочных двигателей.",
  },
];

export default function Oils() {
  return (
    <section
      id="oils"
      aria-labelledby="oils-title"
      className="rounded-2xl bg-brand-navy px-6 py-12 text-white md:px-10 md:py-16"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-light-blue">
          Ассортимент Wellcar
        </p>

        <h2
          id="oils-title"
          className="mt-3 text-3xl font-bold md:text-4xl"
        >
          Большой выбор моторных масел
        </h2>

        <p className="mt-5 text-white/80">
          Масла для автомобилей, мотоциклов, квадроциклов
          и лодочных моторов. Поможем подобрать подходящее
          масло с учётом требований производителя техники.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {oilCategories.map((category) => (
          <OilCategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
          />
        ))}
      </div>

      <a
        href="#selection"
        className="mt-8 inline-block rounded-lg bg-brand-cyan px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-light-blue"
      >
        Помочь с подбором масла
      </a>
    </section>
  );
}