import type { Cocktail } from "@/lib/data";
import { DifficultyBadge, StrengthMeter } from "./atoms";

export function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
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
