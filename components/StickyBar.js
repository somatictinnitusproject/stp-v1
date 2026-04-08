"use client";

/*
  StickyBar — fixed bar at the bottom of result pages.
  Two variants:
    "default" (Result A & B): teal background, spot counter left, teal CTA right.
    "community" (Result C): teal background, short message left, CTA right. No counter.

  Disappears after the user submits their email (emailSubmitted prop).
*/

export default function StickyBar({
  variant = "default",
  spotsLeft = 2000,
  emailSubmitted = false,
}) {
  if (emailSubmitted) return null;

  function scrollToEmail() {
    document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" });
  }

  if (variant === "community") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary px-6 py-4 flex items-center justify-between gap-4 flex-wrap shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
        <p className="text-[15px] font-medium text-white leading-snug">
          Join the community — free to join, no obligation
        </p>
        <button
          onClick={scrollToEmail}
          className="bg-white text-primary hover:bg-teal-bg font-semibold text-[15px] px-6 py-[11px] rounded-[6px] whitespace-nowrap transition-colors duration-150"
        >
          Join the Community
        </button>
      </div>
    );
  }

  // Default variant (A & B)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary px-6 py-4 flex items-center justify-between gap-4 flex-wrap shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
      {/* Left: spot counter */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[22px] font-bold text-white leading-none tracking-tight">
          {spotsLeft.toLocaleString()} of 2,000 spots left
        </span>
        <span className="text-[13px] text-white/70">Free lifetime access — no subscription ever</span>
      </div>

      {/* Right: CTA */}
      <button
        onClick={scrollToEmail}
        className="bg-white text-primary hover:bg-teal-bg font-semibold text-[15px] px-6 py-[13px] rounded-[6px] whitespace-nowrap transition-colors duration-150"
      >
        Claim Free Access
      </button>
    </div>
  );
}
