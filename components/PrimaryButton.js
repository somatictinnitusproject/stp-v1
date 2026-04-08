/*
  Reusable primary CTA button.
  Can render as a <button> (for form submission or JS actions)
  or as a <Link> (for navigation).

  Props:
    href      — if provided, renders as a Next.js Link
    onClick   — if no href, renders as a <button> with this handler
    children  — button label
    className — optional extra Tailwind classes
    disabled  — disables the button (used during video playback)
*/

import Link from "next/link";

export default function PrimaryButton({
  href,
  onClick,
  children,
  className = "",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-semibold text-base px-7 py-[14px] rounded-[6px] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed";

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${className}`}
    >
      {children}
    </button>
  );
}
