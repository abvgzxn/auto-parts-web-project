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
    <figure className="overflow-hidden rounded-xl border border-border bg-surface">
      <figcaption className="sr-only">
        Магазин {siteConfig.name} на карте: {siteConfig.address.full}
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
        <div className="flex h-80 flex-col items-center justify-center bg-brand-cyan/10 px-5 py-5 text-center md:h-[400px] md:px-8">
          <svg aria-hidden="true" focusable="false" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-brand-navy">
            <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <h3 className="mt-3 text-xl leading-tight font-semibold tracking-tight text-brand-navy md:text-2xl">
            Магазин {siteConfig.name} на карте
          </h3>
          <p className="mt-2 max-w-md text-sm leading-5 text-foreground md:text-base md:leading-6">
            {siteConfig.address.full}
          </p>

          <button
            type="button"
            onClick={() => setIsMapVisible(true)}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            Показать карту
          </button>

          <p className="mt-3 max-w-sm text-xs leading-5 text-foreground md:text-sm">
            Интерактивная карта загрузится после нажатия.
          </p>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-brand-navy underline underline-offset-4 hover:decoration-2"
          >
            Открыть в Яндекс Картах
          </a>
        </div>
      )}
    </figure>
  );
}
