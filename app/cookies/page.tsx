import React from "react";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Cookie Policy — Niramay",
  description: "Niramay uses no cookies. Here's what it uses instead.",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Cookie Policy" updated="October 2026">
      <h2>Niramay does not use cookies</h2>
      <p>
        Niramay sets no cookies — no session cookies, no tracking cookies, no
        advertising cookies, no third-party cookies. There are no analytics
        or marketing scripts in the app that would set them.
      </p>

      <h2>What Niramay uses instead</h2>
      <p>
        Two browser storage mechanisms, both local to your device and never
        transmitted anywhere:
      </p>
      <ul>
        <li>
          <strong>localStorage</strong> — stores your language and theme
          preference, saved remedies, pantry items, and similar settings, so
          they persist between visits.
        </li>
        <li>
          <strong>Service worker cache</strong> — used only if you install
          Niramay as a Progressive Web App, so the app can load and work
          offline.
        </li>
      </ul>
      <p>
        You can clear either at any time through your browser&apos;s site
        settings; doing so resets your preferences and removes saved
        remedies and the offline cache.
      </p>

      <h2>Third-party hosting</h2>
      <p>
        Niramay is hosted on GitHub Pages. GitHub&apos;s own hosting
        infrastructure is outside Niramay&apos;s control; see{" "}
        <a
          href="https://docs.github.com/en/site-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub&apos;s site policies
        </a>{" "}
        for details on how it operates its servers. See also the{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If Niramay ever starts using cookies, this page will be updated
        before that happens, with the &quot;Last updated&quot; date above
        changed accordingly.
      </p>
    </LegalPageLayout>
  );
}
