import HeroCarousel from "@/components/home/hero-carousel";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-frame">
      <h1 id="hero-title" className="hero-intro">
        Автозапчасти и моторные масла в наличии и на заказ
      </h1>
      <HeroCarousel />
      <div className="hero-store-links">
        <span>Wellcar — магазин автозапчастей в Калязине</span>
        <a href="#contacts">Телефоны магазина</a>
      </div>
    </section>
  );
}
