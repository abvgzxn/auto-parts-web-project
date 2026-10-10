import { siteConfig } from "@/lib/site-config";
import StoreMap from "@/components/store-map";

export default function Contacts() {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
    >
      <h2
        id="contacts-title"
        className="text-3xl font-bold text-brand-navy md:text-4xl"
      >
        Контакты Wellcar
      </h2>

      <p className="mt-4 text-muted">
        Ждём вас в нашем магазине в Калязине.
        Также вы можете связаться с нами по телефону
        или через MAX.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <h3 className="text-xl font-semibold text-brand-navy">
            Адрес
          </h3>

          <p className="mt-3 text-muted">
            {siteConfig.address.full}
          </p>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-semibold text-brand-cyan hover:underline"
          >
            Открыть в Яндекс Картах
          </a>

          <h3 className="mt-8 text-xl font-semibold text-brand-navy">
            Режим работы
          </h3>

          <dl className="mt-4 space-y-3">
            {siteConfig.workingHours.map((item) => (
              <div
                key={item.days}
                className="flex justify-between gap-4"
              >
                <dt className="text-muted">{item.days}</dt>
                <dd className="font-medium text-brand-navy">
                  {item.hours}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <h3 className="text-xl font-semibold text-brand-navy">
            Связаться с нами
          </h3>

          <div className="mt-5 flex flex-col items-start gap-3">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="text-lg font-semibold text-brand-navy hover:text-brand-cyan"
              >
                {phone.label}
              </a>
            ))}

            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand-cyan hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          <a
            href={siteConfig.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-cyan px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-light-blue"
          >
            Написать в MAX
          </a>
        </div>
      </div>

      <div className="mt-8">
        <StoreMap />
      </div>
    </section>
  );
}
