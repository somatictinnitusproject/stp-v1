"use client";

/*
  TestContext stores all state for the somatic tinnitus test flow.
  Using React Context (not localStorage or URL params) means state
  lives in memory for the session and is cleared on page refresh —
  which is intentional. It also means we can protect result pages
  by checking whether the test was actually completed.

  Any component inside <TestProvider> can call useTest() to
  read or update test state without props being passed down the tree.
*/

import { createContext, useContext, useState } from "react";

const TestContext = createContext(null);

// Starting state — clean slate before any questions are answered
const initialState = {
  // Pre-test question
  noiseExposure: null, // "Yes" | "No" | "Unsure"

  // Individual responses for all 14 questions
  // Stored as objects: { value: "Yes, it clearly changed", score: 3 }
  responses: {
    M1: null,
    M2: null,
    M3: null,
    M4: null,
    M5: null,
    S1: null,
    S2: null,
    S3: null,
    S4: null,
    S5: null,
    S6: null,
    S7: null,
    S8: null,
  },

  // M4-specific flag: "Yes, but more on one side than the other"
  // Used in scoring to track asymmetric response
  m4Asymmetric: false,

  // M3-specific flag: set true when user selects "Unable to perform" on M3.
  // Reduces movementMax from 16 to 12 and applies adjusted classification thresholds.
  m3Unable: false,

  // Running totals — updated after each question
  movementScore: 0, // max 16
  symptomScore: 0,  // max 17

  // Derived values
  totalScore: 0,    // movementScore + symptomScore, max 33
  classification: null, // "A" | "B" | "C" — set after last question

  // Edge case flags (e.g. noise-induced tinnitus qualifier)
  noiseInducedFlag: false,

  // Whether the test has been fully completed
  testComplete: false,

  // Email stored after successful subscription so the confirmation screen
  // can send a follow-up PATCH with the tinnitus duration field
  subscribedEmail: null,
};

export function TestProvider({ children }) {
  const [testState, setTestState] = useState(initialState);

  // Record the noise exposure answer from the pre-test screen
  function setNoiseExposure(answer) {
    setTestState((prev) => ({ ...prev, noiseExposure: answer }));
  }

  // Record an individual question response and update running scores.
  // questionId: "M1"..."M5", "S1"..."S8"
  // response: { label: string, score: number }
  function recordResponse(questionId, response) {
    setTestState((prev) => {
      const updatedResponses = { ...prev.responses, [questionId]: response };

      // Recalculate movement score (M1-M5)
      const movementScore = ["M1", "M2", "M3", "M4", "M5"].reduce(
        (sum, id) => sum + (updatedResponses[id]?.score ?? 0),
        0
      );

      // Recalculate symptom score (S1-S8)
      const symptomScore = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].reduce(
        (sum, id) => sum + (updatedResponses[id]?.score ?? 0),
        0
      );

      // Track M3 unable flag — clears if user goes back and changes their answer
      const m3Unable =
        questionId === "M3"
          ? response.label === "Unable to perform"
          : prev.m3Unable;

      return {
        ...prev,
        responses: updatedResponses,
        movementScore,
        symptomScore,
        totalScore: movementScore + symptomScore,
        m3Unable,
      };
    });
  }

  // Set the M4 asymmetric flag separately (fourth option on M4)
  function setM4Asymmetric(value) {
    setTestState((prev) => ({ ...prev, m4Asymmetric: value }));
  }

  /*
    Scoring logic:

    Standard thresholds (movementMax = 16):
      if movementScore >= 9                              → Result A
      else if total >= 20 AND movementScore >= 8        → Result A
      else if total >= 20 AND movementScore < 8         → Result B
      else if total >= 14 AND movementScore >= 7        → Result B
      else if total >= 12                               → Result B
      else if movementScore >= 6                        → Result B
      else                                              → Result C

    Adjusted thresholds when m3Unable = true (movementMax = 12):
      if movementScore >= 7                              → Result A
      else if total >= 20 AND movementScore >= 6        → Result A
      else if total >= 20 AND movementScore < 6         → Result B
      else if total >= 14 AND movementScore >= 5        → Result B
      else if total >= 12                               → Result B
      else if movementScore >= 5                        → Result B
      else                                              → Result C
  */
  function calculateClassification(movementScore, totalScore, m3Unable = false) {
    if (m3Unable) {
      if (movementScore >= 7) return "A";
      if (totalScore >= 20 && movementScore >= 6) return "A";
      if (totalScore >= 20 && movementScore < 6) return "B";
      if (totalScore >= 14 && movementScore >= 5) return "B";
      if (totalScore >= 12) return "B";
      if (movementScore >= 5) return "B";
      return "C";
    }
    if (movementScore >= 9) return "A";
    if (totalScore >= 20 && movementScore >= 8) return "A";
    if (totalScore >= 20 && movementScore < 8) return "B";
    if (totalScore >= 14 && movementScore >= 7) return "B";
    if (totalScore >= 12) return "B";
    if (movementScore >= 6) return "B";
    return "C";
  }

  // Called after the final question — locks in the classification
  function finaliseTest() {
    setTestState((prev) => {
      const classification = calculateClassification(
        prev.movementScore,
        prev.totalScore,
        prev.m3Unable
      );
      return { ...prev, classification, testComplete: true };
    });
  }

  // Stores the email after successful subscription so the confirmation
  // screen can send the optional duration field as a follow-up
  function setSubscribedEmail(email) {
    setTestState((prev) => ({ ...prev, subscribedEmail: email }));
  }

  // Reset everything — used if user wants to retake the test
  function resetTest() {
    setTestState(initialState);
  }

  return (
    <TestContext.Provider
      value={{
        testState,
        setNoiseExposure,
        recordResponse,
        setM4Asymmetric,
        finaliseTest,
        setSubscribedEmail,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

// Custom hook — components call useTest() instead of useContext(TestContext)
export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used inside a <TestProvider>");
  }
  return context;
}
