/*
  Learn More page — /learn-more
  Explains the science of somatic tinnitus, shares Oliver's full story,
  and describes what the platform gives founding members.
  Server Component — no interactivity, just text and links.
*/

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import OliverStoryExpanded from "@/components/OliverStoryExpanded";
import LearnMoreProgress from "@/components/LearnMoreProgress";

export const metadata = {
  title: "What is somatic tinnitus? — The Somatic Tinnitus Project",
  description:
    "The mechanism behind somatic tinnitus, why most people are never told about it, and Oliver's story of going from 10/10 to silence.",
};

/* ─── Small reusable pieces ──────────────────────────────────────────────── */

function H2({ children }) {
  return (
    <h2 className="text-[19px] font-bold text-body tracking-[-0.01em] mt-9 mb-2.5">
      {children}
    </h2>
  );
}

function BodyText({ children }) {
  return (
    <p className="text-[15px] text-muted leading-[1.75] max-w-[580px]">
      {children}
    </p>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function LearnMorePage() {
  return (
    <>
      <Nav />
      {/* Sticky scroll progress — mobile only, shows fill % and current section name */}
      <LearnMoreProgress />

      <main className="max-w-[680px] mx-auto px-6 pt-16 pb-20">

        {/* Page heading */}
        <h1 className="text-[clamp(24px,4vw,34px)] font-bold text-body tracking-[-0.02em] leading-[1.25] mb-3">
          What is somatic tinnitus?
        </h1>
        <p className="text-[18px] text-muted leading-[1.65] mb-12 max-w-[560px]">
          Most people with tinnitus are told there is nothing that can be done.
          For a significant subset, that is not the full picture.
        </p>

        {/* The mechanism */}
        <H2>The mechanism</H2>
        <BodyText>
          Somatic tinnitus occurs when signals from the jaw, neck, or
          surrounding muscles interfere with the brain's sound processing
          system. Unlike tinnitus caused by permanent hearing damage, these
          signals are driven by ongoing physical factors that can change — and
          in many cases, be reduced.
        </BodyText>

        {/* Research citations — styled block, separated from body copy above */}
        <div className="mt-5 mb-2 border-t border-line pt-4">
          <p className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-2.5">
            Research References
          </p>
          <p className="text-[13px] text-muted leading-[1.8]">
            Ralli et al. — Journal of International Medical Research, 2017<br />
            Sanchez et al. — PubMed, 2013<br />
            Lee, Jin &amp; Jin — Audiology Research, 2022
          </p>
        </div>

        {/* Why most people are not told */}
        <H2>Why most people are not told about this</H2>
        <BodyText>
          Tinnitus is typically managed by audiologists and ENT specialists,
          whose training focuses on the auditory system. The jaw and neck
          connection is well-established in the research literature but rarely
          makes it into standard clinical practice. This is not negligence — it
          is a gap between research and routine care.
        </BodyText>

        {/* Signs checklist */}
        <H2>Signs your tinnitus might be somatic</H2>
        <ul className="mt-3 mb-7 list-none">
          {[
            "Your tinnitus fluctuates — louder at some times, quieter at others",
            "Jaw movement, neck position, or stress seems to affect it",
            "It started or worsened after dental work, jaw injury, or whiplash",
            "You clench your jaw or hold tension in your neck",
            "You notice jaw clicking, soreness, or stiffness",
            "It is worse after prolonged screen use or driving",
          ].map((item) => (
            <li
              key={item}
              className="relative text-[15px] text-muted py-2.5 pl-6 border-b border-line last:border-b-0 leading-relaxed"
            >
              {/* Teal checkmark */}
              <span className="absolute left-0 font-semibold text-primary">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Oliver's story — expandable Client Component */}
        <H2>Oliver's story</H2>
        <OliverStoryExpanded />

        {/* What you get access to — teal callout box */}
        <H2>What you get access to</H2>
        <div className="bg-teal-bg border border-teal-border rounded-lg px-7 py-6 mt-3 mb-8">
          <p className="text-[15px] text-body leading-[1.75]">
            The Somatic Tinnitus Project is a structured five-phase framework
            for identifying and addressing somatic tinnitus — built around the
            same process that enabled me to go from 10/10 to silence. It
            includes guided self-assessment, personalised driver protocols for
            jaw and cervical patterns, a daily progress tracker, an exercise
            library, and a community of people working through the same process.
            Founding members — the first 2,000 to sign up — get full access
            permanently at no cost. After that, membership opens at £2.99 per
            month.
          </p>
        </div>

        <PrimaryButton href="/noise-exposure">Take the Free Test</PrimaryButton>
        <p className="text-sm text-muted mt-2">Takes ~5 minutes</p>
      </main>

      <Footer />
    </>
  );
}
