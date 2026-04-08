"use client";

/*
  LearnMoreProgress — sticky scroll progress bar for the Learn More page.
  Shows:
    1. A thin teal bar at the top that fills left-to-right as the user scrolls
    2. The name of the current section in small muted text beneath it

  Section detection uses IntersectionObserver on each H2 heading.
  The bar sits directly below the main nav (z-40 so it sits under the nav's z-50).
  Hidden on md and above where the long page is less of a navigation problem.
*/

import { useEffect, useState, useRef } from "react";

// Must match the H2 text content on the Learn More page exactly
const SECTIONS = [
  "The mechanism",
  "Why most people are not told about this",
  "Signs your tinnitus might be somatic",
  "Oliver's story",
  "What you get access to",
];

export default function LearnMoreProgress() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  // Track scroll percentage
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section heading is currently in view
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("main h2"));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the last heading that has entered the viewport from the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target.textContent.trim());
        if (visible.length) {
          setActiveSection(visible[0]);
        }
      },
      {
        // Trigger when the heading is within the top 60% of the viewport
        rootMargin: "0px 0px -40% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    // md:hidden — only shown on mobile where long pages need orientation help
    <div className="md:hidden sticky top-[60px] z-40 bg-white border-b border-line">
      {/* Scroll progress bar */}
      <div className="h-[3px] bg-[#E5E3DF]">
        <div
          className="h-full bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div>
      {/* Current section label */}
      <p className="text-[11px] text-muted px-6 py-1.5 truncate">
        {activeSection}
      </p>
    </div>
  );
}
