import Link from "next/link";
import MaxLink from "@/components/ui/max-link";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  const rating = siteConfig.yandexRating;

  return (
    <footer className="bg-brand-navy text-white">
      <div className="site-container pt-10 md:pt-14">
        <div className="grid gap-8 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[1.1fr_1fr_0.9fr] lg:gap-x-16">
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex min-h-11 items-center rounded-sm text-3xl font-bold tracking-tight">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-brand-gray">
              Автозапчасти и моторные масла в наличии и на заказ.
              Подбор запчастей по VIN.
            </p>

            <section aria-labelledby="footer-rating-title" className="mt-5 max-w-xs">
              <div className="flex items-center gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6 shrink-0 text-brand-gray">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.75" />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
                </svg>
                <p className="text-3xl leading-none font-bold tracking-tight tabular-nums">
                  {rating.value.toLocaleString("ru-RU")}<span className="sr-only"> из {rating.maxValue}</span>
                </p>
                <span aria-hidden="true" className="text-lg leading-none tracking-wider text-[#ffd166]">★★★★★</span>
              </div>
              <h2 id="footer-rating-title" className="mt-2 text-sm leading-5 text-brand-gray">Рейтинг на Яндекс Картах</h2>
              <p className="text-sm leading-5 text-brand-gray">{rating.ratingCount} оценок</p>
              <a
                href={rating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-sm py-2 text-sm leading-5 underline underline-offset-4 hover:decoration-2"
              >
                Читать отзывы на Яндекс Картах
              </a>
            </section>
          </div>

          <div className="min-w-0 border-t border-white/20 pt-8 md:border-0 md:pt-1">
            <h2 className="text-lg font-semibold tracking-tight">Адрес и время работы</h2>
            <address className="mt-4 max-w-xs text-sm leading-6 text-brand-gray not-italic">
              {siteConfig.address.full}
            </address>
            <dl className="mt-5 max-w-xs space-y-3 text-sm">
              {siteConfig.workingHours.map((item) => (
                <div key={item.days} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                  <dt className="text-brand-gray">{item.days}</dt>
                  <dd className="font-semibold tabular-nums">{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 border-t border-white/20 pt-8 md:border-0 md:pt-1">
            <h2 className="text-lg font-semibold tracking-tight">Связаться с нами</h2>
            <div className="mt-3 flex flex-col items-start">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="inline-flex min-h-11 items-center rounded-sm text-lg font-semibold underline-offset-4 hover:underline"
                >
                  {phone.label}
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 inline-flex min-h-11 items-center rounded-sm text-sm text-brand-gray underline underline-offset-4 hover:decoration-2"
              >
                {siteConfig.email}
              </a>
              <MaxLink
                text="Написать в MAX"
                className="mt-4 min-h-12 justify-center rounded-lg border border-white/40 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/20 py-5 text-sm text-brand-gray md:mt-12">
          <p className="leading-6">© {new Date().getFullYear()} {siteConfig.name}. Все права защищены.</p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-white underline-offset-4 hover:underline">
            Наверх <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
