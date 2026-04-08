/*
  Privacy Policy — /privacy
  Server Component — static content only.
  Covers data collection, EmailOctopus usage, and user rights.
  Written for a UK-based solo operator (GDPR/UK GDPR applicable).
*/

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — The Somatic Tinnitus Project",
};

function Section({ heading, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-[17px] font-bold text-body mb-3 tracking-[-0.01em]">
        {heading}
      </h2>
      <div className="text-[15px] text-muted leading-[1.75] space-y-3">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />

      <main className="max-w-[640px] mx-auto px-6 pt-16 pb-20">
        <h1 className="text-[28px] font-bold text-body tracking-[-0.02em] mb-2">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-muted mb-10">
          Last updated: April 2025
        </p>

        <Section heading="Who we are">
          <p>
            The Somatic Tinnitus Project is operated by Oliver (sole trader, UK).
            If you have any questions about this policy, contact us at{" "}
            <a
              href="mailto:hello@somatictinnitusproject.com"
              className="text-primary underline hover:text-primary-hover transition-colors duration-150"
            >
              hello@somatictinnitusproject.com
            </a>
            .
          </p>
        </Section>

        <Section heading="What data we collect">
          <p>
            We collect only the data you provide directly:
          </p>
          <ul className="list-none pl-0 space-y-1.5">
            {[
              "Your email address, when you join the waitlist",
              "Your test result classification (A, B, or C)",
              "Your tinnitus duration, if you choose to share it (optional)",
            ].map((item) => (
              <li key={item} className="relative pl-5">
                <span className="absolute left-0 text-primary font-semibold">·</span>
                {item}
              </li>
            ))}
          </ul>
          <p>
            We do not collect your name, your location, or any health information
            beyond the above. The test responses you give are used only to
            calculate your result locally in your browser — they are not sent to
            our servers.
          </p>
        </Section>

        <Section heading="How we use your data">
          <p>
            Your email address is used to send you communications about the
            Somatic Tinnitus Project — including launch updates and platform
            news. Your classification is used to send you relevant content
            related to your result.
          </p>
          <p>
            We will never sell your data, share it with third parties for
            marketing purposes, or use it for any purpose other than
            communicating with you about the Somatic Tinnitus Project.
          </p>
        </Section>

        <Section heading="Third-party services">
          <p>
            We use{" "}
            <a
              href="https://emailoctopus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary-hover transition-colors duration-150"
            >
              EmailOctopus
            </a>{" "}
            to manage our mailing list and send emails. Your email address and
            classification are stored on EmailOctopus servers. Their privacy
            policy applies to this data:{" "}
            <a
              href="https://emailoctopus.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary-hover transition-colors duration-150"
            >
              emailoctopus.com/legal/privacy
            </a>
            .
          </p>
          <p>
            The site is hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary-hover transition-colors duration-150"
            >
              Vercel
            </a>
            . Vercel may collect standard server logs (IP addresses, request
            timestamps) as part of hosting. We do not access or use these logs
            for analytics.
          </p>
        </Section>

        <Section heading="Cookies">
          <p>
            This site does not use cookies for tracking or analytics. No
            third-party analytics tools (e.g. Google Analytics) are installed.
          </p>
        </Section>

        <Section heading="Your rights">
          <p>
            Under UK GDPR and the Data Protection Act 2018, you have the right
            to access, correct, or delete the personal data we hold about you.
            To exercise any of these rights, email us at{" "}
            <a
              href="mailto:hello@somatictinnitusproject.com"
              className="text-primary underline hover:text-primary-hover transition-colors duration-150"
            >
              hello@somatictinnitusproject.com
            </a>
            .
          </p>
          <p>
            You can unsubscribe from our emails at any time using the
            unsubscribe link in any email we send you.
          </p>
        </Section>

        <Section heading="Changes to this policy">
          <p>
            If we make material changes to this policy, we will notify
            subscribers by email. The date at the top of this page will always
            reflect when the policy was last updated.
          </p>
        </Section>
      </main>

      <Footer />
    </>
  );
}
