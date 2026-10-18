import MaxLink from "@/components/ui/max-link";
import { siteConfig } from "@/lib/site-config";
import StoreMap from "@/components/store-map";

export default function Contacts() {
  return (
    <section id="contacts" aria-labelledby="contacts-title">
      <h2
        id="contacts-title"
        className="text-3xl leading-tight font-bold tracking-tight text-brand-navy md:text-4xl"
      >
        Контакты Wellcar
      </h2>
      <p className="mt-4 max-w-xl leading-7 text-muted">
        Ждём вас в нашем магазине в Калязине. Также вы можете связаться
        с нами по телефону или через MAX.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-5 md:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-brand-navy">
            Адрес и режим работы
          </h3>
          <address className="mt-5 max-w-md text-lg leading-7 text-foreground not-italic">
            {siteConfig.address.full}
          </address>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center self-start rounded-sm py-2 font-semibold text-brand-navy underline underline-offset-4 hover:decoration-2"
          >
            Открыть в Яндекс Картах
          </a>
          <div className="mt-6 border-t border-border pt-6">
            <h4 className="font-semibold text-brand-navy">Режим работы</h4>
            <dl className="mt-3 space-y-3">
              {siteConfig.workingHours.map((item) => (
                <div key={item.days} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                  <dt className="text-muted">{item.days}</dt>
                  <dd className="font-semibold text-brand-navy tabular-nums">{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-5 md:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-brand-navy">
            Связаться с нами
          </h3>
          <div className="mt-4 flex flex-col items-start gap-1">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="inline-flex min-h-12 items-center rounded-sm py-2 text-xl font-semibold text-brand-navy underline-offset-4 hover:underline"
              >
                {phone.label}
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center rounded-sm py-2 text-brand-navy underline underline-offset-4 hover:decoration-2"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <MaxLink
              text="Написать в MAX"
              className="min-h-12 w-full justify-center rounded-lg bg-brand-navy px-4 py-3 font-semibold text-white hover:bg-[#003653] focus-visible:outline-brand-navy sm:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <StoreMap />
      </div>
    </section>
  );
}
