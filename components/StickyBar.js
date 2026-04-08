"use client";

/*
  StickyBar — fixed bar at the bottom of result pages.
  Dark background (#1C1C1C), spot counter on left, teal CTA on right.
  Smooth-scrolls to the email capture section when CTA is clicked.
  Disappears after the user submits their email (emailSubmitted prop).

  Built in: result/[classification] step.
*/

export default function StickyBar({ spotsLeft = 1847, emailSubmitted = false }) {
  if (emailSubmitted) return null;

  function scrollToEmail() {
    document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark px-6 py-4 flex items-center justify-between gap-4 flex-wrap shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
      {/* Left: spot counter */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[22px] font-bold text-white leading-none tracking-tight">
          <span className="text-primary">{spotsLeft.toLocaleString()}</span> of 2,000
        </span>
        <span className="text-[13px] text-white/50">founding member spots remaining</span>
      </div>

      {/* Right: CTA */}
      <button
        onClick={scrollToEmail}
        className="bg-primary hover:bg-primary-hover text-white font-semibold text-[15px] px-6 py-[13px] rounded-[6px] whitespace-nowrap transition-colors duration-150"
      >
        Claim Free Access
      </button>
    </div>
  );
}
