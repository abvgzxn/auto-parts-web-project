import Link from "next/link";
import BrandLogo from "@/components/ui/brand-logo";
import MaxLink from "@/components/ui/max-link";
import MobileNavigation from "@/components/mobile-navigation";
import { siteConfig } from "@/lib/site-config";

const navigationLinks = [
  { href: "#assortment", label: "Ассортимент" },
  { href: "#oils", label: "Масла" },
  { href: "#selection", label: "Подбор" },
  { href: "#about", label: "О магазине" },
  { href: "#contacts", label: "Контакты" },
];

export default function SiteHeader() {
  const phone = siteConfig.phones[0];
  return (
    <header id="top" className="wellcar-header">
      <div className="header-info">
        <div className="site-container header-info-inner">
          <span>{siteConfig.address.short}</span>
          <div className="header-hours">
            {siteConfig.workingHours.map(({ days, hours }) => (
              <span key={days}>{days} {hours}</span>
            ))}
          </div>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
            Открыть в Яндекс Картах
          </a>
        </div>
      </div>
      <div className="site-container header-main">
        <Link href="/" className="header-logo">
          <BrandLogo width={100} height={80} />
        </Link>
        <nav aria-label="Основная навигация" className="header-desktop-nav">
          <ul>
            {navigationLinks.map(({ href, label }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <a href={phone.href} className="header-phone" aria-label={`Позвонить в ВЕЛКАР: ${phone.label}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
            </svg>
            <span>{phone.label}</span>
          </a>
          <MaxLink text="Написать в MAX" className="header-max header-max-desktop" />
          <MaxLink text="MAX" className="header-max header-max-mobile" />
        </div>
        <MobileNavigation links={navigationLinks} />
      </div>
    </header>
  );
}
