"use client";

/*
  StickyBar — fixed bar at the bottom of result pages.
  Two variants:
    "default" (Result A & B): teal background, headline + subline left, CTA right.
    "community" (Result C): teal background, short message left, CTA right.

  Disappears after the user submits their email (emailSubmitted prop).
  On result pages, rendered conditionally after a 3-second delay (handled in parent).
  Reduced height vs original — py-2.5 instead of py-4, smaller font sizes.
*/

export default function StickyBar({
  variant = "default",
  spotsLeft = 1000,
  emailSubmitted = false,
}) {
  if (emailSubmitted) return null;

  function scrollToEmail() {
    document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" });
  }

  if (variant === "community") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary px-6 py-2.5 flex items-center justify-between gap-4 flex-wrap shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
        <p className="text-[14px] font-medium text-white leading-snug">
          Join the community — free to join, no obligation
        </p>
        <button
          onClick={scrollToEmail}
          className="bg-white text-primary hover:bg-teal-bg font-semibold text-[14px] px-5 py-2 rounded-[6px] whitespace-nowrap transition-colors duration-150"
        >
          Join the Community
        </button>
      </div>
    );
  }

  // Default variant (A & B)
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary px-6 py-2.5 flex items-center justify-between gap-4 flex-wrap shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
      {/* Left: headline + subline */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[17px] font-bold text-white leading-none tracking-tight">
          Founding member — free lifetime access
        </span>
        <span className="text-[12px] text-white/70">No subscription, ever</span>
      </div>

      {/* Right: CTA */}
      <button
        onClick={scrollToEmail}
        className="bg-white text-primary hover:bg-teal-bg font-semibold text-[14px] px-5 py-2 rounded-[6px] whitespace-nowrap transition-colors duration-150"
      >
        Claim Free Access
      </button>
    </div>
  );
}
