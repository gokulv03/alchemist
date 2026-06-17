"use client";

import { useEffect, useRef, type RefObject } from "react";

interface RevealOptions {
  /** Stagger matched descendant elements instead of revealing the element itself. */
  stagger?: boolean;
  /** CSS selector for the children to stagger. Defaults to the element's direct children. */
  selector?: string;
  /** How many children share one delay tier (e.g. 4 → reveal in groups of four). */
  groupSize?: number;
  /** Derive the delay tier from grid rows by reading the live column count. */
  groupByRow?: boolean;
  /** IntersectionObserver threshold. */
  threshold?: number;
  /** IntersectionObserver rootMargin. */
  rootMargin?: string;
}

// We only have .rise-1 … .rise-6 defined in globals.css.
const MAX_TIER = 6;

/**
 * Scroll-triggered entrance reveal built on IntersectionObserver and the
 * existing `.rise` / `.rise-1…6` classes. Returns a ref to attach to the
 * element (or stagger container).
 *
 * Content is visible by default (server-rendered, JS-off, and under
 * `prefers-reduced-motion` it stays put). When motion is welcome, targets are
 * hidden just before paint and rise in once they scroll into view.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {}
): RefObject<T | null> {
  const {
    stagger = false,
    selector,
    groupSize = 1,
    groupByRow = false,
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: leave everything visible and do nothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Without IntersectionObserver we can't scroll-trigger; leave content
    // visible rather than risk hiding it permanently.
    if (!("IntersectionObserver" in window)) return;

    // The elements we will actually animate.
    const targets: HTMLElement[] = stagger
      ? Array.from(
          selector
            ? el.querySelectorAll<HTMLElement>(selector)
            : (el.children as HTMLCollectionOf<HTMLElement>)
        )
      : [el];

    if (targets.length === 0) return;

    // Hide before paint so nothing flashes in ahead of its reveal.
    for (const t of targets) t.style.opacity = "0";

    const columnCount = () =>
      Math.max(
        1,
        getComputedStyle(el)
          .gridTemplateColumns.split(" ")
          .filter(Boolean).length
      );

    const reveal = () => {
      const perTier = Math.max(1, groupByRow ? columnCount() : groupSize);
      targets.forEach((t, i) => {
        const tier = Math.min(MAX_TIER, Math.floor(i / perTier) + 1);
        // Hand off to the CSS animation, which ends fully visible.
        t.style.opacity = "";
        t.classList.add("rise", `rise-${tier}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, selector, groupSize, groupByRow, threshold, rootMargin]);

  return ref;
}
