import type { HeroSlide } from "@/types/hero-slide";
import { siteConfig } from "@/lib/site-config";

export const heroSlides: HeroSlide[] = [
  {
    id: "motor-oils",
    eyebrow: "Моторные масла в наличии",
    title: "Моторные масла",
    accent: "Надёжная защита двигателя начинается с правильного масла!",
    description:
      "Моторные масла LUKOIL и других производителей уже в Wellcar. Поможем подобрать масло для вашего автомобиля.",
    ctaLabel: "Подобрать масло в MAX",
    ctaHref: siteConfig.maxUrl,
  },
  {
    id: "winter-fluid",
    eyebrow: "Всё для зимнего сезона",
    title: "Незамерзающая жидкость",
    accent: "Подготовь автомобиль к зиме!",
    description:
      "Незамерзающая жидкость уже в наличии в Wellcar. Чистое стекло и хороший обзор даже в мороз.",
    ctaLabel: "Уточнить наличие в MAX",
    ctaHref: siteConfig.maxUrl,
  },
  {
    id: "batteries",
    eyebrow: "Аккумуляторы в наличии",
    title: "Автомобильные аккумуляторы",
    accent: "Уверенный запуск даже в холодное утро!",
    description:
      "Автомобильные аккумуляторы АКОМ и других производителей в наличии. Поможем подобрать подходящий АКБ.",
    ctaLabel: "Подобрать АКБ в MAX",
    ctaHref: siteConfig.maxUrl,
  },
] satisfies HeroSlide[];
