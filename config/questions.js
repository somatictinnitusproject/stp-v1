/*
  Master list of all 14 question screens.
  Loaded by the dynamic route /test/[question] (slots 1–14).

  Slot 6 is the TRANSITION screen (type="transition") — not scoreable.
  Progress bar shows question numbers 1–5 (M1–M5) then 7–14 maps to
  display numbers 6–13, keeping a clean "Q of 13" count. The slot number
  itself is what drives routing; display numbering is handled in the page.

  Movement scoring: clearly changed=3, slightly=1, none=0
  Symptom scoring: see individual entries (varies per question)
*/

import { M1_VIDEO, M2_VIDEO, M3_VIDEO, M4_VIDEO, M5_VIDEO } from "./videos";

export const QUESTIONS = [

  // ─── SLOT 1 — M1: Jaw Opening ─────────────────────────────────────────────
  {
    slot: 1,
    type: "movement",
    id: "M1",
    tag: "M1 — Jaw Opening",
    text: "Open your mouth as wide as you possibly can. Hold for 5 seconds. Did your tinnitus change?",
    instruction:
      "Perform the movement, hold it, and pay close attention to any change — even a subtle one.",
    videoId: M1_VIDEO,
    videoTitle: "M1 — Jaw opening demonstration",
    options: [
      { label: "Yes, it clearly changed", score: 3 },
      { label: "Maybe, slightly changed", score: 1 },
      { label: "No change", score: 0 },
    ],
  },

  // ─── SLOT 2 — M2: Jaw Protrusion ──────────────────────────────────────────
  {
    slot: 2,
    type: "movement",
    id: "M2",
    tag: "M2 — Jaw Protrusion",
    text: "Push your lower jaw forward as far as you can — your bottom teeth should be in front of your top teeth. Hold for 5 seconds. Did your tinnitus change?",
    instruction:
      "Do this slowly. You are looking for any shift in the sound — louder, quieter, or different.",
    videoId: M2_VIDEO,
    videoTitle: "M2 — Jaw protrusion demonstration",
    options: [
      { label: "Yes, it clearly changed", score: 3 },
      { label: "Maybe, slightly changed", score: 1 },
      { label: "No change", score: 0 },
    ],
  },

  // ─── SLOT 3 — M3: Neck Flexion ────────────────────────────────────────────
  {
    slot: 3,
    type: "movement",
    id: "M3",
    tag: "M3 — Neck Flexion",
    text: "Lie on your back on the floor with your legs flat. Slowly lift your head toward your chest. Hold for 5 seconds. Did your tinnitus change?",
    instruction:
      "This question requires lying down. If you are unable to do this, select 'Unable to perform' below.",
    videoId: M3_VIDEO,
    videoTitle: "M3 — Neck flexion demonstration",
    options: [
      { label: "Yes, it clearly changed", score: 3 },
      { label: "Maybe, slightly changed", score: 1 },
      { label: "No change", score: 0 },
      { label: "Unable to perform", score: 0 },
    ],
  },

  // ─── SLOT 4 — M4: Neck Rotation (4 options incl. asymmetric) ─────────────
  {
    slot: 4,
    type: "movement",
    id: "M4",
    tag: "M4 — Neck Rotation",
    text: "Sitting upright, slowly turn your head as far as you can to the right. Hold for around 10 seconds. Then repeat to the left. Did your tinnitus change?",
    instruction:
      "Note whether the change was equal on both sides or stronger on one side.",
    videoId: M4_VIDEO,
    videoTitle: "M4 — Neck rotation demonstration",
    options: [
      { label: "Yes, it clearly changed on both sides", score: 3 },
      { label: "Yes, but more on one side than the other", score: 2, asymmetric: true },
      { label: "Maybe, slightly changed", score: 1 },
      { label: "No change", score: 0 },
    ],
  },

  // ─── SLOT 5 — M5: Chin Retraction ─────────────────────────────────────────
  {
    slot: 5,
    type: "movement",
    id: "M5",
    tag: "M5 — Chin Retraction",
    text: "Sitting upright, draw your chin straight back — as if making a double chin. Hold for 5 seconds. Did your tinnitus change?",
    instruction: "Move slowly and steadily. Stop if you feel any pain.",
    videoId: M5_VIDEO,
    videoTitle: "M5 — Chin retraction demonstration",
    options: [
      { label: "Yes, it clearly changed", score: 3 },
      { label: "Maybe, slightly changed", score: 1 },
      { label: "No change", score: 0 },
    ],
  },

  // ─── SLOT 6 — TRANSITION (no score, progress bar hidden) ─────────────────
  {
    slot: 6,
    type: "transition",
    id: null,
    tag: null,
    text: null,
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [],
  },

  // ─── SLOT 7 — S1: Unconscious Jaw Clenching ───────────────────────────────
  {
    slot: 7,
    type: "symptom",
    id: "S1",
    tag: "S1 — Unconscious Jaw Clenching",
    text: "Do you catch yourself clenching your jaw or holding tension in your jaw or face without realising it — or have others pointed this out to you?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "Yes, regularly", score: 2 },
      { label: "Sometimes or possibly", score: 1 },
      { label: "No", score: 0 },
    ],
  },

  // ─── SLOT 8 — S2: Morning Physical Correlates ────────────────────────────
  {
    slot: 8,
    type: "symptom",
    id: "S2",
    tag: "S2 — Morning Physical Correlates",
    text: "Do you wake up with jaw soreness, facial tension, or a headache?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "Yes, often", score: 2 },
      { label: "Sometimes", score: 1 },
      { label: "Rarely or never", score: 0 },
    ],
  },

  // ─── SLOT 9 — S3: Tinnitus Variability ───────────────────────────────────
  {
    slot: 9,
    type: "symptom",
    id: "S3",
    tag: "S3 — Tinnitus Variability",
    text: "Is your tinnitus roughly the same volume throughout the day, or does it fluctuate — getting noticeably louder or quieter at different times?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "It fluctuates noticeably", score: 3 },
      { label: "It varies slightly", score: 1 },
      { label: "It is roughly constant", score: 0 },
    ],
  },

  // ─── SLOT 10 — S4: Onset Event ────────────────────────────────────────────
  {
    slot: 10,
    type: "symptom",
    id: "S4",
    tag: "S4 — Onset Event",
    text: "Did your tinnitus begin or significantly worsen in connection with any of the following?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      {
        label:
          "Yes — after a specific event such as dental work, jaw injury, neck injury, or whiplash",
        score: 3,
      },
      {
        label:
          "Possibly — it developed gradually during or after a period of high stress, increased jaw tension, or poor posture habits",
        score: 2,
      },
      {
        label: "No — I cannot identify a clear trigger or pattern",
        score: 0,
      },
    ],
  },

  // ─── SLOT 11 — S5: Jaw Clicking or Popping ───────────────────────────────
  {
    slot: 11,
    type: "symptom",
    id: "S5",
    tag: "S5 — Jaw Clicking or Popping",
    text: "Do you experience clicking, popping, or grating sounds from your jaw when opening or closing your mouth?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "Yes", score: 2 },
      { label: "Sometimes", score: 1 },
      { label: "No", score: 0 },
    ],
  },

  // ─── SLOT 12 — S6: Jaw Pain or Stiffness ─────────────────────────────────
  {
    slot: 12,
    type: "symptom",
    id: "S6",
    tag: "S6 — Jaw Pain or Stiffness",
    text: "Do you experience pain, aching, or stiffness in your jaw — particularly when eating, yawning, or on waking?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "Yes", score: 2 },
      { label: "Sometimes", score: 1 },
      { label: "No", score: 0 },
    ],
  },

  // ─── SLOT 13 — S7: Neck Pain or Stiffness ────────────────────────────────
  {
    slot: 13,
    type: "symptom",
    id: "S7",
    tag: "S7 — Neck Pain or Stiffness",
    text: "Do you experience regular neck pain, stiffness, or restricted neck movement?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "Yes", score: 2 },
      { label: "Sometimes", score: 1 },
      { label: "No", score: 0 },
    ],
  },

  // ─── SLOT 14 — S8: Headaches ──────────────────────────────────────────────
  {
    slot: 14,
    type: "symptom",
    id: "S8",
    tag: "S8 — Headaches",
    text: "Do you experience regular headaches — particularly at the base of the skull, or pain that spreads from the neck up toward the head?",
    instruction: null,
    videoId: null,
    videoTitle: null,
    options: [
      { label: "Yes", score: 1 },
      { label: "Sometimes", score: 1 },
      { label: "No", score: 0 },
    ],
  },
];

// Returns the question object for a given slot number (1-based), or null
export function getQuestion(slot) {
  return QUESTIONS.find((q) => q.slot === slot) ?? null;
}

export const TOTAL_SLOTS = 14;
export const TRANSITION_SLOT = 6;
// Answerable questions (excludes transition slot)
export const TOTAL_QUESTIONS = 13;
