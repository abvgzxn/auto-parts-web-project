import { siteConfig } from "@/lib/site-config";

export default function Selection() {
  return (
    <section
      id="selection"
      aria-labelledby="selection-title"
      className="rounded-2xl bg-[#F3F7FA] px-4 py-12 md:px-10 md:py-16"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan">
          Подбор запчастей
        </p>

        <h2
          id="selection-title"
          className="mt-3 text-3xl font-bold text-brand-navy [overflow-wrap:anywhere] md:text-4xl"
        >
          Не знаете артикул? Подберём по VIN
        </h2>

        <p className="mt-5 text-lg leading-8 text-muted">
          Поможем подобрать совместимые запчасти
          для вашего автомобиля. Сообщите VIN или
          данные автомобиля — проконсультируем
          по наличию и срокам поставки.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
         href={siteConfig.maxUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#003653] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
          Написать в MAX
          </a>
        {siteConfig.phones.map((phone) => (
          <a
            key={phone.href}
            href={phone.href}
            className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-cyan"
          >
            {phone.label}
          </a>
        ))}
      </div>
    </section>
  );
}
