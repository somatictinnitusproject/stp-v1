"use client";

/*
  Result page — /result/[classification] (a, b, or c)

  Reads actual scores and noiseExposure from TestContext.
  Noise exposure warning: if testState.noiseExposure === "Yes", a one-line
  note appears after the result subtext on all result types.

  Guard: redirects to / if test was never completed.
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScoreBreakdown from "@/components/ScoreBreakdown";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import StickyBar from "@/components/StickyBar";
import DisclaimerText from "@/components/DisclaimerText";
import { useTest } from "@/context/TestContext";

// ─── Static content per classification ────────────────────────────────────

const CONTENT = {
  a: {
    badgeLabel: "Result A — Likely Somatic",
    badgeBg: "bg-teal-bg",
    badgeBorder: "border-teal-border",
    badgeText: "text-primary",
    dotColor: "bg-primary",
    headline:
      "Your responses suggest your tinnitus has a significant somatic component",
    subtext:
      "This means jaw tension, neck tension, or posture may be directly influencing your tinnitus.",
    platformIntro:
      "Built around the same process that enabled Oliver to go from 10/10 to silence. Five phases, fully guided.",
    phases: [
      {
        n: 1,
        name: "Identification",
        desc: "Structured self-assessment across jaw, neck, postural, and nervous system drivers. The system generates your personalised driver profile — identifying which specific patterns are most active for you and why.",
      },
      {
        n: 2,
        name: "Lifestyle Foundations",
        desc: "A habits audit covering the daily patterns that continuously reload jaw and cervical tension. Diet, supplements, and sleep optimisation specific to somatic tinnitus — with honest evidence ratings for everything.",
      },
      {
        n: 3,
        name: "Primary Driver Protocols",
        desc: "TMJ and cervical protocols matched to your Phase 1 profile. Release phase followed by strengthening and retraining. Every exercise includes a video demonstration and the specific mechanism it targets.",
      },
      {
        n: 4,
        name: "Maintaining Factors",
        desc: "Postural correction and nervous system regulation — the layer that determines whether Phase 3 gains hold long-term. Covers the anxiety-tinnitus feedback loop, hypervigilance interruption, and workstation setup.",
      },
      {
        n: 5,
        name: "Stabilisation",
        desc: "Resolution framing, maintenance protocol, early warning signs, and setback management. Designed so that tinnitus stops being a significant organising factor in your daily life.",
      },
    ],
    sections: [
      {
        heading: "What this means for you",
        body: "Somatic tinnitus occurs when signals from the jaw, neck, or surrounding muscles interfere with the brain's sound processing system. The movements you responded to in the test place direct mechanical load on the structures most commonly involved in this process. This means there may be a physical, addressable component that most tinnitus advice completely ignores.",
      },
      {
        heading: "Why this matters",
        body: "Unlike tinnitus caused by permanent hearing damage, somatic tinnitus is driven by ongoing mechanical and muscular factors that can change. Many people with a significant somatic component have been able to reduce their tinnitus meaningfully by addressing these underlying patterns — not by learning to live with it, but by addressing what is actually driving it.",
      },
    ],
    oliverNote:
      "I was told at 16 that nothing could be done about my tinnitus. I proved that wrong through extensive research and self-experimentation. I built this platform because the information that helped me is not hard to find if you know where to look — it has just never been put together in one place, for people like us. If your test result resonates with your experience, I think this framework will help you.",
  },

  b: {
    badgeLabel: "Result B — Possible Somatic Component",
    badgeBg: "bg-[#fff8f0]",
    badgeBorder: "border-[#f0d5a8]",
    badgeText: "text-[#b07d2e]",
    dotColor: "bg-[#b07d2e]",
    headline:
      "Your responses suggest somatic factors may be contributing to your tinnitus",
    subtext:
      "A mixed picture is more common than a clear-cut one. The patterns you showed are worth exploring.",
    platformIntro:
      "The identification phase is designed specifically for mixed-picture cases — it finds what is active, not what is assumed.",
    phases: [
      {
        n: 1,
        name: "Identification",
        desc: "Structured self-assessment across jaw, neck, postural, and nervous system drivers. Particularly valuable for mixed-picture cases — it surfaces the somatic component clearly even when the initial test is ambiguous.",
      },
      {
        n: 2,
        name: "Lifestyle Foundations",
        desc: "A habits audit covering the daily patterns that continuously reload jaw and cervical tension. Even a partial somatic component responds to these foundations.",
      },
      {
        n: 3,
        name: "Primary Driver Protocols",
        desc: "TMJ and cervical protocols matched to your Phase 1 profile. Every exercise includes a video demonstration and the specific mechanism it targets.",
      },
      {
        n: 4,
        name: "Maintaining Factors",
        desc: "Postural correction and nervous system regulation. The anxiety-tinnitus feedback loop is particularly relevant for mixed-picture cases.",
      },
      {
        n: 5,
        name: "Stabilisation",
        desc: "Resolution framing, maintenance protocol, and setback management — designed for the long game.",
      },
    ],
    sections: [
      {
        heading: "What this means for you",
        body: "Your responses suggest somatic factors may be playing a role in your tinnitus, alongside other possible causes. Tinnitus rarely has a single origin, and a mixed picture is more common than a clear-cut one. The movements and symptoms you responded to indicate that jaw and neck involvement is worth exploring — even if the pattern is less definitive than in some cases.",
      },
      {
        heading: "Why this matters",
        body: "Even where somatic factors are one contributor among several, addressing them can meaningfully reduce overall tinnitus burden. A partial improvement is still an improvement — and for many people in the mixed category, the somatic component turns out to be more significant than their initial test result suggested.",
      },
    ],
    oliverNote:
      "My own picture took time to understand. The connection between jaw tension, neck mechanics, and tinnitus isn't always obvious at first — and a mixed result doesn't mean a dead end. It means the framework's identification phase is where you need to spend the most time. That's exactly what it's designed for.",
  },

  c: {
    badgeLabel: "Result C — Somatic Factors Less Likely",
    badgeBg: "bg-[#f5f5f5]",
    badgeBorder: "border-[#d1d5db]",
    badgeText: "text-muted",
    dotColor: "bg-muted",
    headline:
      "Your responses suggest somatic factors are less likely to be the primary cause of your tinnitus",
    subtext:
      "This does not mean your tinnitus is not worth addressing — it means a different approach may be more useful.",
    platformIntro: null,
    phases: [],
    sections: [
      {
        heading: "What this means",
        body: "This does not mean your tinnitus is not real or is not worth addressing. It means the specific somatic patterns this framework addresses may not be the primary cause in your case. Other causes — noise-induced hearing loss, cochlear damage, medication — may be more relevant and worth exploring with an audiologist or ENT specialist.",
      },
      {
        heading: "The honest picture",
        body: "Not all tinnitus is somatic, and it would be dishonest to suggest otherwise. If your responses did not show the patterns most associated with jaw and neck involvement, pursuing somatic approaches may not be the most productive use of your time and energy. I would rather tell you that clearly than have you spend months on something unlikely to help.",
      },
      {
        heading: "Where to go from here",
        body: "If you notice your tinnitus changing with jaw or neck movements in the future, the test will still be here. Somatic patterns are not always obvious and sometimes become clearer over time. In the meantime, the British Tinnitus Association and a referral to an audiologist are good next steps if you haven't already explored them.",
      },
    ],
    oliverNote: null,
  },
};

// Feature tiles — 3 tiles, rendered in a single row (3 columns)
const FEATURE_TILES = [
  {
    icon: "📊",
    name: "Progress Tracker",
    desc: "Daily check-in logging tinnitus loudness, jaw tension, neck tension, stress, and sleep. Visual trend graphs show your data over time.",
  },
  {
    icon: "🎬",
    name: "Exercise Library",
    desc: "Every exercise with a demonstration video, written instructions, and the specific mechanism it targets.",
  },
  {
    icon: "💬",
    name: "Community",
    desc: "Structured discussion spaces for jaw, neck, and postural patterns. Oliver actively present. Solution-focused.",
  },
];

// ─── Platform preview block (A and B only) ────────────────────────────────

function PlatformPreview({ content }) {
  return (
    <div className="bg-white border border-line rounded-xl overflow-hidden mb-8">
      {/* Dark header */}
      <div className="bg-dark px-8 py-7">
        <p className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-2">
          What you're getting access to
        </p>
        <h2 className="text-[20px] font-bold text-white tracking-[-0.01em] leading-[1.3] mb-2">
          A complete, structured framework for identifying and addressing somatic
          tinnitus
        </h2>
        <p className="text-[14px] text-white/55 leading-relaxed">
          {content.platformIntro}
        </p>
      </div>

      {/* Phase list */}
      {content.phases.map((phase, i) => (
        <div
          key={phase.n}
          className={`flex gap-5 items-start px-8 py-[22px] border-b border-line ${
            i === content.phases.length - 1 ? "border-b-0" : ""
          }`}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-bg border border-teal-border flex items-center justify-center text-[13px] font-bold text-primary mt-0.5">
            {phase.n}
          </div>
          <div>
            <p className="text-[15px] font-bold text-body mb-1">{phase.name}</p>
            <p className="text-[14px] text-muted leading-relaxed">{phase.desc}</p>
          </div>
        </div>
      ))}

      {/*
        Feature tiles — 3 columns so all three sit in a single row.
        "Free. Forever." tile removed per design update.
      */}
      <div className="grid grid-cols-3 gap-px bg-line border-t border-line">
        {FEATURE_TILES.map((tile) => (
          <div key={tile.name} className="bg-white px-5 py-[22px]">
            <div className="w-9 h-9 rounded-lg bg-teal-bg flex items-center justify-center text-lg mb-3">
              {tile.icon}
            </div>
            <p className="text-[14px] font-bold text-body mb-1">{tile.name}</p>
            <p className="text-[13px] text-muted leading-[1.55]">{tile.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

const SPOTS_LEFT = 2000;

export default function ResultPage({ params }) {
  const { classification } = React.use(params);
  const router = useRouter();
  const { testState } = useTest();
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const content = CONTENT[classification];

  // Guard: test not complete → send to start
  useEffect(() => {
    if (!testState.testComplete) {
      router.replace("/");
    }
  }, [testState.testComplete, router]);

  // Unknown slug → send to start
  useEffect(() => {
    if (!content) {
      router.replace("/");
    }
  }, [content, router]);

  if (!testState.testComplete || !content) return null;

  const { movementScore, symptomScore, noiseExposure, m4Asymmetric } = testState;
  const isC = classification === "c";

  /*
    Noise exposure warning: shown on all result pages when the user answered "Yes"
    to the pre-test noise exposure question. Placed directly after the subtext.
  */
  const showNoiseWarning = noiseExposure === "Yes";

  return (
    <>
      <Nav />

      <main className="max-w-[680px] mx-auto px-6 pt-12 pb-32">

        {/* Result badge */}
        <div
          className={`inline-flex items-center gap-2 ${content.badgeBg} border ${content.badgeBorder} ${content.badgeText} rounded-[20px] px-3.5 py-1.5 text-[13px] font-semibold mb-5`}
        >
          <span className={`w-2 h-2 rounded-full ${content.dotColor}`} />
          {content.badgeLabel}
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(22px,3.5vw,30px)] font-bold text-body tracking-[-0.02em] leading-[1.25] mb-3">
          {content.headline}
        </h1>
        <p className="text-[17px] text-muted leading-relaxed mb-5">
          {content.subtext}
        </p>

        {/*
          Noise exposure warning — only if the user answered "Yes" pre-test.
          Appears on all result types immediately after the subtext.
        */}
        {showNoiseWarning && (
          <p className="text-[14px] text-muted leading-relaxed bg-[#fff8f0] border border-[#f0d5a8] rounded-lg px-4 py-3 mb-7">
            Given your noise exposure history, it is worth ruling out
            noise-induced hearing loss with an audiologist if you have not
            already — this can contribute alongside somatic factors.
          </p>
        )}
        {!showNoiseWarning && <div className="mb-7" />}

        {/* Score bars — A and B only */}
        {!isC && (
          <ScoreBreakdown
            movementScore={movementScore}
            symptomScore={symptomScore}
          />
        )}

        {/*
          Asymmetric M4 note — shown on A and B only when the user selected
          "Yes, but more on one side than the other" on M4.
          Does not appear on Result C and does not affect classification.
        */}
        {!isC && m4Asymmetric && (
          <p className="text-[14px] text-muted leading-relaxed bg-teal-bg border border-teal-border rounded-lg px-4 py-3 mb-7">
            Your asymmetric response to head rotation suggests a lateralised
            tension pattern, which is something the framework addresses
            specifically in the identification phase.
          </p>
        )}

        {/* Result C: text sections appear before email */}
        {isC && (
          <div className="mb-4">
            {content.sections.map((s) => (
              <div key={s.heading} className="mb-8">
                <h3 className="text-[17px] font-bold text-body mb-2.5 tracking-[-0.01em]">
                  {s.heading}
                </h3>
                <p className="text-[15px] text-muted leading-[1.75]">{s.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Email capture */}
        {!emailSubmitted && (
          <EmailCaptureForm
            classification={classification.toUpperCase()}
            spotsLeft={isC ? undefined : SPOTS_LEFT}
            onSuccess={() => {
              setEmailSubmitted(true);
              router.push("/confirmation");
            }}
            isC={isC}
          />
        )}

        {/* Platform preview — A and B only */}
        {!isC && <PlatformPreview content={content} />}

        {/* Below-fold text sections — A and B */}
        {!isC &&
          content.sections.map((s) => (
            <div key={s.heading} className="mb-8">
              <h3 className="text-[17px] font-bold text-body mb-2.5 tracking-[-0.01em]">
                {s.heading}
              </h3>
              <p className="text-[15px] text-muted leading-[1.75]">{s.body}</p>
            </div>
          ))}

        {/* Oliver's note — A and B only */}
        {content.oliverNote && (
          <div className="mb-8">
            <h3 className="text-[17px] font-bold text-body mb-2.5 tracking-[-0.01em]">
              A note from Oliver
            </h3>
            <div className="bg-white border border-line border-l-[3px] border-l-primary rounded-lg px-7 py-6">
              <p className="text-[15px] text-body leading-[1.75] italic">
                {content.oliverNote}
              </p>
              <p className="text-[14px] text-muted font-medium mt-3">
                — Oliver, Founder
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <DisclaimerText>
          This result is not a medical diagnosis. The Somatic Tinnitus Project
          is an educational platform sharing personal experience and community
          insights. If you have not already, we recommend seeing a doctor to
          rule out other causes of your tinnitus before exploring somatic
          approaches. Nothing on this platform constitutes medical advice.
        </DisclaimerText>
      </main>

      <Footer />

      {/* Sticky bar — A & B use default variant, C uses community variant */}
      {!isC && (
        <StickyBar
          variant="default"
          spotsLeft={SPOTS_LEFT}
          emailSubmitted={emailSubmitted}
        />
      )}
      {isC && <StickyBar variant="community" emailSubmitted={emailSubmitted} />}
    </>
  );
}

/*
  Scoring logic — kept here for the synchronous navigation after finaliseTest().
  Must stay in sync with the implementation in TestContext.js.
*/
function computeClassification(movementScore, totalScore) {
  if (movementScore >= 9) return "A";
  if (totalScore >= 20 && movementScore >= 8) return "A";
  if (totalScore >= 20 && movementScore < 8) return "B";
  if (totalScore >= 14 && movementScore >= 7) return "B";
  if (totalScore >= 12) return "B";
  if (movementScore >= 6) return "B";
  return "C";
}
