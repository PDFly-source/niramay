import React from "react";
import { notFound } from "next/navigation";
import { REMEDIES } from "@/lib/data/remedies";
import { RemedyDetailClient } from "./RemedyDetailClient";

export function generateStaticParams() {
  return REMEDIES.map((r) => ({
    id: r.id,
  }));
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RemedyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const remedy = REMEDIES.find((r) => r.id === id);

  if (!remedy) {
    notFound();
  }

  // Related remedies for the same symptom
  const relatedRemedies = REMEDIES.filter(
    (r) => r.symptomSlug === remedy.symptomSlug && r.id !== remedy.id
  ).slice(0, 3);

  return (
    <RemedyDetailClient
      remedy={remedy}
      relatedRemedies={relatedRemedies}
    />
  );
}
