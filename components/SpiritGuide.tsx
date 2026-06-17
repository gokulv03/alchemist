"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import type { Spirit } from "@/lib/data";
import { SiteHeader } from "@/components/SiteHeader";
import { CocktailCard } from "@/components/CocktailCard";
import { GlassGlyph } from "@/components/atoms";
import { useReveal } from "@/components/useReveal";

export function SpiritGuide({
  spirit: s,
  slug,
}: {
  spirit: Spirit;
  slug: string;
}) {
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = s.spiritTheme;
    return () => {
      document.documentElement.dataset.theme = "indigo";
    };
  }, [s.spiritTheme]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section headings reveal as a single element …
  const servesHead = useReveal<HTMLElement>();
  const mixersHead = useReveal<HTMLElement>();
  const cocktailsHead = useReveal<HTMLElement>();
  // … lists/grids stagger their children.
  const serveList = useReveal<HTMLUListElement>({ stagger: true });
  const mixerGrid = useReveal<HTMLUListElement>({ stagger: true, groupSize: 4 });
  const cocktailGrid = useReveal<HTMLUListElement>({ stagger: true, groupByRow: true });

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <SiteHeader />
      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section
          className="hero"
          aria-labelledby="spirit-title"
          style={{ viewTransitionName: "hero" }}
        >
          <div
            className="hero-bg"
            aria-hidden="true"
            style={{ backgroundImage: `url(/heroes/${slug}.jpg)` }}
          />
          <div className="hero-bg-overlay" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker rise rise-1">A field guide to spirits</p>
              <h1 id="spirit-title" className="display hero-title rise rise-2">
                {s.name}
              </h1>
              <p className="hero-binomial rise rise-2">{s.binomial}</p>
              <p className="hero-intro prose rise rise-3">{s.intro}</p>

              <dl className="hero-facts rise rise-4">
                <div>
                  <dt>Strength</dt>
                  <dd>{s.abv} ABV</dd>
                </div>
                <div>
                  <dt>Home</dt>
                  <dd>{s.origin}</dd>
                </div>
                <div>
                  <dt>Cocktails</dt>
                  <dd>{s.cocktails.length} classics</dd>
                </div>
              </dl>

              <div className="hero-notes rise rise-5">
                <span className="hero-notes-label">Botanical profile</span>
                <ul className="note-pills">
                  {s.notes.map((n) => (
                    <li key={n.label} className="note-pill" title={n.detail}>
                      {n.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hero-actions rise rise-6">
                <a href="#cocktails" className="btn btn-primary">
                  Explore {s.cocktails.length} cocktails
                </a>
                <a href="#serves" className="btn btn-ghost">
                  How to drink it
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- WAYS TO DRINK ---------------- */}
        <section id="serves" className="section serves">
          <div className="container">
            <header ref={servesHead} className="section-head">
              <h2 className="display section-title">Ways to drink it</h2>
              <p className="section-lede prose">
                From a quiet pour to the canonical serves — start simple, then
                reach for the shaker.
              </p>
            </header>

            <ul ref={serveList} className="serve-list">
              {s.serves.map((serve) => (
                <li key={serve.name} className="serve-item">
                  <div className="serve-head">
                    <span className="serve-glass" aria-hidden="true">
                      <GlassGlyph kind={serve.glass} />
                    </span>
                    <h3 className="serve-name">{serve.name}</h3>
                  </div>
                  <p className="serve-blurb prose">{serve.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- MIXERS ---------------- */}
        <section id="mixers" className="section mixers">
          <div className="container">
            <header ref={mixersHead} className="section-head">
              <h2 className="display section-title">Mixes well with</h2>
              <p className="section-lede prose">
                Gin&rsquo;s botanicals give it more partners than any other
                spirit. Each one points to a different drink.
              </p>
            </header>

            <ul ref={mixerGrid} className="mixer-grid">
              {s.mixers.map((m) => (
                <li key={m.name} className="mixer-chip">
                  <span
                    className="mixer-dot"
                    aria-hidden="true"
                    style={{ background: m.color }}
                  />
                  <span className="mixer-text">
                    <span className="mixer-name">{m.name}</span>
                    <span className="mixer-note">{m.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- COCKTAILS ---------------- */}
        <section id="cocktails" className="section cocktails">
          <div className="container">
            <header ref={cocktailsHead} className="section-head section-head-row">
              <div>
                <h2 className="display section-title">The cocktails</h2>
                <p className="section-lede prose">
                  Every great gin drink, with a real spec. The swatch is the
                  drink&rsquo;s own colour.
                </p>
              </div>
              <span className="cocktail-count">{s.cocktails.length} recipes</span>
            </header>

            <ul ref={cocktailGrid} className="cocktail-grid">
              {s.cocktails.map((c) => (
                <li key={c.slug}>
                  <CocktailCard cocktail={c} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <p className="footer-brand display">Alchemist</p>
          <p className="footer-note prose">
            A field guide to the world of spirits. Please enjoy responsibly —
            the best cocktail is the one you remember.
          </p>
        </div>
      </footer>
    </>
  );
}
