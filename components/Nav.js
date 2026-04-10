/*
  Sticky navigation bar shown on every page.
  - Logo on the left links back to the homepage.
  - Right slot is handled by NavCta (Client Component) which conditionally renders:
      - "Take the Free Test" button on most pages
      - Nothing on test flow pages (noise-exposure, test-intro, test questions)
      - "Back to Home" plain link on result pages
*/

import Link from "next/link";
import Image from "next/image";
import NavCta from "@/components/NavCta";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-site border-b border-line">
      <div className="max-w-2xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-[10px] no-underline">
          <Image
            src="/logo.png"
            alt="Somatic Tinnitus Project"
            width={40}
            height={40}
            className="rounded-[8px]"
          />
          <span className="text-[15px] font-semibold text-body">
            Somatic Tinnitus <span className="text-primary">Project</span>
          </span>
        </Link>

        {/* Right slot — conditionally rendered based on current page */}
        <NavCta />
      </div>
    </nav>
  );
}
