import MaxLink from "@/components/ui/max-link";
import { siteConfig } from "@/lib/site-config";

export default function Selection() {
  return (
    <section
      id="selection"
      aria-labelledby="selection-title"
      className="rounded-2xl bg-[#F3F7FA] px-4 py-12 md:px-10 md:py-16"
    >
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-brand-navy">
          Консультация продавца
        </p>

        <h2
          id="selection-title"
          className="mt-3 text-3xl font-bold text-brand-navy [overflow-wrap:anywhere] md:text-4xl"
        >
          Уточним наличие, совместимость и заказ деталей
        </h2>

        <p className="mt-5 text-lg leading-8 text-muted">
          Напишите в MAX или позвоните: обсудим нужную деталь,
          её совместимость, наличие и возможность заказа.
          Сообщите марку, модель и год выпуска, артикул или
          пришлите фото детали. При необходимости продавец
          поможет с подбором по VIN. Цену и срок поставки уточним при обращении.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <MaxLink
          text="Уточнить наличие в MAX"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#003653] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        />
        {siteConfig.phones.map((phone) => (
          <a
            key={phone.href}
            href={phone.href}
            className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#003653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
          >
            {phone.label}
          </a>
        ))}
      </div>
    </section>
  );
}
