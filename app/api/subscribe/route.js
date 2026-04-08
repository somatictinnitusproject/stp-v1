/*
  EmailOctopus subscription API route — /api/subscribe
  POST only. Accepts: { email, classification, duration? }

  This runs on the server — the EMAILOCTOPUS_API_KEY environment variable
  is never sent to the browser. Set it in your Vercel project settings and
  in a local .env.local file for development (never commit .env.local to git).

  EmailOctopus API docs: https://emailoctopus.com/api-documentation

  Custom fields stored against the subscriber:
    Classification — "A", "B", or "C"
    Tinnitus duration — e.g. "1–3 years" (optional, sent from confirmation screen)

  The list ID determines which automated email sequence fires.
  Different sequences for A/B/C can be configured in EmailOctopus directly.
*/

import { NextResponse } from "next/server";

// Read from environment — set in .env.local (dev) and Vercel dashboard (prod)
const EO_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const EO_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;
const EO_API_BASE = "https://emailoctopus.com/api/1.6";

export async function POST(request) {
  // Validate environment variables are set
  if (!EO_API_KEY || !EO_LIST_ID) {
    console.error("Missing EMAILOCTOPUS_API_KEY or EMAILOCTOPUS_LIST_ID env vars");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  // Parse and validate the request body
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

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  /*
    Build the EmailOctopus subscriber payload.
    Custom fields must match the field tags you set up in your
    EmailOctopus list settings. Create two fields:
      - "Classification" (text)
      - "Tinnitus duration" (text)
    The field tag becomes the key here (case-sensitive).
  */
  const fields = {
    Classification: classification.toUpperCase(),
  };

  if (duration) {
    fields["Tinnitus duration"] = duration;
  }

  const payload = {
    api_key: EO_API_KEY,
    email_address: email,
    fields,
    status: "SUBSCRIBED",
  };

  try {
    const eoResponse = await fetch(
      `${EO_API_BASE}/lists/${EO_LIST_ID}/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const eoData = await eoResponse.json();

    // EmailOctopus returns 200 for new subscribers and 200 with
    // error.code "MEMBER_EXISTS_WITH_EMAIL_ADDRESS" for duplicates.
    // We treat duplicates as success — the user is already on the list.
    if (!eoResponse.ok) {
      const errorCode = eoData?.error?.code;
      if (errorCode === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
        return NextResponse.json({ success: true });
      }
      console.error("EmailOctopus error:", eoData);
      return NextResponse.json(
        { error: "Could not add you to the list. Please try again." },
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

// Reject anything that isn't a POST
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
