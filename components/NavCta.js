"use client";

/*
  NavCta — the right-hand slot of the navigation bar.
  Reads the current pathname to decide what to render:

    - Test flow pages (/noise-exposure, /test-intro, /test/*): render nothing
    - Result pages (/result/*): render a plain "Back to Home" text link
    - All other pages: render the "Take the Free Test" primary CTA button

  Extracted as a Client Component so Nav itself can remain a Server Component.
*/

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavCta() {
  const pathname = usePathname();

  const isTestFlow =
    pathname === "/noise-exposure" ||
    pathname === "/test-intro" ||
    pathname.startsWith("/test/");

  const isResultPage = pathname.startsWith("/result/");

  if (isTestFlow) {
    return null;
  }

  if (isResultPage) {
    return (
      <Link
        href="/"
        className="text-[14px] text-muted hover:text-body transition-colors duration-150 no-underline"
      >
        Back to Home
      </Link>
    );
  }

  return (
    <Link
      href="/noise-exposure"
      className="bg-primary hover:bg-primary-hover text-white text-sm font-medium px-[18px] py-2 rounded-[5px] transition-colors duration-150 no-underline"
    >
      Take the Free Test
    </Link>
  );
}
