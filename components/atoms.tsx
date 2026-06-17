import type { Difficulty, Serve, Strength } from "@/lib/data";

/** Minimal line-art glassware glyphs, one coherent set. */
export function GlassGlyph({ kind }: { kind: Serve["glass"] }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 34 34",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "neat":
      return (
        <svg {...common}>
          <path d="M11 7h12l-1.2 13.5a3 3 0 0 1-3 2.7h-3.6a3 3 0 0 1-3-2.7L11 7Z" />
          <path d="M11.7 14.5h10.6" />
          <path d="M13 27h8" />
        </svg>
      );
    case "rocks":
      return (
        <svg {...common}>
          <path d="M9 9h16l-1.4 16a2 2 0 0 1-2 1.8H12.4a2 2 0 0 1-2-1.8L9 9Z" />
          <rect x="13.5" y="16" width="7" height="6" rx="1" />
        </svg>
      );
    case "highball":
      return (
        <svg {...common}>
          <path d="M12 5h10l-1 23a1.5 1.5 0 0 1-1.5 1.4h-4A1.5 1.5 0 0 1 14 28L12 5Z" />
          <path d="M12.5 12h9" />
        </svg>
      );
    case "coupe":
      return (
        <svg {...common}>
          <path d="M6 9h22a11 11 0 0 1-9 8.8V26" />
          <path d="M6 9a11 11 0 0 0 9 8.8" />
          <path d="M12 29h10" />
          <path d="M17 26v3" />
        </svg>
      );
  }
}

const STRENGTH_LABEL: Record<Strength, string> = {
  1: "Sessionable",
  2: "Medium",
  3: "Spirit-forward",
};

export function StrengthMeter({ value }: { value: Strength }) {
  return (
    <span className="strength" title={`Strength: ${STRENGTH_LABEL[value]}`}>
      <span className="strength-bars" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} data-on={n <= value} />
        ))}
      </span>
      <span className="strength-label">{STRENGTH_LABEL[value]}</span>
    </span>
  );
}

export function DifficultyBadge({ value }: { value: Difficulty }) {
  return (
    <span className="difficulty" data-level={value.toLowerCase()}>
      {value}
    </span>
  );
}

/** A drink's actual color, used as data. */
export function LiquidSwatch({
  color,
  colorSoft,
}: {
  color: string;
  colorSoft: string;
}) {
  return (
    <span
      className="swatch"
      aria-hidden="true"
      style={
        {
          "--liquid": color,
          "--liquid-soft": colorSoft,
        } as React.CSSProperties
      }
    >
      <span className="swatch-fill" />
      <span className="swatch-shine" />
    </span>
  );
}
