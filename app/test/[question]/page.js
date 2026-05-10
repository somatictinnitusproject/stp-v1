"use client";

/*
  Dynamic question route — /test/[question] (slots 1–14)

  Handles three screen types based on slot:
    type="movement"   — question with video, buttons disabled until video plays
    type="transition" — pause screen between movement and symptom sections
    type="symptom"    — question with no video, buttons always enabled

  Navigation:
    Back button goes to previous slot (or /test-intro from slot 1)
    Next/Continue button goes to next slot or /result/[classification] after slot 14
    Final slot button label: "See My Result"

  Guard: redirects to /noise-exposure if context has no noiseExposure answer.
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ResponseButton from "@/components/ResponseButton";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import PrimaryButton from "@/components/PrimaryButton";
import { useTest } from "@/context/TestContext";
import { getQuestion, TRANSITION_SLOT, TOTAL_SLOTS } from "@/config/questions";
import React from "react";

/*
  Since Next.js 16 uses React 19, params must be unwrapped with React.use()
  when accessed in Client Components. The params prop is a Promise in this version.
*/
export default function QuestionPage({ params }) {
  const { question: slotParam } = React.use(params);
  const slot = parseInt(slotParam, 10);
  const router = useRouter();
  const { testState, recordResponse, setM4Asymmetric, finaliseTest } = useTest();

  // Which option is currently selected on this screen
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Loading overlay — shown for 1.75s when the user submits the final question
  const [showingLoader, setShowingLoader] = useState(false);

  // Buttons are always enabled — video is contextual, not a gate
  const [videoWatched] = useState(true);

  const q = getQuestion(slot);

  // Guard: missing prerequisite → send to start
  useEffect(() => {
    if (!testState.noiseExposure) {
      router.replace("/noise-exposure");
    }
  }, [testState.noiseExposure, router]);

  // Reset selection when slot changes (user navigated back/forward)
  useEffect(() => {
    if (!q || q.type === "transition") return;
    const existing = testState.responses[q.id];
    if (existing) {
      const idx = q.options.findIndex((o) => o.label === existing.label);
      setSelectedIndex(idx >= 0 ? idx : null);
    } else {
      setSelectedIndex(null);
    }
    // videoWatched is always true — no watch gate
  }, [slot]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!testState.noiseExposure || !q) return null;

  // ── Transition screen ─────────────────────────────────────────────────────
  if (q.type === "transition") {
    return (
      <>
        <div className="max-w-[600px] mx-auto px-6 py-24 text-center">
          {/* Teal circle with checkmark */}
          <div className="w-14 h-14 rounded-full bg-teal-bg border border-teal-border flex items-center justify-center mx-auto mb-6 text-[22px]">
            ✓
          </div>
          <h2 className="text-[22px] font-bold text-body mb-3">
            Movement section complete
          </h2>
          <p className="text-[16px] text-muted leading-relaxed mb-9 max-w-md mx-auto">
            That is the movement section done. The next few questions are about
            your experience with tinnitus more generally.
          </p>
          <div className="flex justify-between items-center border-t border-line pt-6 mt-2">
            <button
              onClick={() => router.push(`/test/${slot - 1}`)}
              className="text-[14px] text-muted hover:text-body transition-colors duration-150"
            >
              ← Back
            </button>
            <PrimaryButton onClick={() => router.push(`/test/${slot + 1}`)}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </>
    );
  }

  // ── Movement or Symptom question screen ───────────────────────────────────

  const isLastSlot = slot === TOTAL_SLOTS;
  const isMovement = q.type === "movement";
  // For progress bar, we show the slot number directly (1–14, skipping 6)
  const progressNumber = slot > TRANSITION_SLOT ? slot - 1 : slot;

  function handleSelect(index) {
    const option = q.options[index];
    setSelectedIndex(index);

    // Record the response in context
    recordResponse(q.id, { label: option.label, score: option.score });

    // M4 asymmetric flag
    if (q.id === "M4" && option.asymmetric) {
      setM4Asymmetric(true);
    } else if (q.id === "M4") {
      setM4Asymmetric(false);
    }
  }

  function handleNext() {
    if (isLastSlot) {
      // Show loading screen, then finalise and navigate after 1.75 seconds
      setShowingLoader(true);
      finaliseTest();
      setTimeout(() => {
        const { movementScore, totalScore, m3Unable } = testState;
        const classification = computeClassification(movementScore, totalScore, m3Unable);
        router.push(`/result/${classification.toLowerCase()}`);
      }, 1750);
    } else {
      router.push(`/test/${slot + 1}`);
    }
  }

  function handleBack() {
    if (slot === 1) {
      router.push("/test-intro");
    } else {
      router.push(`/test/${slot - 1}`);
    }
  }

  /*
    Loading overlay — full-screen white screen with teal spinner.
    Shown for 1.75s after the user submits the final question.
    Renders over everything using fixed positioning.
  */
  if (showingLoader) {
    return (
      <div className="fixed inset-0 bg-[#F8F7F4] z-50 flex flex-col items-center justify-center gap-6">
        {/* Teal spinning ring */}
        <div className="w-12 h-12 rounded-full border-4 border-[#D1D5DB] border-t-primary animate-spin" />
        <div className="text-center">
          <p className="text-[16px] font-medium text-muted tracking-[-0.01em]">
            Analysing your responses…
          </p>
          <p className="text-sm text-muted mt-1">This takes just a moment</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Progress bar — hidden on transition (handled above), visible on all others */}
      <ProgressBar
        current={progressNumber}
        total={13}
        section={isMovement ? "Movement section" : "Symptom section"}
      />

      {/* Question card with slide-in animation */}
      <div className="max-w-[600px] mx-auto px-6 pt-10 pb-20 animate-[slideIn_0.3s_ease]">
        {/* Question label */}
        <p className="text-[12px] font-semibold text-primary uppercase tracking-[0.08em] mb-2">
          {q.tag}
        </p>

        {/* Question text */}
        <p className="text-[clamp(18px,2.5vw,22px)] font-semibold text-body leading-[1.4] tracking-[-0.01em] mb-2">
          {q.text}
        </p>

        {/* Instruction */}
        {q.instruction && (
          <p className="text-[14px] text-muted leading-relaxed mb-6">
            {q.instruction}
          </p>
        )}

        {/* Video — movement questions only */}
        {isMovement && (
          <div className="mb-6">
            <VideoPlaceholder videoId={q.videoId} title={q.videoTitle} />
          </div>
        )}

        {/* Response options */}
        <div
          className={[
            "flex flex-col gap-2.5",
            !isMovement ? "mt-7" : "",
          ].join(" ")}
        >
          {q.options.map((option, i) => (
            <ResponseButton
              key={option.label}
              label={option.label}
              selected={selectedIndex === i}
              disabled={isMovement && !videoWatched}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>

        {/* M3 unable-to-perform note — explains score adjustment to user */}
        {q.id === "M3" && (
          <p className="text-[13px] text-muted mt-3 leading-relaxed">
            Selecting "Unable to perform" adjusts your score to account for
            the missing movement — it will not unfairly affect your result.
          </p>
        )}

        {/* Navigation row */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-line">
          <button
            onClick={handleBack}
            className="text-[14px] text-muted hover:text-body transition-colors duration-150 py-3 pr-4"
          >
            ← Back
          </button>
          <PrimaryButton
            onClick={handleNext}
            disabled={selectedIndex === null}
            className="text-sm px-5 py-2.5"
          >
            {isLastSlot ? "See My Result" : "Next"}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}

/*
  Scoring logic is duplicated here (also in TestContext) because finaliseTest()
  uses setState which is async — we need the classification synchronously to
  navigate to the right result URL before the state update settles.
  Both implementations must stay in sync with TestContext.js scoring spec.
  Includes adjusted thresholds when m3Unable = true (movementMax drops from 16 to 12).
*/
function computeClassification(movementScore, totalScore, m3Unable = false) {
  if (m3Unable) {
    if (movementScore >= 7) return "A";
    if (totalScore >= 20 && movementScore >= 6) return "A";
    if (totalScore >= 20 && movementScore < 6) return "B";
    if (totalScore >= 14 && movementScore >= 5) return "B";
    if (totalScore >= 12) return "B";
    if (movementScore >= 5) return "B";
    return "C";
  }
  if (movementScore >= 9) return "A";
  if (totalScore >= 20 && movementScore >= 8) return "A";
  if (totalScore >= 20 && movementScore < 8) return "B";
  if (totalScore >= 14 && movementScore >= 7) return "B";
  if (totalScore >= 12) return "B";
  if (movementScore >= 6) return "B";
  return "C";
}
