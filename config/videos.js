/*
  Single source of truth for all YouTube video IDs used across the site.
  Components import from here — never hardcode IDs inside components.

  Replace each placeholder string with the real YouTube video ID once
  filming is complete. The ID is the part after "watch?v=" in a YouTube URL.
  Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
*/

// Oliver's ~90-second introduction shown on the test intro screen
export const INTRO_VIDEO = "PLACEHOLDER_INTRO";

// Demonstration videos shown during each movement question
export const M1_VIDEO = "PLACEHOLDER_M1"; // Jaw opening
export const M2_VIDEO = "PLACEHOLDER_M2"; // Jaw side-to-side
export const M3_VIDEO = "PLACEHOLDER_M3"; // Neck rotation
export const M4_VIDEO = "PLACEHOLDER_M4"; // Neck extension
export const M5_VIDEO = "PLACEHOLDER_M5"; // Shoulder shrug / pressure
