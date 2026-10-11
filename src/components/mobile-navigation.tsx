"use client";

import { useRef } from "react";

type NavigationLink = {
  href: string;
  label: string;
};

type MobileNavigationProps = {
  links: readonly NavigationLink[];
};

export default function MobileNavigation({
  links,
}: MobileNavigationProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <details
      ref={detailsRef}
      className="group w-full min-w-0 lg:hidden"
    >
      <summary className="absolute right-4 top-11 flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-lg border border-brand-light-blue px-4 py-3 font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
        Меню
        <span aria-hidden="true" className="group-open:rotate-180">
          ▾
        </span>
      </summary>

      <nav
        aria-label="Мобильная навигация"
        className="mt-4 border-t border-brand-light-blue pt-2"
      >
        <ul>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={closeMenu}
                className="flex min-h-12 items-center rounded-lg px-4 py-3 hover:bg-white/10 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacts"
          onClick={closeMenu}
          className="mt-2 flex min-h-12 items-center justify-center rounded-lg bg-white px-4 py-3 font-semibold text-brand-navy hover:bg-brand-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Телефоны магазина
        </a>
      </nav>
    </details>
  );
}