import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import Hero from "@/components/home/hero";
import Benefits from "@/components/home/benefits";
import Categories from "@/components/home/categories";
import Oils from "@/components/home/oils";
import Selection from "@/components/home/selection";
import AboutStore from "@/components/home/about-store";
import Contacts from "@/components/home/contacts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: siteConfig.name,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.address.country,
      addressRegion: siteConfig.address.region,
      addressLocality: siteConfig.city,
      streetAddress: siteConfig.address.street,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...siteConfig.coordinates,
    },
    telephone: siteConfig.phones.map((phone) => phone.href.replace(/^tel:/, "")),
    email: siteConfig.email,
    openingHoursSpecification: siteConfig.workingHours.map((schedule) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: schedule.schemaDays.map((day) => `https://schema.org/${day}`),
      opens: schedule.opens,
      closes: schedule.closes,
    })),
    hasMap: siteConfig.mapsUrl,
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-white focus-visible:px-4 focus-visible:py-3 focus-visible:font-semibold focus-visible:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
      >
        Перейти к содержимому
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-background">
        <div className="site-container flex flex-col gap-12 py-8 md:gap-16">
          <Hero />
          <Benefits />
          <Categories />
          <Oils />
          <Selection />
          <AboutStore />
          <Contacts />
        </div>
      </main>
    </>
  );
}
