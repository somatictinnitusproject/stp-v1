"use client";

/*
  Result page — /result/[classification] (a, b, or c)

  Page order for A and B:
    Badge → headline → subtext → noise flag → score breakdown → asymmetric note →
    "What this means for you" heading + short paras → proof line →
    "What happens next" section → email capture →
    platform preview → detailed sections → oliver note → disclaimer

  Result C keeps its original order (sections before email).
  Sticky bar is delayed 3 seconds before appearing.
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
    // Short paragraphs shown directly under "What this means for you" heading, before email
    shortPara1:
      "Your movements produced responses most associated with jaw and neck involvement in tinnitus — suggesting a physical, addressable component that most tinnitus advice never touches.",
    shortPara2:
      "Unlike tinnitus caused by hearing damage, somatic tinnitus is driven by mechanical factors that can change. Addressing them is what the framework is built around.",
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
    // Sections rendered below email — headings kept distinct from "What this means for you" above
    sections: [
      {
        heading: "What this means",
        body: "Somatic tinnitus occurs when signals from the jaw, neck, or surrounding muscles interfere with the brain's sound processing system. The movements you responded to in the test place direct mechanical load on the structures most commonly involved in this process. This means there may be a physical, addressable component that most tinnitus advice completely ignores.",
      },
      {
        heading: "Why this matters",
        body: "Unlike tinnitus caused by permanent hearing damage, somatic tinnitus is driven by ongoing mechanical and muscular factors that can change. Many people with a significant somatic component have been able to reduce their tinnitus meaningfully by addressing these underlying patterns — not by learning to live with it, but by addressing what is actually driving it.",
      },
    ],
    oliverNote:
      "I was told at 16 that nothing could be done. I spent nearly two years finding out that wasn't the full picture. What I eventually found was out there — it just hadn't been put together in one place, in a form someone could actually follow. That's what I built this to be.",
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
    shortPara1:
      "Your responses suggest somatic factors may be playing a role alongside other possible causes. A mixed picture is more common than a clear-cut one.",
    shortPara2:
      "Even where somatic factors are one contributor among several, addressing them can meaningfully reduce overall tinnitus burden. The framework's identification phase is specifically designed for mixed-picture cases.",
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
        heading: "What this means",
        body: "Your responses suggest somatic factors may be playing a role in your tinnitus, alongside other possible causes. Tinnitus rarely has a single origin, and a mixed picture is more common than a clear-cut one. The movements and symptoms you responded to indicate that jaw and neck involvement is worth exploring — even if the pattern is less definitive than in some cases.",
      },
      {
        heading: "Why this matters",
        body: "Even where somatic factors are one contributor among several, addressing them can meaningfully reduce overall tinnitus burden. A partial improvement is still an improvement — and for many people in the mixed category, the somatic component turns out to be more significant than their initial test result suggested.",
      },
    ],
    oliverNote:
      "My own picture took time to understand too. The somatic connection isn't always clear-cut at first — and a mixed result is often where it starts, not where it ends. The framework is built specifically for that.",
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
    shortPara1: null,
    shortPara2: null,
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

// Feature tiles — 3 columns on desktop, 1 column on mobile
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

// Tick items for the "What happens next" section
const WHAT_HAPPENS_NEXT = [
  "Your personalised tinnitus driver profile identified",
  "A step-by-step plan matched to your specific pattern",
  "Track tinnitus, jaw tension, neck tension, and sleep over time",
  "A community of people working through the same process",
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
        Feature tiles — stacks to single column on mobile, 3 columns on desktop.
        gap-px + bg-line creates hairline dividers between tiles.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border-t border-line">
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

  // Sticky bar is hidden on page load and appears after 3 seconds
  const [stickyVisible, setStickyVisible] = useState(false);

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

  // Show sticky bar after 3-second delay so it doesn't immediately compete with the result
  useEffect(() => {
    const timer = setTimeout(() => setStickyVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!testState.testComplete || !content) return null;

  const { movementScore, symptomScore, noiseExposure, m4Asymmetric, m3Unable } = testState;
  // Adjust movement max if user could not perform M3
  const movementMax = m3Unable ? 12 : 16;
  const isC = classification === "c";
  const showNoiseWarning = noiseExposure === "Yes";

  return (
    <>
      <Nav />

      <main className="max-w-[680px] mx-auto px-6 pt-12 pb-32">

        {/* 1. Result badge */}
        <div
          className={`inline-flex items-center gap-2 ${content.badgeBg} border ${content.badgeBorder} ${content.badgeText} rounded-[20px] px-3.5 py-1.5 text-[13px] font-semibold mb-5`}
        >
          <span className={`w-2 h-2 rounded-full ${content.dotColor}`} />
          {content.badgeLabel}
        </div>

        {/* 2. Headline */}
        <h1 className="text-[clamp(22px,3.5vw,30px)] font-bold text-body tracking-[-0.02em] leading-[1.25] mb-3">
          {content.headline}
        </h1>

        {/* 3. Subtext */}
        <p className="text-[17px] text-muted leading-relaxed mb-5">
          {content.subtext}
        </p>

        {/* 4. Noise exposure warning — only if user answered "Yes" pre-test */}
        {showNoiseWarning && (
          <p className="text-[14px] text-muted leading-relaxed bg-[#fff8f0] border border-[#f0d5a8] rounded-lg px-4 py-3 mb-7">
            Given your noise exposure history, it is worth ruling out
            noise-induced hearing loss with an audiologist if you have not
            already — this can contribute alongside somatic factors.
          </p>
        )}
        {!showNoiseWarning && <div className="mb-7" />}

        {/* 5. Score breakdown — A and B only */}
        {!isC && (
          <ScoreBreakdown
            movementScore={movementScore}
            symptomScore={symptomScore}
            movementMax={movementMax}
          />
        )}

        {/* 6. Asymmetric M4 note — A and B only, when user chose "more on one side" */}
        {!isC && m4Asymmetric && (
          <p className="text-[14px] text-muted leading-relaxed bg-teal-bg border border-teal-border rounded-lg px-4 py-3 mb-7">
            Your asymmetric response to head rotation suggests a lateralised
            tension pattern, which is something the framework addresses
            specifically in the identification phase.
          </p>
        )}

        {/* ── Result C: sections appear before email ─────────────────────────── */}
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

        {/* ── Result A and B: explanation → proof line → what happens next ───── */}
        {!isC && (
          <>
            {/* 7. "What this means for you" — single heading, covers both short paras */}
            <h3 className="text-[17px] font-bold text-body mb-3 tracking-[-0.01em]">
              What this means for you
            </h3>
            <p className="text-[15px] text-body leading-[1.75] mb-3">
              {content.shortPara1}
            </p>
            <p className="text-[15px] text-body leading-[1.75] mb-6">
              {content.shortPara2}
            </p>

            {/* 8. Proof line — research reference above "What happens next" */}
            <p className="text-[14px] text-muted leading-relaxed mb-6">
              The jaw-neck-tinnitus connection is well-documented in research — it just rarely makes it into standard clinical practice.
            </p>

            {/* 9. "What happens next" section */}
            <div className="mb-7">
              <h3 className="text-[17px] font-bold text-body mb-3 tracking-[-0.01em]">
                What happens next
              </h3>
              <p className="text-[15px] text-body leading-[1.75] mb-4">
                The Somatic Tinnitus Project is a structured five-phase framework
                for identifying and addressing somatic tinnitus — currently in development.
              </p>
              <ul className="list-none mb-4">
                {WHAT_HAPPENS_NEXT.map((item) => (
                  <li
                    key={item}
                    className="relative text-[15px] text-body py-2.5 pl-6 border-b border-line last:border-b-0 leading-relaxed"
                  >
                    <span className="absolute left-0 font-semibold text-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[14px] text-muted leading-relaxed">
                Founding members — the first 2,000 to sign up — get full access
                permanently at no cost when it launches.
              </p>
            </div>
          </>
        )}

        {/* 10. Email capture */}
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

        {/* 11. Platform preview — A and B only */}
        {!isC && <PlatformPreview content={content} />}

        {/* 12. Detailed sections — A and B only, rendered below email capture */}
        {!isC &&
          content.sections.map((s) => (
            <div key={s.heading} className="mb-8">
              <h3 className="text-[17px] font-bold text-body mb-2.5 tracking-[-0.01em]">
                {s.heading}
              </h3>
              <p className="text-[15px] text-muted leading-[1.75]">{s.body}</p>
            </div>
          ))}

        {/* 13. Oliver's note — A and B only */}
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

      {/*
        Sticky bar — delayed 3 seconds on result pages.
        A & B use default variant (teal, spot counter).
        C uses community variant.
      */}
      {stickyVisible && !isC && (
        <StickyBar
          variant="default"
          spotsLeft={SPOTS_LEFT}
          emailSubmitted={emailSubmitted}
        />
      )}
      {stickyVisible && isC && (
        <StickyBar variant="community" emailSubmitted={emailSubmitted} />
      )}
    </>
  );
}
