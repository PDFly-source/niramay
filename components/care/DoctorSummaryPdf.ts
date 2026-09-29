import { jsPDF } from "jspdf";
import { CareLogEntry } from "@/lib/store";

export function generateDoctorSummaryPdf(log: CareLogEntry) {
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const primaryColor = [180, 83, 9]; // amber-700
  const textColor = [30, 41, 59]; // slate-800
  const lightGray = [241, 245, 249];

  // Header banner
  doc.setFillColor(254, 243, 199); // amber-100
  doc.rect(0, 0, 210, 32, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(146, 64, 14); // amber-800
  doc.text("NIRAMAY (নিৰাময়) — Clinical Triage Summary", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Patient Home Care Log for Attending Physician | Generated: ${new Date().toLocaleDateString()}`,
    14,
    24
  );

  let y = 42;

  // Chief Complaint Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, y, 182, 24, 3, 3, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 24, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Chief Complaint & Ailment Description", 18, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.text(`Ailment: ${log.symptomEn}`, 18, y + 16);
  doc.text(`Duration Logged: ~${log.checkins.length} Day(s) (Started: ${log.startDate})`, 100, y + 16);

  y += 32;

  // Remedies Attempted Box
  doc.roundedRect(14, y, 182, 26, 3, 3, "F");
  doc.roundedRect(14, y, 182, 26, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Home Remedies & Interventions Attempted", 18, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.text(`Remedy: ${log.remedyNameEn}`, 18, y + 16);
  doc.text(`Assamese Traditional Name: ${log.remedyNameAs}`, 18, y + 21);

  y += 34;

  // Day-by-Day Progression Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("Day-by-Day Symptom Progression", 14, y);

  y += 6;

  // Table header
  doc.setFillColor(226, 232, 240);
  doc.rect(14, y, 182, 8, "F");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text("DAY", 18, y + 5.5);
  doc.text("DATE", 45, y + 5.5);
  doc.text("STATUS", 85, y + 5.5);
  doc.text("PATIENT NOTES", 130, y + 5.5);

  y += 8;

  doc.setFont("helvetica", "normal");
  log.checkins.forEach((checkin, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y, 182, 9, "F");
    }

    doc.setTextColor(15, 23, 42);
    doc.text(`Day ${checkin.day}`, 18, y + 6);
    doc.text(`${checkin.date}`, 45, y + 6);

    const statusUpper = checkin.status.toUpperCase();
    if (checkin.status === "worse") {
      doc.setTextColor(220, 38, 38); // Red
    } else if (checkin.status === "better") {
      doc.setTextColor(22, 163, 74); // Green
    } else {
      doc.setTextColor(217, 119, 6); // Amber
    }
    doc.text(`${statusUpper}`, 85, y + 6);

    doc.setTextColor(71, 85, 105);
    const note = checkin.note || "No additional note";
    doc.text(doc.splitTextToSize(note, 60)[0] || "", 130, y + 6);

    y += 9;
  });

  y += 8;

  // Clinical Alert Box
  const latestCheckin = log.checkins[log.checkins.length - 1];
  const isWorse = latestCheckin?.status === "worse" || log.hasRedFlagReported;

  if (isWorse) {
    doc.setFillColor(254, 242, 242); // red-50
    doc.roundedRect(14, y, 182, 26, 3, 3, "F");
    doc.setDrawColor(252, 165, 165); // red-300
    doc.roundedRect(14, y, 182, 26, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28); // red-700
    doc.text("⚠️ Clinical Warning: Home Care Stagnation / Deterioration", 18, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(127, 29, 29);
    doc.text(
      "The patient has reported persistent symptoms across multiple days with lack of improvement or worsening.",
      18,
      y + 15
    );
    doc.text(
      "Recommendation: Clinical evaluation, differential diagnosis, and appropriate pharmacological therapy.",
      18,
      y + 20
    );
  } else {
    doc.setFillColor(240, 253, 244); // green-50
    doc.roundedRect(14, y, 182, 22, 3, 3, "F");
    doc.setDrawColor(187, 247, 208); // green-200
    doc.roundedRect(14, y, 182, 22, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(21, 128, 61); // green-700
    doc.text("Status: Patient Recorded Moderate Improvement", 18, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(22, 101, 52);
    doc.text(
      "Home botanical care reported mild easing of symptoms. Monitor for any recurring acute episodes.",
      18,
      y + 15
    );
  }

  // Footer Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const disclaimer =
    "Niramay (নিৰাময়) is an educational traditional living-heritage reference tool. This home log is prepared voluntarily by the patient to assist clinical discussion and does not constitute a clinical diagnostic report.";
  doc.text(doc.splitTextToSize(disclaimer, 182), 14, 275);

  doc.save(`Niramay_Doctor_Care_Log_${log.startDate}.pdf`);
}
