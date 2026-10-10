import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
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
      className="rounded-2xl bg-brand-navy px-4 py-12 text-white md:px-10 md:py-16"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/85">
            Ассортимент Wellcar
          </p>

          <h2
            id="oils-title"
            className="mt-3 text-3xl font-bold md:text-4xl"
          >
            Большой выбор моторных масел
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
            Масла для автомобилей, мотоциклов, квадроциклов
            и лодочных моторов. Поможем подобрать подходящее
            масло с учётом требований производителя техники.
          </p>

          <a
            href={siteConfig.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand-cyan px-6 py-3 text-center font-semibold text-foreground hover:bg-brand-light-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Подобрать масло в MAX
          </a>
        </div>

        <Image
          src="/images/store/motor-oils.webp"
          alt="Канистры моторных масел разных марок на полках магазина Wellcar"
          width={1280}
          height={960}
          sizes="(min-width: 1280px) 548px, (min-width: 1024px) calc((100vw - 184px) / 2), (min-width: 768px) calc(100vw - 128px), calc(100vw - 64px)"
          className="h-auto w-full rounded-xl lg:col-start-1 lg:row-start-1"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
        {oilCategories.map((category) => (
          <OilCategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
          />
        ))}
      </div>
    </section>
  );
}
