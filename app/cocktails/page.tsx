"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { spirits, type Cocktail, type Difficulty, type Strength } from "@/lib/data";
import { SiteHeader } from "@/components/SiteHeader";
import { CocktailCard } from "@/components/CocktailCard";

type BrowseCocktail = Cocktail & {
  spiritName: string;
  spiritSlug: string;
};

/** Flatten every spirit's cocktails into one labelled list. */
const ALL_COCKTAILS: BrowseCocktail[] = Object.entries(spirits).flatMap(
  ([spiritSlug, spirit]) =>
    spirit.cocktails.map((c) => ({
      ...c,
      spiritName: spirit.name,
      spiritSlug,
    }))
);

type SpiritFilter = "all" | string;
type DifficultyFilter = "all" | Difficulty;
type StrengthFilter = "all" | Strength;

const SPIRIT_OPTIONS: { label: string; value: SpiritFilter }[] = [
  { label: "All", value: "all" },
  ...Object.entries(spirits).map(([slug, spirit]) => ({
    label: spirit.name,
    value: slug,
  })),
];

const DIFFICULTY_OPTIONS: { label: string; value: DifficultyFilter }[] = [
  { label: "All", value: "all" },
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Advanced", value: "Advanced" },
];

const STRENGTH_OPTIONS: { label: string; value: StrengthFilter }[] = [
  { label: "All", value: "all" },
  { label: "Sessionable", value: 1 },
  { label: "Medium", value: 2 },
  { label: "Spirit-forward", value: 3 },
];

function FilterGroup<T extends string | number>({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: { label: string; value: T }[];
  active: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="filter-group">
      <span className="filter-group-label">{label}</span>
      <div className="filter-chips" role="group" aria-label={label}>
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            className="filter-chip"
            data-active={active === opt.value}
            aria-pressed={active === opt.value}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [spirit, setSpirit] = useState<SpiritFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [strength, setStrength] = useState<StrengthFilter>("all");

  const filtered = useMemo(
    () =>
      ALL_COCKTAILS.filter(
        (c) =>
          (spirit === "all" || c.spiritSlug === spirit) &&
          (difficulty === "all" || c.difficulty === difficulty) &&
          (strength === "all" || c.strength === strength)
      ),
    [spirit, difficulty, strength]
  );

  const resetAll = () => {
    setSpirit("all");
    setDifficulty("all");
    setStrength("all");
  };

  return (
    <div className="cocktails-page">
      <SiteHeader />
      <main id="top">
        <section className="section cocktails">
          <div className="container">
            <header className="section-head section-head-row">
              <div>
                <h1 className="display section-title">Browse cocktails</h1>
                <p className="section-lede prose">
                  Every drink across the guide in one place. Filter by spirit,
                  difficulty and strength to find your next pour.
                </p>
              </div>
              <span className="cocktail-count">
                {filtered.length} of {ALL_COCKTAILS.length} cocktails
              </span>
            </header>

            <div className="filter-bar">
              <FilterGroup
                label="Spirit"
                options={SPIRIT_OPTIONS}
                active={spirit}
                onSelect={setSpirit}
              />
              <FilterGroup
                label="Difficulty"
                options={DIFFICULTY_OPTIONS}
                active={difficulty}
                onSelect={setDifficulty}
              />
              <FilterGroup
                label="Strength"
                options={STRENGTH_OPTIONS}
                active={strength}
                onSelect={setStrength}
              />
            </div>

            {filtered.length > 0 ? (
              <ul className="browse-grid">
                {filtered.map((c) => (
                  <li key={`${c.spiritSlug}-${c.slug}`}>
                    <Link
                      className="browse-card-link"
                      href={`/spirits/${c.spiritSlug}#${c.slug}`}
                      aria-label={`${c.name} — ${c.spiritName} cocktail`}
                    >
                      <span className="browse-card-spirit">{c.spiritName}</span>
                      <CocktailCard cocktail={c} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="browse-empty">
                <p className="browse-empty-title">No cocktails match these filters.</p>
                <button type="button" className="btn btn-ghost" onClick={resetAll}>
                  Clear filters
                </button>
              </div>
            )}
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
    </div>
  );
}
