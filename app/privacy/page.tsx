import React from "react";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Privacy Policy — Niramay",
  description:
    "How Niramay handles data: no accounts, no cloud database, no analytics — everything stays in your browser.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="October 2026">
      <p>
        Niramay is built as a local-first application. This page explains, in
        plain terms, what that means for your data.
      </p>

      <h2>What Niramay does not do</h2>
      <ul>
        <li>No account or sign-up — there is nothing to register.</li>
        <li>No cloud database — Niramay does not send your activity to a server.</li>
        <li>No analytics or tracking scripts of any kind.</li>
        <li>No advertising and no data sale, because no data is collected to sell.</li>
      </ul>

      <h2>What is stored, and where</h2>
      <p>
        Saved remedies, your language and theme preferences, pantry items, and
        similar settings are stored only in your browser&apos;s{" "}
        <code>localStorage</code>. This data never leaves your device and is
        not visible to the project owner. Clearing your browser&apos;s site
        data for Niramay removes it permanently and cannot be recovered.
      </p>

      <h2>Voice input</h2>
      <p>
        If you choose to use voice input in the AI assistant, your browser
        requests microphone permission and uses its own built-in
        speech-recognition engine. Niramay does not run its own voice servers
        and does not record or store audio. You can decline microphone access
        and type instead; voice support also depends on your browser.
      </p>

      <h2>The AI assistant</h2>
      <p>
        The AI assistant runs entirely in your browser using a local intent
        engine. Your questions are not sent to any cloud AI service.
      </p>

      <h2>Offline use (PWA)</h2>
      <p>
        Installing Niramay as a Progressive Web App lets a service worker
        cache the app for offline use. This cache lives on your device and is
        used only to serve the app itself, not to collect data about you.
      </p>

      <h2>Third-party services</h2>
      <p>
        Niramay is deployed on GitHub Pages, which may log standard web
        server access information (such as IP address and request time) as
        part of normal hosting operation. This is outside Niramay&apos;s
        control; see{" "}
        <a href="https://docs.github.com/en/site-policy" target="_blank" rel="noopener noreferrer">
          GitHub&apos;s own privacy documentation
        </a>{" "}
        for details.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, the &quot;Last updated&quot; date above will
        change accordingly.
      </p>
    </LegalPageLayout>
  );
}
