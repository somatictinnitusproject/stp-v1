// VideoPlaceholder — renders a Cloudflare Stream video embed when a real
// videoId is provided (32-character hex UID). If videoId is absent or
// starts with "PLACEHOLDER", renders a styled placeholder instead.
//
// Props:
//   videoId — Cloudflare Stream video UID
//   title — accessible title for the iframe
//   large — optional bool for sizing variant

export default function VideoPlaceholder({ videoId, title, large = false }) {
  const isReal = videoId && !videoId.startsWith("PLACEHOLDER");

  if (isReal) {
    return (
      <div
        style={{
          aspectRatio: '16 / 9',
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          backgroundColor: '#000',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <iframe
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          src={`https://iframe.cloudflarestream.com/${videoId}`}
          title={title ?? "Video demonstration"}
          allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
          allowFullScreen
        />
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
