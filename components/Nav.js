/*
  Sticky navigation bar shown on every page.
  - Logo on the left links back to the homepage.
  - Right slot is handled by NavCta (Client Component) which conditionally renders:
      - "Take the Free Test" button on most pages
      - Nothing on test flow pages (noise-exposure, test-intro, test questions)
      - "Back to Home" plain link on result pages
*/

import Link from "next/link";
import NavCta from "@/components/NavCta";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-line">
      <div className="max-w-2xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-semibold text-body hover:text-body no-underline"
        >
          Somatic Tinnitus{" "}
          <span className="text-primary">Project</span>
        </Link>

        {/* Right slot — conditionally rendered based on current page */}
        <NavCta />
      </div>
    </nav>
  );
}
