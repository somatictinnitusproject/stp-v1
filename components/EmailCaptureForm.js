"use client";

/*
  EmailCaptureForm — the waitlist sign-up form on result pages.
  POSTs to /api/subscribe with email + classification.
  After success, calls onSuccess(email) so the result page can store
  the email in context for the confirmation screen's duration follow-up.
*/

import { useState } from "react";
import { useTest } from "@/context/TestContext";

export default function EmailCaptureForm({
  classification,
  spotsLeft = 2000,
  onSuccess,
  isC = false,
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSubscribedEmail } = useTest();

  const buttonLabel =
    classification === "C" ? "Join the Community" : "Claim Your Free Access";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, classification }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      // Store email in context so the confirmation screen can send duration
      setSubscribedEmail(email);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="email-capture" className="bg-white border border-line rounded-xl p-8 mb-8">
      <h2 className="text-[20px] font-bold text-body mb-2">
        {isC ? "Join the community" : "Join the waitlist — get free lifetime access"}
      </h2>
      <p className="text-[15px] text-muted leading-relaxed mb-4">
        {isC
          ? "Even if somatic tinnitus is not your primary issue, the Somatic Tinnitus Project community shares research, experiences, and support. Free to join, no obligation."
          : "The Somatic Tinnitus Project is launching soon. The first 2,000 people to sign up get full access forever — no subscription fee, ever."}
      </p>
      {!isC && (
        <p className="text-[13px] font-medium text-primary mb-4">
          ↑ {spotsLeft.toLocaleString()} of 2,000 founding member spots remaining
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-2.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-[13px] rounded-[6px] border-[1.5px] border-line focus:border-primary outline-none text-[15px] text-body bg-site placeholder:text-[#9CA3AF] transition-colors duration-150 w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-hover text-white font-semibold text-base px-7 py-[13px] rounded-[6px] transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
          >
            {loading ? "Submitting…" : buttonLabel}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-[13px] mt-2">{error}</p>
        )}

        <p className="text-[12px] text-muted mt-2.5 leading-relaxed">
          No spam. Unsubscribe any time. Your data is handled in accordance with
          our privacy policy.
        </p>
      </form>
    </div>
  );
}
