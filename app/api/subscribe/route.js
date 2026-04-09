/*
  EmailOctopus subscription API route — /api/subscribe
  POST only. Accepts: { email, classification, duration? }

  Two cases:
  1. Initial sign-up — email + classification only.
     Creates a new contact in EmailOctopus.
  2. Duration update — email + classification + duration.
     Sent from the confirmation screen after sign-up.
     EmailOctopus doesn't update fields on a duplicate POST, so we use
     the member ID (MD5 hash of lowercase email) to PUT an update instead.

  This runs on the server — API keys never reach the browser.
*/

import { NextResponse } from "next/server";
import { createHash } from "crypto";

const EO_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const EO_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;
const EO_API_BASE = "https://emailoctopus.com/api/1.6";

export async function POST(request) {
  if (!EO_API_KEY || !EO_LIST_ID) {
    console.error("Missing EmailOctopus env vars");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, classification, duration } = body;

  if (!email || !classification) {
    return NextResponse.json(
      { error: "Email and classification are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  /*
    If duration is present, this is the confirmation screen follow-up.
    EmailOctopus identifies contacts by the MD5 hash of their lowercase email.
    We PUT to update the existing contact's TinnitusDuration field.
  */
  if (duration) {
    const memberId = createHash("md5").update(email.toLowerCase()).digest("hex");
    try {
      const res = await fetch(
        `${EO_API_BASE}/lists/${EO_LIST_ID}/contacts/${memberId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: EO_API_KEY,
            fields: { TinnitusDuration: duration },
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("EmailOctopus update error:", data);
      }
    } catch (err) {
      console.error("EmailOctopus update failed:", err);
    }
    // Always return success — duration is best-effort, don't block the UI
    return NextResponse.json({ success: true });
  }

  /*
    Initial sign-up — create the contact with Classification field.
  */
  const payload = {
    api_key: EO_API_KEY,
    email_address: email,
    fields: { Classification: classification.toUpperCase() },
    status: "SUBSCRIBED",
  };

  try {
    const res = await fetch(`${EO_API_BASE}/lists/${EO_LIST_ID}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorCode = data?.error?.code;
      // Already subscribed — treat as success, show confirmation screen
      if (errorCode === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
        return NextResponse.json({ success: true });
      }
      console.error("EmailOctopus error:", data);
      return NextResponse.json(
        { error: "Could not sign you up. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EmailOctopus fetch failed:", err);
    return NextResponse.json(
      { error: "Network error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
