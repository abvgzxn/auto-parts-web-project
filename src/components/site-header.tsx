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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:flex-nowrap md:px-6">
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
          className={`shrink-0 rounded-lg bg-brand-cyan px-4 py-3 font-semibold text-white hover:bg-brand-light-blue ${focusStyle}`}
        >
          Позвонить
        </a>

        <details className="w-full min-w-0 rounded-lg border border-brand-light-blue md:hidden">
          <summary
            className={`min-h-12 cursor-pointer rounded-lg px-4 py-3 font-semibold hover:bg-white/10 ${focusStyle}`}
          >
            Меню
          </summary>
          <nav aria-label="Мобильная навигация" className="border-t border-brand-light-blue p-2">
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
          </nav>
        </details>
      </div>
    </header>
  );
}
