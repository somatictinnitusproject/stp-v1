/*
  Single source of truth for all YouTube video IDs used across the site.
  Components import from here — never hardcode IDs inside components.

  Replace each placeholder string with the real YouTube video ID once
  filming is complete. The ID is the part after "watch?v=" in a YouTube URL.
  Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
*/

// Oliver's ~90-second introduction shown on the test intro screen
export const INTRO_VIDEO = "FJQOI0tUzgk";

// Demonstration videos shown during each movement question
export const M1_VIDEO = "HZf5uDRxCkA"; // Jaw opening
export const M2_VIDEO = "u55by7l4lvg"; // Jaw protrusion
export const M3_VIDEO = "VFgXG1-S-lE"; // Neck flexion
export const M4_VIDEO = "M-ZMZF2_oYw"; // Neck rotation
export const M5_VIDEO = "DaHdkYAgKGQ"; // Chin retraction
