import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

/*
  Inter is loaded via Next.js font optimisation — self-hosted at build time,
  no Google requests in the browser. The "--font-inter" variable is referenced
  in globals.css @theme so Tailwind's font-sans utility resolves to Inter.
*/
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "The Somatic Tinnitus Project",
  description:
    "Find out if your tinnitus has a somatic component — a free 5-minute movement test that classifies your result and points you toward the right approach.",
};

/*
  Server Components can render Client Components — the "use client" boundary
  lives inside TestContext.js. Wrapping all children in TestProvider here means
  test state is available on every page without prop-drilling, and persists
  across client-side navigations within the test flow.
*/
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          Forces light mode at the browser level regardless of OS setting.
          Affects scrollbars, form controls, and other system-rendered UI.
        */}
        <meta name="color-scheme" content="light" />
      </head>
      <body className="bg-site text-body font-sans min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
