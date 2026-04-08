/*
  Homepage — the entry point of the site.
  Tells the visitor what somatic tinnitus is, builds trust through Oliver's story,
  and funnels them toward the free test.

  This is a Server Component — no interactivity, just links and static content.
  All navigation uses Next.js <Link> for prefetching.
*/

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";

// Small reusable label for section headings
function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-2.5">
      {children}
    </p>
  );
}

// Horizontal rule used between below-fold sections
function Divider() {
  return <div className="h-px bg-line my-12" />;
}

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 pt-20 pb-16">
          <span className="inline-block text-[12px] font-semibold text-primary uppercase tracking-[0.08em] mb-5">
            Somatic Tinnitus
          </span>

          <h1 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.2] tracking-[-0.02em] text-body mb-5">
            Your tinnitus might be more fixable than you think
          </h1>

          <p className="text-[18px] text-muted leading-[1.65] mb-9 max-w-[560px]">
            For many people, tinnitus is influenced by jaw tension, neck
            tension, or posture. This is called somatic tinnitus — and unlike
            most forms of tinnitus, it can often be addressed.
          </p>

          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="/noise-exposure">
              Take the Free Test
            </PrimaryButton>
            <SecondaryButton href="/learn-more">Learn More</SecondaryButton>
          </div>
        </section>

        {/* ─── BELOW FOLD ───────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 pb-20">
          <Divider />

          {/* What is somatic tinnitus */}
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

          {/* Who this is for */}
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

          {/* Oliver's story */}
          <SectionLabel>Oliver's story</SectionLabel>
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-4">
            Built from personal experience
          </h2>

          {/* Story block — white card with italic quote */}
          <div className="bg-white border border-line rounded-[10px] px-8 py-7">
            <p className="text-[15px] text-body leading-[1.75] italic">
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

          {/* The test */}
          <SectionLabel>The test</SectionLabel>
          <h2 className="text-[22px] font-bold text-body tracking-[-0.01em] mb-3">
            What the test does
          </h2>
          <p className="text-[16px] text-muted leading-[1.7] max-w-[580px]">
            The test takes around 5 minutes and includes a series of physical
            movements and questions. It will tell you how likely it is that
            somatic factors are contributing to your tinnitus.
          </p>

          <div className="mt-7">
            <PrimaryButton href="/noise-exposure">
              Take the Free Test
            </PrimaryButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
