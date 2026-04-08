/*
  VideoPlaceholder — shown in all video slots until filming is complete.
  Dark container with a gradient background, centred play button icon,
  and the video title at the bottom.

  Props:
    title  — label shown at the bottom of the placeholder
    large  — boolean, uses a larger play button (for the intro screen)
*/

export default function VideoPlaceholder({ title, large = false }) {
  return (
    <div className="relative w-full rounded-[10px] overflow-hidden bg-dark aspect-video flex items-center justify-center">
      {/* Subtle directional gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a35] to-[#0d1f1c]" />

      {/* Play button icon */}
      <div
        className={[
          "relative z-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center",
          large ? "w-14 h-14" : "w-11 h-11",
        ].join(" ")}
      >
        {/* Triangle rendered with borders — pure CSS, no SVG needed */}
        <span
          className={[
            "block border-t-transparent border-b-transparent border-l-white ml-1",
            large
              ? "border-t-[11px] border-b-[11px] border-l-[18px]"
              : "border-t-[9px] border-b-[9px] border-l-[14px]",
          ].join(" ")}
        />
      </div>

      {/* Video label */}
      {title && (
        <span className="absolute bottom-3.5 left-[18px] z-10 text-[13px] text-white/60">
          {title}
        </span>
      )}
    </div>
  );
}
