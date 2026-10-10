import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden rounded-2xl bg-brand-navy text-white"
      aria-labelledby="hero-title"
    >
      {/* Фоновое изображение */}
      <Image
        src="/images/hero/car-hero.png"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 90vw"
        className="object-cover object-center"
      />

      {/* Градиент для читаемости текста */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/75 to-transparent"
      />

      {/* Содержимое Hero */}
      <div className="relative z-10 flex min-h-[460px] items-center px-6 py-14 md:min-h-[540px] md:px-12 lg:px-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/85">
            Магазин автозапчастей в Калязине
          </p>
          <h1
            id="hero-title"
            className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            Автозапчасти и моторные масла
            <span className="mt-2 block text-brand-cyan">
              в наличии и на заказ
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg">
            Подбор запчастей по VIN. Большой ассортимент
            масел для автомобилей, мотоциклов, квадроциклов
            и лодочных моторов.
          </p>

         
        <div className="mt-8 flex flex-wrap gap-3">
          <a
          href={siteConfig.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-7 py-3 font-semibold text-brand-navy transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Подобрать по VIN в MAX
        </a>

  <a
    href="#contacts"
    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  >
    Позвонить
  </a>
</div>

        </div>
      </div>
    </section>
  );
}