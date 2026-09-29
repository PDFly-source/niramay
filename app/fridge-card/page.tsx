import React from "react";
import { PrintableFridgeCard } from "@/components/remedy/PrintableFridgeCard";

export const metadata = {
  title: "Emergency Kitchen Fridge Card — Niramay",
  description: "Printable quick-reference emergency kitchen remedies card for the family refrigerator.",
};

export default function FridgeCardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <PrintableFridgeCard />
    </div>
  );
}
