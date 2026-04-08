"use client";

/*
  VideoPlayer — wraps the YouTube IFrame Player API.
  Shows a VideoPlaceholder until the video ID is real.
  Fires onVideoComplete when the video reaches the end,
  which the question screen uses to enable the response buttons.

  Built in: test/[question] step (movement questions M1–M5).

  Props:
    videoId        — YouTube video ID from config/videos.js
    title          — label for the placeholder
    onVideoComplete — callback fired when playback ends
*/

import VideoPlaceholder from "./VideoPlaceholder";

export default function VideoPlayer({ videoId, title, onVideoComplete }) {
  // If the video ID is still a placeholder, show the static placeholder
  if (!videoId || videoId.startsWith("PLACEHOLDER")) {
    return <VideoPlaceholder title={title} />;
  }

  // Real YouTube embed — IFrame API integration built in test step
  return (
    <div className="relative w-full rounded-[8px] overflow-hidden aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
