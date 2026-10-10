
type Category = {
  id: string;
  title: string;
  description: string;
};

const categories: Category[] = [
  {
    id: "parts",
    title: "Автозапчасти",
    description:
      "Фильтры, тормозные колодки, ремни, свечи и детали подвески.",
  },
  {
    id: "oils",
    title: "Моторные масла",
    description:
      "Масла для автомобилей, мотоциклов, квадроциклов и лодочных моторов.",
  },
  {
    id: "fluids",
    title: "Автохимия и технические жидкости",
    description:
      "Антифризы, технические жидкости и средства ухода за автомобилем.",
  },
  {
    id: "tires",
    title: "Шины и диски",
    description:
      "Подбор шин и дисков для различных автомобилей под заказ.",
  },
];

export default function Categories() {
  return (
    <section
      id="assortment"
      aria-labelledby="categories-title"
    >
      <h2
        id="categories-title"
        className="text-3xl font-bold text-brand-navy"
      >
        Ассортимент Wellcar
      </h2>

      <p className="mt-4 max-w-2xl text-muted">
        Запчасти, моторные масла и расходные материалы
        для автомобилей и другой техники.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.id}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-xl font-semibold text-brand-navy">
              {category.title}
            </h3>

            <p className="mt-3 leading-6 text-muted">
              {category.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
