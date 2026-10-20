import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function AboutStore() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12"
    >
      <Image
        src="/images/store/storefront.webp"
        alt="Фасад магазина ВЕЛКАР: вывеска «ВЕЛКАР Автозапчасти» и вход"
        width={1280}
        height={960}
        sizes="(min-width: 1280px) 584px, (min-width: 1024px) calc((100vw - 112px) / 2), (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 32px)"
        className="h-auto w-full rounded-2xl border border-border"
      />

      <div className="min-w-0">
        <span aria-hidden="true" className="mb-5 block h-1 w-12 rounded-full bg-brand-cyan" />
        <h2
          id="about-title"
          className="max-w-xl text-3xl leading-tight font-bold tracking-tight text-brand-navy lg:text-4xl"
        >
          Магазин автозапчастей ВЕЛКАР в Калязине
        </h2>

        <p className="mt-4 max-w-xl text-base leading-7 text-foreground lg:mt-5 lg:text-lg">
          В нашем магазине в Калязине — автозапчасти и расходники,
          большой ассортимент моторных масел. Товары доступны в наличии
          и под заказ.
        </p>

        <address className="mt-5 flex items-start gap-2.5 border-t border-border pt-5 text-sm leading-6 text-muted not-italic lg:mt-6 lg:pt-6">
          <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-brand-navy">
            <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>г. {siteConfig.address.short}.</span>
        </address>

        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 w-full md:w-auto items-center justify-center rounded-xl bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#003653] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          Построить маршрут
        </a>
      </div>
    </section>
  );
}
