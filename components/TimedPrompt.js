"use client";

/*
  TimedPrompt — used on the noise-exposure screen.
  After the user selects an answer, it waits 300ms then auto-advances.
  This gives brief visual feedback before moving on.
  Built in: noise-exposure step.

  Props:
    options   — array of { label: string }
    onSelect  — callback(label) — parent handles navigation after delay
*/

import { useState } from "react";

export default function TimedPrompt({ options, onSelect }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(label) {
    if (selected) return; // prevent double-tap
    setSelected(label);
    setTimeout(() => onSelect(label), 300);
  }

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {options.map(({ label }) => (
        <button
          key={label}
          onClick={() => handleSelect(label)}
          className={[
            "w-full text-left bg-white border-[1.5px] rounded-lg px-5 py-4 text-[15px] font-medium transition-colors duration-150",
            selected === label
              ? "border-primary bg-teal-bg text-primary"
              : "border-line text-body hover:border-primary hover:bg-teal-bg",
          ].join(" ")}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
