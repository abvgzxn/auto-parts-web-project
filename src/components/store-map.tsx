"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function StoreMap() {
  const [isMapVisible, setIsMapVisible] = useState(false);

  const { longitude, latitude } = siteConfig.coordinates;
  const storeCoordinates = `${longitude},${latitude}`;

  const mapUrl =
    `https://yandex.ru/map-widget/v1/?ll=${storeCoordinates}` +
    `&z=17&pt=${storeCoordinates},pm2rdm&l=map&lang=ru_RU`;

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <figcaption className="border-b border-border px-6 py-4">
        <h3 className="text-xl font-semibold text-brand-navy">
          Магазин {siteConfig.name} на карте
        </h3>
        <p className="mt-2 text-muted">
          {siteConfig.address.full}
        </p>
      </figcaption>

      {isMapVisible ? (
        <iframe
          title={`Магазин ${siteConfig.name}: ${siteConfig.address.full}`}
          src={mapUrl}
          width="100%"
          height="400"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="block h-80 w-full border-0 md:h-[400px]"
        />
      ) : (
        <div className="flex h-80 flex-col items-center justify-center gap-4 bg-brand-navy/5 px-6 text-center md:h-[400px]">
          <p className="max-w-md text-base text-brand-navy">
            Чтобы посмотреть расположение магазина,
            загрузите интерактивную Яндекс Карту.
          </p>

          <button
            type="button"
            onClick={() => setIsMapVisible(true)}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            Показать карту
          </button>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center font-semibold text-brand-navy underline-offset-4 hover:underline"
          >
            Открыть в Яндекс Картах
          </a>
        </div>
      )}
    </figure>
  );
}