/*
  Homepage — Server Component.
  Oliver's story is a static card with a "Read the full story" link to /learn-more.
  The expandable version lives on the Learn More page.
*/

import Link from "next/link";
import MemberLoginBar from "@/components/MemberLoginBar";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-2.5">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-line my-12" />;
}

// Tick list item — matches the style used on learn-more and result pages
function TickItem({ children }) {
  return (
    <li className="relative text-[15px] text-muted py-2.5 pl-6 border-b border-line last:border-b-0 leading-relaxed">
      <span className="absolute left-0 font-semibold text-primary">✓</span>
      {children}
    </li>
  );
}

export default function HomePage() {
  return (
    <>
      <MemberLoginBar />
      <main>
        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        {/* pb reduced from pb-16 to pb-8 to close dead space between hero and next section */}
        <section className="max-w-2xl mx-auto px-6 pt-10 pb-8">
          <span className="inline-block text-[12px] font-semibold text-primary uppercase tracking-[0.08em] mb-5">
            Somatic Tinnitus
          </span>

          <h1 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] tracking-[-0.02em] text-body mb-5">
            Your tinnitus may be more fixable than you think — especially if it changes with movement or tension
          </h1>

          <p className="text-[18px] text-muted leading-[1.65] mb-9 max-w-[560px]">
            For many people, tinnitus is influenced by jaw tension, neck
            tension, or posture. This is called somatic tinnitus — and unlike
            most forms of tinnitus, it can often be addressed.
          </p>

          {/*
            CTA buttons — stacked vertically, same width, so the layout
            looks deliberate. "Takes ~5 minutes" sits directly beneath the
            primary CTA, not orphaned below both buttons.
          */}
          <div className="flex flex-col gap-1 w-full max-w-[260px]">
            <PrimaryButton href="/noise-exposure" className="w-full">
              Take the Free Test
            </PrimaryButton>
            <p className="text-sm text-muted text-center">Takes ~5 minutes</p>
            <SecondaryButton href="/learn-more" className="w-full">
              Learn More
            </SecondaryButton>
          </div>
        </section>

        {/* ─── BELOW FOLD ───────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 pb-20">
          <Divider />

          <SectionLabel>What is somatic tinnitus</SectionLabel>
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-3">
            Tinnitus driven by your jaw and neck
          </h2>
          <p className="text-[16px] text-muted leading-[1.7] max-w-[580px]">
            Somatic tinnitus occurs when signals from the jaw, neck, or
            surrounding muscles interfere with the brain's sound processing
            system. Unlike tinnitus caused by hearing damage, these signals are
            driven by ongoing physical factors that can change — and in many
            cases, be reduced.
          </p>

          <Divider />

          <SectionLabel>Who this is for</SectionLabel>
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-3">
            You might recognise this
          </h2>
          <p className="text-[16px] text-muted leading-[1.7] max-w-[580px]">
            If your tinnitus seems to change with jaw movement, neck position,
            or stress — getting louder or quieter at different times of day —
            somatic factors may be involved. People whose tinnitus is constant
            and never varies are less likely to fit this pattern.
          </p>

          <Divider />

          <SectionLabel>Oliver's story</SectionLabel>
          {/* Heading updated to reflect the personal transformation */}
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-3">
            From debilitating tinnitus to silence. Here's what changed.
          </h2>

          {/* Static story card — links to Learn More for the full story */}
          <div className="bg-white border border-line rounded-[10px] px-8 py-7">
            <p className="text-[15px] text-body leading-[1.75]">
              I developed tinnitus at 16. It got progressively worse over months
              — affecting my sleep, my training, and my general quality of life
              to an extreme I simply didn't expect. I was told nothing could be
              done. I spent nearly two years searching for answers before I
              finally discovered somatic tinnitus — and went from 10/10 to
              silence.
            </p>
            <Link
              href="/learn-more"
              className="inline-block mt-3.5 text-[14px] font-medium text-primary hover:underline transition-colors duration-150"
            >
              Read the full story →
            </Link>
          </div>

          <Divider />

          <SectionLabel>Join the platform</SectionLabel>
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-3">
            The platform is live
          </h2>

          <p className="text-[16px] text-muted leading-[1.7] max-w-[580px] mb-4">
            A complete somatic tinnitus rehabilitation framework, built for
            people whose tinnitus has physical drivers.
          </p>

          <ul className="list-none mb-6 max-w-[580px]">
            <TickItem>Personalised five-phase framework based on your assessment</TickItem>
            <TickItem>Daily practice sessions tailored to your protocol</TickItem>
            <TickItem>Progress tracker and analytics</TickItem>
            <TickItem>Exercise library with demonstration videos</TickItem>
            <TickItem>Member community</TickItem>
          </ul>

          <PrimaryButton href="https://app.somatictinnitusproject.com/signup">
            Create your account
          </PrimaryButton>

          <Divider />

          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-3">
            What the test does
          </h2>
          <p className="text-[16px] text-muted leading-[1.7] max-w-[580px]">
            The test takes around 5 minutes and includes a series of physical
            movements and questions. It will tell you how likely it is that
            somatic factors are contributing to your tinnitus.
          </p>

          <div className="mt-7">
            <PrimaryButton href="/noise-exposure">Take the Free Test</PrimaryButton>
            <p className="text-sm text-muted mt-2">Takes ~5 minutes</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
