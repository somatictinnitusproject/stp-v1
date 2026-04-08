/*
  Site-wide footer with disclaimer and legal links.
  Kept minimal — one disclaimer paragraph and two links.
*/

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 text-center">
      <p className="text-[13px] text-muted leading-relaxed max-w-xl mx-auto">
        The Somatic Tinnitus Project is an educational platform sharing personal
        experience and community insights. Nothing on this site constitutes
        medical advice or diagnosis. Always consult a qualified healthcare
        professional regarding your tinnitus.
      </p>
      <p className="text-[13px] text-muted mt-2">
        <Link href="/privacy" className="text-muted underline hover:text-body transition-colors duration-150">
          Privacy Policy
        </Link>
        {" "}·{" "}
        <span>© 2026 Somatic Tinnitus Project</span>
      </p>
    </footer>
  );
}
