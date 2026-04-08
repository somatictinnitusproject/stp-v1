"use client";

/*
  ScoreBreakdown — animated score bars on result pages.
  Each bar animates from 0 to its value on first render.
  Built in: result/[classification] step.

  Props:
    movementScore — number (max 16)
    symptomScore  — number (max 17)
*/

import { useEffect, useState } from "react";

function ScoreBar({ label, score, max }) {
  const [width, setWidth] = useState(0);

  // Trigger animation after mount — starts at 0 then fills to actual value
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.round((score / max) * 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [score, max]);

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-[13px] text-body mb-1.5">
        <span>{label}</span>
        <span className="text-muted">
          {score} / {max}
        </span>
      </div>
      <div className="h-1.5 bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-[width] duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function ScoreBreakdown({ movementScore, symptomScore, movementMax = 16 }) {
  return (
    <div className="bg-white border border-line rounded-[10px] px-6 py-5 mb-7">
      <p className="text-[12px] font-semibold text-muted uppercase tracking-[0.07em] mb-3.5">
        Your score breakdown
      </p>
      <ScoreBar label="Movement responses" score={movementScore} max={movementMax} />
      <ScoreBar label="Symptom history" score={symptomScore} max={17} />
      <p className="text-sm text-muted mt-3 leading-relaxed">
        Movement score shows how strongly your tinnitus responds to jaw and neck load. Symptom score reflects the wider pattern of somatic involvement.
      </p>
    </div>
  );
}
