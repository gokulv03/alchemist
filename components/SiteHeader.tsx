"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { spiritShelf } from "@/lib/data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header-inner">
        <Link href="/" className="brand" aria-label="Alchemist — home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M9 3h6M10 3v5.5L5.5 17a3 3 0 0 0 2.7 4.3h7.6A3 3 0 0 0 18.5 17L14 8.5V3"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M7.4 14h9.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-word">Alchemist</span>
        </Link>

        <nav className="spirit-nav" aria-label="Spirits">
          {spiritShelf.map((s) => (
            <Link
              key={s.slug}
              href={s.available ? `/spirits/${s.slug}` : "#"}
              className="spirit-nav-link"
              aria-current={s.available ? "page" : undefined}
              data-disabled={!s.available}
            >
              {s.name}
            </Link>
          ))}
        </nav>

        <Link href="/cocktails" className="btn btn-ghost header-cta">
          Browse cocktails
        </Link>
      </div>
    </header>
  );
}
