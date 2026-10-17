import MaxLink from "@/components/ui/max-link";
import { siteConfig } from "@/lib/site-config";

export default function Selection() {
  return (
    <section
      id="selection"
      aria-labelledby="selection-title"
      className="relative rounded-xl border border-border bg-surface p-5 pt-8 md:p-10 lg:p-12"
    >
      <span aria-hidden="true" className="absolute top-0 left-5 h-1 w-16 rounded-b bg-brand-cyan md:left-10 lg:left-12" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <div className="min-w-0">
          <h2
            id="selection-title"
            className="max-w-xl text-3xl leading-tight font-bold tracking-tight text-brand-navy md:text-4xl"
          >
            Поможем подобрать нужную запчасть
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-7 text-foreground">
            Уточним наличие, совместимость и возможность заказа. Напишите в MAX
            или позвоните — подскажем, какие детали подойдут вашему автомобилю.
          </p>

          <div className="mt-6 max-w-xl border-l-2 border-brand-cyan pl-4 text-sm leading-6 text-muted">
            <h3 className="font-semibold text-brand-navy">Что сообщить продавцу</h3>
            <p className="mt-1">
              Марку, модель и год выпуска автомобиля, артикул или фото детали.
              При необходимости продавец поможет с подбором по VIN.
            </p>
            <p className="mt-2">Цену и срок поставки уточним при обращении.</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <MaxLink
            text="Уточнить наличие в MAX"
            className="min-h-12 justify-center rounded-lg bg-brand-navy px-4 py-3 font-semibold text-white hover:bg-[#003653] focus-visible:outline-brand-navy"
          />
          <p className="mt-6 mb-3 text-sm text-muted">Или позвоните в магазин</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-lg border border-border bg-white px-3 py-3 font-semibold text-brand-navy hover:border-brand-navy hover:bg-surface"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z" />
                </svg>
                {phone.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
