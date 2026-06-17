import type { Metadata } from "next";
import {
  Fraunces,
  Inter,
  Bricolage_Grotesque,
  Hanken_Grotesk,
} from "next/font/google";
import "./globals.css";

// App (spirit-detail) identity
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Landing (brand) identity — fresh, off the reflex-reject list
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Alchemist — every spirit, every way to drink it",
  description:
    "A field guide to the world of spirits. Start from any bottle and discover how to serve it, what it mixes with, and the cocktails it builds.",
};

// Applied before paint so neither a spirit's palette nor a saved palette
// ever flashes the default. On a spirit page the spirit's theme wins;
// everywhere else the saved palette (if any) is restored.
const noFlashTheme = `(function(){try{var themes={gin:"indigo",whisky:"spritz",rum:"midnight",tequila:"botanic",vodka:"indigo"};var parts=location.pathname.split("/").filter(Boolean);var i=parts.indexOf("spirits");var spirit=i>=0?themes[parts[i+1]]:null;if(spirit){document.documentElement.setAttribute('data-theme',spirit);}else{var t=localStorage.getItem('alchemist-theme');if(t){document.documentElement.setAttribute('data-theme',t);}}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="indigo"
      className={`${fraunces.variable} ${inter.variable} ${bricolage.variable} ${hanken.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
