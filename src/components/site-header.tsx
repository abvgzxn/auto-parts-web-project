import Link from "next/link";
import BrandLogo from "@/components/ui/brand-logo";
import { siteConfig } from "@/lib/site-config";

const navigationLinks = [
  { href: "#assortment", label: "Ассортимент" },
  { href: "#oils", label: "Масла" },
  { href: "#selection", label: "Подбор" },
  { href: "#contacts", label: "Контакты" },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function SiteHeader() {
  return (
    <header className="bg-brand-navy text-white">
      <div className="site-container relative flex flex-wrap items-center justify-between gap-x-4 py-5 md:flex-nowrap md:gap-4">
        <Link href="/" className={`shrink-0 rounded-lg ${focusStyle}`}>
          <BrandLogo width={125} height={100} />
        </Link>

        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-6">
            {navigationLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`inline-flex min-h-12 items-center rounded-sm hover:text-brand-light-blue ${focusStyle}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={siteConfig.phones[0].href}
          className={`hidden shrink-0 rounded-lg bg-white px-4 py-3 font-semibold text-brand-navy hover:bg-brand-gray md:inline-flex ${focusStyle}`}
        >
          Позвонить
        </a>

        <details className="group w-full min-w-0 md:hidden">
          <summary
            className={`absolute right-4 top-11 flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-lg border border-brand-light-blue px-4 py-3 font-semibold hover:bg-white/10 [&::-webkit-details-marker]:hidden ${focusStyle}`}
          >
            Меню
            <span aria-hidden="true" className="group-open:rotate-180">
              ▾
            </span>
          </summary>
          <nav aria-label="Мобильная навигация" className="mt-4 border-t border-brand-light-blue pt-2">
            <ul>
              {navigationLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`flex min-h-12 items-center rounded-lg px-4 py-3 hover:bg-white/10 hover:text-brand-light-blue ${focusStyle}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.phones[0].href}
              className={`mt-2 flex min-h-12 items-center justify-center rounded-lg bg-white px-4 py-3 font-semibold text-brand-navy hover:bg-brand-gray ${focusStyle}`}
            >
              Позвонить
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
