import React from "react";
import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

/**
 * Shared, restrained layout for the three legal pages (Privacy, Terms,
 * Cookies). Plain prose on the brand surface — no cards, no icons,
 * nothing that competes with the content.
 */
export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  updated,
  children,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700 hover:text-amber-800 transition"
      >
        ← Niramay
      </Link>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-5">
        {title}
      </h1>
      <p className="text-xs text-stone-500 mt-2">Last updated: {updated}</p>

      <div className="mt-8 space-y-6 text-sm sm:text-[15px] leading-relaxed text-stone-700 [&_h2]:font-serif [&_h2]:text-base [&_h2]:sm:text-lg [&_h2]:font-bold [&_h2]:text-ink [&_h2]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-amber-700 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-amber-800">
        {children}
      </div>

      <div className="mt-12 pt-6 border-t border-amber-300/50 text-xs text-stone-500">
        Questions about this page? Contact the project owner through the{" "}
        <a
          href="https://github.com/PDFly-source/niramay"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
        >
          repository
        </a>
        .
      </div>
    </div>
  );
};
