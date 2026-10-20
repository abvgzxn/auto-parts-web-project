import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HeroCarousel from "@/components/home/hero-carousel";

export const metadata: Metadata = {
  title: "Предпросмотр карусели — ВЕЛКАР",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CarouselPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main className="site-container py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Предпросмотр Hero Carousel
      </h1>

      <HeroCarousel />
    </main>
  );
}