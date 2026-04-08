/*
  ResponseButton — used on question screens for answer options.
  White background, grey border. Teal border+text when selected.
  Teal border+teal-bg on hover. Radio dot animates to filled on selection.
  Built in: test/[question] step.
*/

export default function ResponseButton({
  label,
  selected = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-full flex items-center gap-3 text-left px-5 py-[15px] rounded-lg border-[1.5px] font-medium text-[15px] transition-colors duration-150",
        selected
          ? "border-primary bg-teal-bg text-primary"
          : "border-line bg-white text-body hover:border-primary hover:bg-teal-bg",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {/* Radio dot */}
      <span
        className={[
          "flex-shrink-0 w-[18px] h-[18px] rounded-full border-[1.5px] transition-all duration-150",
          selected ? "border-primary bg-primary" : "border-line",
        ].join(" ")}
      />
      {label}
    </button>
  );
}
