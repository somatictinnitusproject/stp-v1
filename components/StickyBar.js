"use client";

/*
  StickyBar — fixed bar at the bottom of result A and B pages.
  Appears after a 3-second delay (controlled by parent).
  Links to V2 signup with result param appended.
  Not rendered on result C.
*/

export default function StickyBar({ classification = "a" }) {
  const signupUrl = `https://app.somatictinnitusproject.com/signup?result=${classification}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#3a8073] px-6 py-2.5 flex items-center justify-between gap-4 flex-wrap shadow-[0_-4px_24px_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-0.5">
        <span className="text-[17px] font-bold text-white leading-none tracking-tight">
          You now know what's driving it.
        </span>
        <span className="text-[12px] text-white/70">Start the framework — free, no card required</span>
      </div>

      <a
        href={signupUrl}
        className="bg-primary text-white hover:bg-primary-hover font-semibold text-[14px] px-5 py-2 rounded-[6px] whitespace-nowrap transition-colors duration-150"
      >
        Start your programme
      </a>
    </div>
  );
}
