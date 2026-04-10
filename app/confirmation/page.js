"use client";

/*
  Confirmation screen — /confirmation
  Shown after successful email submission (navigated to by EmailCaptureForm).

  Contains:
    - Animated checkmark circle
    - Personalised message + Oliver sign-off
    - Reinforcement list (what they're getting)
    - Social follow links (SVG icons — TikTok, YouTube, Instagram)
    - Optional tinnitus duration question (tap-to-select, auto-saves)

  Duration is POSTed to /api/subscribe to update the contact's custom field.
  Guard: redirects to / if test was never completed.
*/

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useTest } from "@/context/TestContext";

const DURATION_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–10 years",
  "10+ years",
  "Not sure",
];

const REINFORCEMENT_ITEMS = [
  "The full five-phase somatic tinnitus framework — fully guided, phase by phase",
  "A daily progress tracker to make your improvement visible over time",
  "An exercise library with demonstration videos for every technique",
  "A community of people working through the same process",
  "All of it permanently free — no subscription, ever",
];

// ─── SVG social icons ─────────────────────────────────────────────────────

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"
        fill="#2D2D2D"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"
        fill="#2D2D2D"
      />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="white" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="#2D2D2D" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="#2D2D2D" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function ConfirmationPage() {
  const router = useRouter();
  const { testState } = useTest();
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Guard: don't allow direct access without completing the test
  useEffect(() => {
    if (!testState.testComplete) {
      router.replace("/");
    }
  }, [testState.testComplete, router]);

  if (!testState.testComplete) return null;

  /*
    When the user taps a duration option, POST it to /api/subscribe.
    EmailOctopus treats this as an update to the existing contact because
    the email already exists — it just adds the Tinnitus duration field.
    subscribedEmail was stored in context by EmailCaptureForm after success.
  */
  async function handleDurationSelect(duration) {
    if (selectedDuration) return; // prevent re-selection
    setSelectedDuration(duration);
    setSaveError(false);

    const email = testState.subscribedEmail;
    const classification = testState.classification;

    if (email && classification) {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, classification, duration }),
        });
        // Show saved confirmation regardless of response — best effort
      } catch {
        setSaveError(true);
      }
    }

    setTimeout(() => setSaved(true), 200);
  }

  return (
    <>
      <main className="max-w-[520px] mx-auto px-6 pt-[72px] pb-20 text-center">

        {/* Checkmark circle */}
        <div className="w-[72px] h-[72px] rounded-full bg-teal-bg border-2 border-teal-border flex items-center justify-center mx-auto mb-8">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#4A9B8E" strokeWidth="1.5" />
            <path
              d="M9 16.5L13.5 21L23 11"
              stroke="#4A9B8E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-[32px] font-bold text-body tracking-[-0.02em] leading-[1.2] mb-4">
          You're on the list.
        </h1>
        <p className="text-[16px] text-muted leading-[1.7] max-w-[400px] mx-auto mb-1">
          When the Somatic Tinnitus Project launches, you will get full access —
          no subscription fee, ever. I will be in touch.
        </p>
        <p className="text-[16px] text-body font-medium mt-2 mb-8">— Oliver</p>

        {/* Reinforcement block */}
        <div className="bg-white border border-line rounded-[10px] p-6 text-left mb-7">
          <p className="text-[11px] font-bold text-primary uppercase tracking-[0.08em] mb-3.5">
            What you're getting access to
          </p>
          {REINFORCEMENT_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 py-2 border-b border-line last:border-b-0 text-[14px] text-body leading-relaxed"
            >
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* Social follow */}
        <p className="text-[13px] text-muted mb-3.5">
          Follow along while we build.
        </p>
        <div className="flex gap-3 justify-center mb-9">
          {[
            { icon: <TikTokIcon />, label: "TikTok", href: "https://www.tiktok.com/@somatictinnitusproject" },
            { icon: <YouTubeIcon />, label: "YouTube", href: "https://www.youtube.com/@somatictinnitusproject" },
            { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/somatictinnitus" },
          ].map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-[10px] border-[1.5px] border-line bg-white flex items-center justify-center hover:border-primary transition-colors duration-150"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Optional duration question */}
        <div className="bg-white border border-line rounded-[10px] p-6 text-left">
          <p className="text-[11px] font-bold text-primary uppercase tracking-[0.08em] mb-1.5">
            Optional
          </p>
          <p className="text-[15px] font-medium text-body mb-1.5">
            How long have you had tinnitus?
          </p>
          <p className="text-[12px] text-muted mb-3.5">
            Helps us understand who we're building for. No obligation.
          </p>

          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => handleDurationSelect(opt)}
                className={[
                  "px-3.5 py-2 rounded-[20px] border-[1.5px] text-[13px] font-medium transition-all duration-150",
                  selectedDuration === opt
                    ? "border-primary bg-teal-bg text-primary"
                    : "border-line bg-site text-body hover:border-primary hover:text-primary",
                ].join(" ")}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Auto-save confirmation — fades in after selection */}
          <p
            className={`text-[12px] text-primary mt-3 transition-opacity duration-300 ${
              saved ? "opacity-100" : "opacity-0"
            }`}
          >
            ✓ Saved — thank you
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
