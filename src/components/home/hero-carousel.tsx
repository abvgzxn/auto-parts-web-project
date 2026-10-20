"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import MaxLink from "@/components/ui/max-link";
import { heroSlides } from "@/lib/hero-slides";
import type { HeroSlide } from "@/types/hero-slide";

function HeroSlideImage({ slide, first }: { slide: HeroSlide; first: boolean }) {
  const common = {
    alt: slide.imageAlt,
    quality: 90,
    loading: first ? "eager" as const : "lazy" as const,
    fetchPriority: first ? "high" as const : "auto" as const,
  };
  const { props: desktop } = getImageProps({
    ...common, src: slide.imageSrc, width: 1387, height: 1134,
    sizes: "(min-width: 1280px) 810px, (min-width: 1024px) calc((100vw - 66px) * 2 / 3), calc(100vw - 290px)",
  });
  const { props: mobile } = getImageProps({
    ...common, quality: 75, src: slide.mobileImageSrc,
    width: slide.mobileImageWidth, height: slide.mobileImageHeight,
    sizes: "calc(100vw - 66px)",
  });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} width={1387} height={1134} />
      {/* getImageProps supplies the responsive Next.js image URLs. */}
      <img {...mobile} alt={slide.imageAlt} className="hero-product" />
    </picture>
  );
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isRotationStopped = isPaused || isFocusPaused;
  const isAutoplayPaused = isRotationStopped || isHovered;

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

  const pointerStopped = useRef<boolean | null>(null);
  const togglePause = () => {
    const wasStopped = pointerStopped.current ?? isRotationStopped;
    pointerStopped.current = null;
    if (wasStopped) {
      setIsPaused(false);
      setIsFocusPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: number | undefined;

    const syncAutoplay = () => {
      window.clearInterval(intervalId);
      intervalId = undefined;
      if (isAutoplayPaused || mediaQuery.matches || heroSlides.length <= 1) {
        return;
      }

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
  }, [isAutoplayPaused]);

  return (
    <section aria-label="Сезонные предложения" aria-roledescription="карусель" className="hero-carousel" onFocusCapture={() => setIsFocusPaused(true)} onPointerEnter={(event) => { if (event.pointerType === "mouse") setIsHovered(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setIsHovered(false); }}>
      <button type="button" className="hero-pause" onPointerDown={() => { pointerStopped.current = isRotationStopped; }} onPointerCancel={() => { pointerStopped.current = null; }} onClick={togglePause}
        aria-label={isRotationStopped ? "Продолжить" : "Пауза"}
        title={isRotationStopped ? "Продолжить" : "Пауза"} aria-pressed={isRotationStopped}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          {isRotationStopped ? <path d="m8 5 11 7-11 7V5Z" /> : <path d="M8 5v14M16 5v14" />}
        </svg>
      </button>
      <div className="hero-slides" aria-live={isAutoplayPaused ? "polite" : "off"} aria-atomic="true">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="hero-slide" data-active={index === activeIndex} data-product={slide.id} inert={index !== activeIndex} aria-hidden={index !== activeIndex}>
            <h2 className="hero-slide-title">{slide.title}</h2>
            <div className="hero-copy">
              <div className="hero-details">
                <p className="hero-accent">{slide.accent}</p>
                <p className="hero-description">{slide.description}</p>
              </div>
              <MaxLink text={slide.ctaLabel} className="hero-cta" />
            </div>
            <div className="hero-visual">
              {index === activeIndex ? <HeroSlideImage slide={slide} first={index === 0} /> : null}
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

      </div>
    </section>
  );
}
