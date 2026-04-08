/*
  Sticky navigation bar shown on every page.
  - Logo on the left links back to the homepage.
  - "Take the Free Test" CTA on the right links to the noise exposure screen.
  - Subtle backdrop blur so content scrolling beneath it looks clean.
  - No mobile menu needed — just logo + single button at all breakpoints.
*/

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-2xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-semibold text-body hover:text-body no-underline"
        >
          Somatic Tinnitus{" "}
          <span className="text-primary">Project</span>
        </Link>

        {/* Primary CTA */}
        <Link
          href="/noise-exposure"
          className="bg-primary hover:bg-primary-hover text-white text-sm font-medium px-[18px] py-2 rounded-[5px] transition-colors duration-150 no-underline"
        >
          Take the Free Test
        </Link>
      </div>
    </nav>
  );
}
