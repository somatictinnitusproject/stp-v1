/*
  ProgressBar — shown at the top of each question screen.
  Displays "Question X of 14" and a thin filled track.
  Hidden on the transition screen between movement and symptom sections.

  Props:
    current  — current question number (1–14)
    total    — total questions (14)
    section  — label for the right side e.g. "Movement section"
*/

export default function ProgressBar({ current, total = 14, section }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="max-w-[600px] mx-auto px-6 pt-6 pb-0">
      <div className="flex justify-between text-xs text-muted mb-2">
        <span>Question {current} of {total}</span>
        {section && <span>{section}</span>}
      </div>
      <div className="h-1 bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-[width] duration-400 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
