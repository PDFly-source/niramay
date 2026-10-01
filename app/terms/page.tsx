import React from "react";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata = {
  title: "Terms of Service — Niramay",
  description: "Terms for using the Niramay web application.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" updated="October 2026">
      <h2>Educational use only</h2>
      <p>
        Niramay provides educational information about traditional
        Assamese and Indian household practices and general wellness
        knowledge. It is <strong>not a substitute for diagnosis, treatment,
        or professional medical advice</strong>. In an emergency, contact
        local emergency services immediately. Seek professional medical
        advice for severe, persistent, or worsening symptoms.
      </p>
      <p>
        Age-group dosage guidance shown in the app is general educational
        information, not personalized medical advice. Traditional practices
        described in the app are cultural knowledge, not clinically verified
        treatments.
      </p>

      <h2>Using the application</h2>
      <p>
        You may use the live Niramay web application for personal and
        educational purposes, including installing it as a Progressive Web
        App. You are responsible for how you use the information it
        provides, including any decisions about your own or your
        family&apos;s health.
      </p>

      <h2>No account, no warranty</h2>
      <p>
        Niramay requires no account and is provided &quot;as is&quot;,
        without warranty of any kind, express or implied, including
        accuracy, completeness, or fitness for a particular purpose. The
        project owner is not liable for outcomes resulting from use of the
        information in the app.
      </p>

      <h2>Source code</h2>
      <p>
        Using the deployed web application does not grant any rights to the
        underlying source code. Niramay&apos;s source code is proprietary;
        see{" "}
        <a
          href="https://github.com/PDFly-source/niramay/blob/main/LICENSE.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          LICENSE.md
        </a>{" "}
        in the project repository for the full terms.
      </p>

      <h2>Availability</h2>
      <p>
        Niramay is offered as a free web application. It may be updated,
        changed, or discontinued at any time without notice, though the
        project owner intends to keep it reasonably available.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        If these terms change, the &quot;Last updated&quot; date above will
        change accordingly.
      </p>
    </LegalPageLayout>
  );
}
