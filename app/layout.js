import { Inter } from "next/font/google";
import "./globals.css";

/*
  Inter is loaded via Next.js font optimisation — it gets self-hosted
  at build time so no requests are sent to Google by the browser.
  The variable name "--font-inter" is what globals.css references in @theme.
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          Forces the browser to treat this page as a light-mode page,
          regardless of the user's OS setting. Affects scrollbars,
          form controls, and other system-rendered UI.
        */}
        <meta name="color-scheme" content="light" />
      </head>
      <body className="bg-site text-body font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
