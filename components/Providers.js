"use client";

/*
  Providers — client-side wrapper for all context providers.

  In Next.js App Router, layout.js is a Server Component. Importing a "use client"
  context provider directly into a Server Component can cause hydration mismatches
  on some devices. The fix is to isolate all client-side providers in their own
  "use client" file, and import that into layout.js instead.

  This is the standard Next.js pattern for wrapping the app in client providers.
*/

import { TestProvider } from "@/context/TestContext";

export default function Providers({ children }) {
  return <TestProvider>{children}</TestProvider>;
}
