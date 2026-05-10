"use client";

/*
  Noise-exposure screen — /noise-exposure
  First stop in the test flow. Asks about loud noise history.
  User taps an option → 300ms visual feedback → auto-advances to test-intro.
  The answer is saved to TestContext so it can be stored with the email later.
*/

import { useRouter } from "next/navigation";
import TimedPrompt from "@/components/TimedPrompt";
import { useTest } from "@/context/TestContext";

const OPTIONS = [
  { label: "Yes" },
  { label: "No" },
  { label: "Unsure" },
];

export default function NoiseExposurePage() {
  const router = useRouter();
  const { setNoiseExposure } = useTest();

  // Save the answer then navigate — the 300ms delay lives inside TimedPrompt
  function handleSelect(label) {
    setNoiseExposure(label);
    router.push("/test-intro");
  }

  return (
    <>
      <div className="max-w-[600px] mx-auto px-6 py-20">
        <span className="block text-[12px] font-semibold text-primary uppercase tracking-[0.08em] mb-4">
          Before we begin
        </span>

        <h2 className="text-[clamp(20px,3vw,26px)] font-bold text-body leading-[1.35] tracking-[-0.01em] mb-8 max-w-[520px]">
          Have you had significant unprotected exposure to loud noise? For
          example loud workplaces, concerts, firearms, or prolonged use of
          headphones at high volume.
        </h2>

        <TimedPrompt options={OPTIONS} onSelect={handleSelect} />
      </div>
    </>
  );
}
