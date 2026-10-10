import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function AboutStore() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10"
    >
      <Image
        src="/images/store/storefront.webp"
        alt="Фасад магазина Wellcar: вывеска «Велкар Автозапчасти» и вход"
        width={1280}
        height={960}
        sizes="(min-width: 1280px) 588px, (min-width: 1024px) calc((100vw - 104px) / 2), (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)"
        className="h-auto w-full rounded-2xl"
      />

      <div className="min-w-0">
        <h2
          id="about-title"
          className="text-3xl font-bold text-brand-navy md:text-4xl"
        >
          Магазин автозапчастей Wellcar в Калязине
        </h2>

        <p className="mt-5 text-lg leading-8 text-muted">
          Автозапчасти и моторные масла в наличии и на заказ.
          Помогаем подобрать запчасти по VIN автомобиля.
        </p>

        <p className="mt-4 leading-7 text-muted">
          В магазине представлены масла для автомобилей, мотоциклов,
          квадроциклов и лодочных моторов.
        </p>

        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-[#003653] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          Построить маршрут
        </a>
      </div>
    </section>
  );
}
