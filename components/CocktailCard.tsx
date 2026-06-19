"use client";

import { useState } from "react";
import type { Cocktail } from "@/lib/data";
import { DifficultyBadge, StrengthMeter } from "./atoms";

export function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  const [showSubs, setShowSubs] = useState(false);
  const hasSubs = cocktail.subs && cocktail.subs.length > 0;

  return (
    <article id={cocktail.slug} className="cocktail-card">
      <div className="cocktail-card-top">
        <div className="cocktail-card-head">
          <h3 className="cocktail-name">{cocktail.name}</h3>
          <p className="cocktail-tagline">{cocktail.tagline}</p>
        </div>
      </div>

      <p className="cocktail-hook prose">{cocktail.hook}</p>

      <ul className="ingredient-list">
        {cocktail.ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>

      {hasSubs && (
        <div className="cocktail-subs">
          <button
            className="cocktail-subs-toggle"
            onClick={() => setShowSubs((s) => !s)}
            aria-expanded={showSubs}
          >
            {showSubs ? "Hide swaps" : "Missing an ingredient?"}
          </button>
          {showSubs && (
            <ul className="cocktail-subs-list">
              {cocktail.subs!.map((s) => (
                <li key={s.ingredient}>
                  <span className="cocktail-subs-ingredient">No {s.ingredient}?</span>
                  {" "}{s.swap}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="cocktail-method">
        <span className="cocktail-method-label">Method</span>
        {cocktail.method}
      </p>

      <footer className="cocktail-meta">
        <StrengthMeter value={cocktail.strength} />
        <span className="cocktail-meta-dot" aria-hidden="true" />
        <span className="cocktail-glass">{cocktail.glass}</span>
        <DifficultyBadge value={cocktail.difficulty} />
      </footer>
    </article>
  );
}
