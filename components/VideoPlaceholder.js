/*
  VideoPlaceholder — renders a YouTube Shorts embed when a real videoId is
  provided, or falls back to a dark placeholder card for any remaining slots.

  Props:
    videoId — YouTube video ID string (e.g. "abc123"). If absent or starts
              with "PLACEHOLDER", shows the placeholder card instead.
    title   — label shown on the placeholder card (not shown when video is live)
    large   — boolean, makes the placeholder play button larger (intro screen)

  Shorts are 9:16 portrait. The embed is capped at 320px wide and centred so
  it looks natural on both mobile and desktop without stretching.
*/

export default function VideoPlaceholder({ videoId, title, large = false }) {
  const isReal = videoId && !videoId.startsWith("PLACEHOLDER");

  if (isReal) {
    return (
      // Portrait container — 9:16 ratio, max 320px wide, centred
      <div className="mx-auto w-full max-w-[320px]">
        <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-[10px]"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title ?? "Video demonstration"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Fallback placeholder card
  return (
    <div className="relative w-full rounded-[10px] overflow-hidden bg-dark aspect-video flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a35] to-[#0d1f1c]" />
      <div
        className={[
          "relative z-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center",
          large ? "w-14 h-14" : "w-11 h-11",
        ].join(" ")}
      >
        <span
          className={[
            "block border-t-transparent border-b-transparent border-l-white ml-1",
            large
              ? "border-t-[11px] border-b-[11px] border-l-[18px]"
              : "border-t-[9px] border-b-[9px] border-l-[14px]",
          ].join(" ")}
        />
      </div>
      {title && (
        <span className="absolute bottom-3.5 left-[18px] z-10 text-[13px] text-white/60">
          {title}
        </span>
      )}
    </div>
  );
}
