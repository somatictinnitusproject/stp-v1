/*
  Single source of truth for all YouTube video IDs used across the site.
  Components import from here — never hardcode IDs inside components.

  Replace each placeholder string with the real YouTube video ID once
  filming is complete. The ID is the part after "watch?v=" in a YouTube URL.
  Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
*/

// Oliver's ~90-second introduction shown on the test intro screen
export const INTRO_VIDEO = "ny1kM1U6kuA";

// Demonstration videos shown during each movement question
export const M1_VIDEO = "RyOvSjwTAa8"; // Jaw opening
export const M2_VIDEO = "g-wb89GWEpo"; // Jaw protrusion
export const M3_VIDEO = "wuLNStxgprg"; // Neck flexion
export const M4_VIDEO = "AgEcfW2XgDI"; // Neck rotation
export const M5_VIDEO = "j1z88cyT1U0"; // Chin retraction
