"use client";

/*
  OliverStoryExpanded — used on the Learn More page.
  Shows 4 preview paragraphs (the 4th cut at "was somatic tinnitus").
  "Read more" reveals the rest inline; "Read less" collapses back.
*/

import { useState } from "react";

// The 4th paragraph is split so the preview ends at "...was somatic tinnitus"
const PREVIEW_PARAS = [
  "I developed tinnitus at 16. For the first few months it was manageable — present but not dominant. Then it got worse. And kept getting worse.",
  "Like most people, I was told it was something you learned to live with. I couldn't. So I started looking for another answer.",
  "I researched. I found the usual advice — habituation, masking, managing your reaction to the sound rather than the sound itself. I tried dietary approaches that achieved little. Everything pointed toward coping with tinnitus, not addressing it.",
  "What I didn't find — what didn't come up at all for nearly two years — was somatic tinnitus.",
];

// The remainder of para 4, then paras 5–9
const EXPANDED_PARAS = [
  "Not because it isn't real or isn't documented. Because the information simply isn't out there in any structured, findable form. If you don't already know what you're looking for, you won't find it.",
  "There were patterns I'd been ignoring for months without realising what they meant. My tinnitus was always louder after gym sessions. It fluctuated throughout the day in ways I'd written off as random — worse during stressful periods, quieter when I was genuinely relaxed. None of it felt random once I had the framework to understand it. But without that framework, the patterns were invisible.",
  "When I finally searched specifically for why my tinnitus spiked after training, everything changed. Intensive research and systematic self-experimentation later, I went from 10/10 to silence.",
  "The two years in between were the lowest period of my life. Tinnitus at that volume doesn't just sit in the background — it's something constantly present that you cannot remove, cannot explain to anyone who hasn't experienced it, and cannot fully escape from. It affected my sleep. It affected my training. It made me less myself in ways that are hard to articulate.",
  "I built the Somatic Tinnitus Project because if something like this had existed when I was 16, I would have found the answer in weeks rather than years. The information was always there. It just wasn't in one place, structured, and findable by someone who didn't already know what they were looking for.",
  "If any of this sounds familiar — if your tinnitus fluctuates, if it seems to track your stress or your tension, if you've been told nothing can be done and haven't fully accepted that — the test is a good place to start.",
];

export default function OliverStoryExpanded() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-line border-l-[3px] border-l-primary rounded-lg px-8 py-7 mt-4 mb-7">
      {/* Preview paragraphs — always visible */}
      {PREVIEW_PARAS.map((para, i) => (
        <p key={i} className="text-[15px] text-body leading-[1.8] mb-3.5">
          {para}
        </p>
      ))}

      {/* Expanded content */}
      {expanded && (
        <>
          {EXPANDED_PARAS.map((para, i) => (
            <p key={i} className="text-[15px] text-body leading-[1.8] mb-3.5">
              {para}
            </p>
          ))}
          <p className="text-[14px] text-muted font-medium mt-1">— Oliver</p>
        </>
      )}

      {/* Toggle — py-2 gives a 48px+ touch target on mobile */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded((v) => !v)}
        onTouchEnd={(e) => { e.preventDefault(); setExpanded((v) => !v); }}
        onKeyDown={(e) => e.key === "Enter" && setExpanded((v) => !v)}
        style={{ touchAction: "manipulation", cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
        className="inline-block mt-1 py-2 pr-2 text-[14px] font-medium text-primary hover:underline transition-colors duration-150 select-none"
      >
        {expanded ? "Read less ↑" : "Read more →"}
      </div>
    </div>
  );
}
