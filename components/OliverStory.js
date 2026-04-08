"use client";

/*
  OliverStory — expandable story block on the homepage.
  Shows the first 2-3 sentences by default. "Read more" reveals the full text.
  Extracted as a Client Component so the rest of the homepage stays server-rendered.
*/

import { useState } from "react";

const PREVIEW =
  "I developed tinnitus at 16. It got progressively worse over months — affecting my sleep, my training, and my general quality of life to an extreme I simply didn't expect. I was told nothing could be done.";

const FULL_PARAGRAPHS = [
  "I spent nearly two years searching for answers before I finally discovered somatic tinnitus — and went from 10/10 to silence.",
  "Like most people, I was told it was something you learned to live with. I couldn't. So I started looking for another answer.",
  "I researched. I found the usual advice — habituation, masking, managing your reaction to the sound rather than the sound itself. I tried dietary approaches that achieved little. Everything pointed toward coping with tinnitus, not addressing it.",
  "What I didn't find — what didn't come up at all for nearly two years — was somatic tinnitus. Not because it isn't real or isn't documented. Because the information simply isn't out there in any structured, findable form. If you don't already know what you're looking for, you won't find it.",
  "There were patterns I'd been ignoring for months without realising what they meant. My tinnitus was always louder after gym sessions. It fluctuated throughout the day in ways I'd written off as random — worse during stressful periods, quieter when I was genuinely relaxed. None of it felt random once I had the framework to understand it.",
  "When I finally searched specifically for why my tinnitus spiked after training, everything changed. Intensive research and systematic self-experimentation later, I went from 10/10 to silence.",
  "I built the Somatic Tinnitus Project because if something like this had existed when I was 16, I would have found the answer in weeks rather than years. The information was always there. It just wasn't in one place, structured, and findable by someone who didn't already know what they were looking for.",
];

export default function OliverStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-line rounded-[10px] px-8 py-7">
      {/* Preview text — always visible */}
      <p className="text-[15px] text-body leading-[1.75] italic">
        {PREVIEW}
      </p>

      {/* Expanded paragraphs — only visible when expanded */}
      {expanded && (
        <div className="mt-3 space-y-3">
          {FULL_PARAGRAPHS.map((para, i) => (
            <p key={i} className="text-[15px] text-body leading-[1.75] italic">
              {para}
            </p>
          ))}
          <p className="text-[14px] text-muted font-medium not-italic mt-1">— Oliver</p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="inline-block mt-3.5 py-2 pr-2 text-[14px] font-medium text-primary hover:underline transition-colors duration-150"
      >
        {expanded ? "Read less ↑" : "Read more →"}
      </button>
    </div>
  );
}
