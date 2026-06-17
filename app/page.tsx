import Link from "next/link";
import { spiritShelf } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const STEPS = [
  {
    num: "01",
    title: "Pick a spirit",
    body: "Begin with whatever's in the cabinet — gin, whisky, rum, tequila or vodka. Every bottle is a starting point.",
  },
  {
    num: "02",
    title: "Learn to drink it",
    body: "How to take it neat, on the rocks or long — plus the mixers and tasting notes that bring each spirit to life.",
  },
  {
    num: "03",
    title: "Build the classics",
    body: "Real specs for every cocktail it makes, from the Negroni to the Old Fashioned — measures, method and all.",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* ---------------- NAV ---------------- */}
      <header className="home-nav">
        <div className="container home-nav-inner">
          <Link href="/" className="home-brand" aria-label="Alchemist — home">
            <span className="home-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
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
            <span className="home-brand-word">Alchemist</span>
          </Link>
          <nav className="home-nav-links" aria-label="Primary">
            <a href="#shelf">The spirits</a>
            <Link href="/cocktails">Cocktails</Link>
          </nav>
          <Link href="/spirits/gin" className="btn btn-primary home-nav-cta">
            Open the guide
          </Link>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-scrim" aria-hidden="true" />
        <div className="home-hero-inner">
          <p className="home-eyebrow rise rise-1">Crafted to inspire</p>
          <h1 id="home-title" className="home-title rise rise-2">
            Where Every Pour Tells A Story
          </h1>
          <p className="home-lede rise rise-3">
            Discover our collection of premium spirits, thoughtfully crafted
            for every unforgettable moment.
          </p>
          <div className="home-actions rise rise-4">
            <Link href="/spirits/gin" className="btn btn-primary btn-lg">
              Explore collection
            </Link>
          </div>
        </div>
        <span className="home-scroll-cue rise rise-6" aria-hidden="true">
          Scroll
        </span>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="section home-steps">
        <div className="container">
          <Reveal>
            <header className="section-head">
              <h2 className="display section-title">One bottle. A whole evening.</h2>
              <p className="section-lede prose">
                Start from any spirit on your shelf and follow it all the way to
                the glass — no guesswork, just good drinks.
              </p>
            </header>
          </Reveal>

          <Stagger className="home-steps-grid">
            {STEPS.map((s) => (
              <StaggerItem key={s.num} className="home-step">
                <span className="home-step-num">{s.num}</span>
                <h3 className="home-step-title">{s.title}</h3>
                <p className="home-step-body prose">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- SPIRIT SHELF ---------------- */}
      <section id="shelf" className="section home-shelf">
        <div className="container">
          <Reveal>
            <header className="section-head section-head-row">
              <div>
                <h2 className="display section-title">
                  Start with what's on your shelf
                </h2>
                <p className="section-lede prose">
                  Five spirits, fully mapped. Each one opens into a dozen
                  classics — pick a bottle and pour in.
                </p>
              </div>
              <span className="cocktail-count">5 spirits</span>
            </header>
          </Reveal>

          <Stagger className="home-shelf-grid">
            {spiritShelf.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/spirits/${s.slug}`}
                  className="home-shelf-card"
                  style={{ backgroundImage: `url(/heroes/${s.slug}.jpg)` }}
                >
                  <span className="home-shelf-scrim" aria-hidden="true" />
                  <span className="home-shelf-body">
                    <span className="home-shelf-name">{s.name}</span>
                    <span className="home-shelf-tagline">{s.tagline}</span>
                    <span className="home-shelf-count">
                      {s.cocktails} cocktails
                      <span aria-hidden="true" className="home-shelf-arrow">
                        →
                      </span>
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="home-cta">
        <div className="container home-cta-inner">
          <Reveal>
            <h2 className="display home-cta-title">Sixty cocktails, one shelf away.</h2>
            <p className="home-cta-lede prose">
              Filter every drink across the guide by spirit, strength and
              difficulty — and find the one you'll make tonight.
            </p>
            <Link href="/cocktails" className="btn btn-primary btn-lg">
              Browse all cocktails
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="home-footer">
        <div className="container">
          <span className="home-footer-brand">Alchemist</span>
          <p className="home-footer-note">
            A field guide to the world of spirits. Please enjoy responsibly —
            the best cocktail is the one you remember.
          </p>
        </div>
      </footer>
    </div>
  );
}
