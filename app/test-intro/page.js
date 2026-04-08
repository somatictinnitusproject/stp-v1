"use client";

/*
  Test intro screen — /test-intro
  Shows Oliver's ~90-second introduction video and four expectation bullets.
  "Start the Test" navigates to question 1 (/test/1).

  Client Component because it uses useTest to guard access
  (user shouldn't land here without completing noise-exposure).
*/

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import PrimaryButton from "@/components/PrimaryButton";
import { useTest } from "@/context/TestContext";
import { INTRO_VIDEO } from "@/config/videos";

const BULLETS = [
  "Some movements may briefly change your tinnitus — that is exactly what we are looking for",
  "One question works best lying down — if that's not possible, there's an option to indicate that on the question itself and your score will adjust accordingly",
  "Honest responses matter more than any particular result",
  "The test takes around 5 minutes",
];

export default function TestIntroPage() {
  const router = useRouter();
  const { testState } = useTest();

  /*
    Guard: if noise-exposure hasn't been answered the user skipped ahead.
    Redirect them back to the start of the flow.
  */
  useEffect(() => {
    if (!testState.noiseExposure) {
      router.replace("/noise-exposure");
    }
  }, [testState.noiseExposure, router]);

  if (!testState.noiseExposure) return null;

  return (
    <>
      <Nav />

      <div className="max-w-[600px] mx-auto px-6 pt-[60px] pb-20">
        {/* Intro video placeholder — large play button */}
        <div className="mb-8">
          <VideoPlaceholder
            title="Oliver — Test introduction · ~90 seconds"
            large={true}
            videoId={INTRO_VIDEO}
          />
        </div>

        {/* Expectation bullets */}
        <ul className="mb-9 list-none">
          {BULLETS.map((text) => (
            <li
              key={text}
              className="relative text-[15px] text-muted py-3 pl-6 border-b border-line last:border-b-0 leading-relaxed"
            >
              <span className="absolute left-0 text-primary font-medium">→</span>
              {text}
            </li>
          ))}
        </ul>

        <PrimaryButton href="/test/1">Start the Test</PrimaryButton>
      </div>
    </>
  );
}
