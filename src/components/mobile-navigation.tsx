"use client";

import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";

type MobileNavigationProps = {
  links: readonly { href: string; label: string }[];
};

export default function MobileNavigation({ links }: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

const closeMenu = () => {
  if (detailsRef.current) {
    detailsRef.current.open = false;
  }
};

const closeMenuAndRestoreFocus = () => {
  closeMenu();
  summaryRef.current?.focus();
};

  return (
    <details 
    ref={detailsRef} 
    className="header-mobile-menu group"
    onKeyDown={(event) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        event.preventDefault();
        closeMenuAndRestoreFocus();
      }
    }}>
      <summary ref={summaryRef} aria-label="Меню" className="header-menu-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <g className="group-open:hidden"><path d="M4 6h16M4 12h16M4 18h16" /></g>
          <path className="hidden group-open:block" d="m6 6 12 12M18 6 6 18" />
        </svg>
      </summary>
      <div className="header-menu-panel">
        <nav aria-label="Мобильная навигация">
          <ul>{links.map(({ href, label }) => (
            <li key={href}><a href={href} onClick={closeMenu}>{label}</a></li>
          ))}</ul>
        </nav>
        <div className="header-menu-contacts">
          <p>{siteConfig.address.full}</p>
          <div className="header-menu-hours">
            {siteConfig.workingHours.map(({ days, hours }) => (
              <p key={days}>{days} <span>{hours}</span></p>
            ))}
          </div>
          <div className="header-menu-phones">
            {siteConfig.phones.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          </div>
          <a className="header-map-link" href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах</a>
        </div>
      </div>
    </details>
  );
}
