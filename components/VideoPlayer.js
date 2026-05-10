"use client";

// VideoPlayer — wraps a Cloudflare Stream embed in 16:9 layout.

import VideoPlaceholder from "./VideoPlaceholder";

export default function VideoPlayer({ videoId, title, onVideoComplete }) {
  // If the video ID is still a placeholder, show the static placeholder
  if (!videoId || videoId.startsWith("PLACEHOLDER")) {
    return <VideoPlaceholder title={title} />;
  }

  // Real video — Cloudflare Stream iframe.
  return (
    <div className="relative w-full rounded-[8px] overflow-hidden aspect-video">
      <iframe
        src={`https://iframe.cloudflarestream.com/${videoId}`}
        title={title}
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
