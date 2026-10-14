"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MaxLink from "@/components/ui/max-link";
import { heroSlides } from "@/lib/hero-slides";

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Manual navigation pauses the timer so it cannot replace the chosen slide.
  const nextSlide = () => {
    setIsPaused(true);
    setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setIsPaused(true);
    setActiveIndex((currentIndex) =>
      (currentIndex - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: number | undefined;

    const syncAutoplay = () => {
      window.clearInterval(intervalId);
      intervalId = undefined;
      if (isPaused || mediaQuery.matches || heroSlides.length <= 1) return;

      intervalId = window.setInterval(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
      }, 6000);
    };

    mediaQuery.addEventListener("change", syncAutoplay);
    syncAutoplay();
    return () => {
      mediaQuery.removeEventListener("change", syncAutoplay);
      window.clearInterval(intervalId);
    };
  }, [isPaused]);

  return (
    <section aria-label="Сезонные предложения" aria-roledescription="карусель" className="hero-carousel">
      <div className="hero-slides" onFocusCapture={() => setIsPaused(true)} aria-live={isPaused ? "polite" : "off"} aria-atomic="true">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="hero-slide" data-active={index === activeIndex} inert={index !== activeIndex} aria-hidden={index !== activeIndex}>
            <div className="hero-copy">
              <p className="hero-eyebrow"><span aria-hidden="true" />{slide.eyebrow}</p>
              <h2>{slide.title}</h2>
              <p className="hero-accent">{slide.accent}</p>
              <p className="hero-description">{slide.description}</p>
              <MaxLink text={slide.ctaLabel} className="hero-cta" />
            </div>
            <div className="hero-visual">
              {slide.imageSrc ? (index === activeIndex ? (
                <Image src={slide.imageSrc} alt={slide.imageAlt ?? slide.title} fill sizes="(min-width: 1024px) 480px, (min-width: 768px) 40vw, 85vw" className="hero-product" loading={index === 0 ? "eager" : "lazy"} />
              ) : null) : (
                <>
                  <svg className="hero-symbol" viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="120" cy="120" r="108" strokeWidth="1" />
                    <circle cx="120" cy="120" r="92" strokeWidth="1" strokeDasharray="2 12" />
                    {slide.id === "motor-oils" ? <path d="M120 52C104 80 76 106 76 136a44 44 0 0 0 88 0c0-30-28-56-44-84Zm-25 86c0 14 10 25 25 25" /> : slide.id === "winter-fluid" ? <path d="M120 56v128M65 88l110 64M65 152l110-64M104 65l16 16 16-16M104 175l16-16 16 16M66 107l22-6-6-22M158 161l-6-22 22-6M82 161l6-22-22-6M174 107l-22-6 6-22" /> : <path d="m130 56-42 74h34l-12 54 44-78h-34l10-50Z" />}
                  </svg>
                  <p className="hero-visual-label">{slide.id === "motor-oils" ? "LUKOIL" : slide.id === "batteries" ? "АКОМ" : "Зимний уход"}</p>
                  <p className="hero-visual-caption">{slide.id === "motor-oils" ? "Защита двигателя" : slide.id === "batteries" ? "Энергия для старта" : "Чистое стекло. Хороший обзор."}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="hero-controls">
        <div className="hero-arrows">
          <button type="button" onClick={previousSlide} aria-label="Предыдущий слайд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="m14 6-6 6 6 6M8 12h12" />
            </svg>
          </button>
          <span aria-live="off">{activeIndex + 1} / {heroSlides.length}</span>
          <button type="button" onClick={nextSlide} aria-label="Следующий слайд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="m10 6 6 6-6 6M4 12h12" />
            </svg>
          </button>
        </div>
        <div className="hero-indicators" role="group" aria-label="Выбор слайда">
          {heroSlides.map((slide, index) => (
            <button key={slide.id} type="button" onClick={() => goToSlide(index)} aria-label={`Показать слайд ${index + 1}: ${slide.title}`} aria-pressed={activeIndex === index}><span /></button>
          ))}
        </div>
        <button type="button" className="hero-pause" onClick={() => setIsPaused((current) => !current)} aria-pressed={isPaused}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            {isPaused ? <path d="m8 5 11 7-11 7V5Z" /> : <path d="M8 5v14M16 5v14" />}
          </svg>
          <span>{isPaused ? "Продолжить" : "Пауза"}</span>
        </button>
      </div>
    </section>
  );
}
