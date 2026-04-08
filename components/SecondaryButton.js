/*
  Reusable secondary/outline button.
  White background, grey border, teal border+text on hover.
  Same href/onClick pattern as PrimaryButton.
*/

import Link from "next/link";

export default function SecondaryButton({
  href,
  onClick,
  children,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center bg-transparent text-body border-[1.5px] border-line hover:border-primary hover:text-primary font-medium text-base px-7 py-[14px] rounded-[6px] transition-colors duration-150";

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
