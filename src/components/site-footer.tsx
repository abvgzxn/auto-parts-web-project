import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="site-container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center text-2xl font-bold">
              {siteConfig.name}
            </Link>

            <p className="mt-4 text-sm text-white/75">
              Автозапчасти и моторные масла
              в наличии и на заказ.
              Подбор запчастей по VIN.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Адрес и время работы
            </h2>

            <address className="mt-4 text-sm not-italic text-white/75">
              {siteConfig.address.full}
            </address>

            <dl className="mt-4 space-y-2 text-sm">
              {siteConfig.workingHours.map((item) => (
                <div key={item.days} className="flex gap-4">
                  <dt className="text-white/70">
                    {item.days}
                  </dt>
                  <dd>{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Связаться с нами
            </h2>

            <div className="mt-4 flex flex-col items-start gap-3 text-sm">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="inline-flex min-h-11 items-center hover:underline"
                >
                  {phone.label}
                </a>
              ))}

              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center hover:underline"
              >
                {siteConfig.email}
              </a>

              <a
                href={siteConfig.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-semibold text-white hover:underline"
              >
                Написать в MAX
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/75">
          <p>
            © {new Date().getFullYear()} Wellcar.
            Все права защищены.
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center rounded-sm text-white/90 hover:underline">
            Наверх ↑
          </a>
        </div>
      </div>
    </footer>
  );
}