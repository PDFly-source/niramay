import React from "react";
import { notFound } from "next/navigation";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";
import { REMEDIES } from "@/lib/data/remedies";
import { RemedyResultsClient } from "./RemedyResultsClient";

export function generateStaticParams() {
  return SYMPTOM_CATEGORIES.map((c) => ({
    slug: c.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RemedyResultsPage({ params }: PageProps) {
  const { slug } = await params;
  const symptom = SYMPTOM_CATEGORIES.find((s) => s.slug === slug);

  if (!symptom) {
    notFound();
  }

  const categoryRemedies = REMEDIES.filter((r) => r.symptomSlug === slug);

  return (
    <RemedyResultsClient
      symptom={symptom}
      categoryRemedies={categoryRemedies}
    />
  );
}
