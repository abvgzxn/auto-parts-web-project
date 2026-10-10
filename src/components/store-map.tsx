import { siteConfig } from "@/lib/site-config";

export default function StoreMap() {
  // Яндекс Карты принимают координаты в порядке: долгота, широта.
  const storeCoordinates = "37.839808,57.236612";
  const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${storeCoordinates}&z=17&pt=${storeCoordinates},pm2rdm&l=map&lang=ru_RU`;

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <figcaption className="border-b border-border px-6 py-4">
        <h3 className="text-xl font-semibold text-brand-navy">
          Магазин {siteConfig.name} на карте
        </h3>
        <p className="mt-2 text-muted">{siteConfig.address.full}</p>
      </figcaption>
      <iframe
        title={`Магазин ${siteConfig.name}: ${siteConfig.address.full}`}
        src={mapUrl}
        width="100%"
        height="400"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="block h-80 w-full border-0 md:h-[400px]"
      />
    </figure>
  );
}
