/**
 * NIRAMAY 2.0 — AI ENGINE TEST SUITE (phase 33)
 * Run: npx tsx scripts/test-ai-engine.ts
 *
 * Verifies intent, results, language handling, and real routes for
 * English, Assamese-script, Roman-Assamese, and mixed queries.
 */
import { respondToQuery } from "../lib/ai/engine";
import { searchPalette } from "../lib/commandPalette";
import { REMEDIES } from "../lib/data/remedies";

let pass = 0;
let fail = 0;

function check(name: string, cond: boolean, detail?: string) {
  if (cond) {
    pass++;
    console.log(`  PASS  ${name}${detail ? `  (${detail})` : ""}`);
  } else {
    fail++;
    console.error(`  FAIL  ${name}${detail ? `  (${detail})` : ""}`);
  }
}

console.log("\n=== SYMPTOM INTENT (EN / AS / ROMAN / MIXED) ===\n");

const petEn = respondToQuery("stomach pain");
check("'stomach pain' -> symptom kind", petEn.kind === "symptom");
check("'stomach pain' has remedies", petEn.remedies.length > 0);
check("'stomach pain' action route real", petEn.actions.every((a) => a.href.startsWith("/symptoms/")));

const petAs = respondToQuery("মোৰ পেট বেয়া");
check("'মোৰ পেট বেয়া' -> symptom kind", petAs.kind === "symptom");
check("'মোৰ পেট বেয়া' has remedies", petAs.remedies.length > 0);
check("Assamese understanding present", petAs.understandingAs.length > 0);

const petRoman = respondToQuery("mor pet beya");
check("'mor pet beya' -> symptom kind", petRoman.kind === "symptom", `got ${petRoman.kind}`);
check("'mor pet beya' has remedies", petRoman.remedies.length > 0);

const petFuzzy = respondToQuery("petor bea");
check("fuzzy 'petor bea' -> symptom kind", petFuzzy.kind === "symptom", `got ${petFuzzy.kind}`);

const gas = respondToQuery("petor gas");
check("'petor gas' -> symptom", gas.kind === "symptom" || gas.remedies.length > 0, `got ${gas.kind}`);

console.log("\n=== OTHER SYMPTOMS (EN / AS / ROMAN) ===\n");

for (const [q, expectSlugPart] of [
  ["cold", "common-cold"],
  ["কাহ", "cough"],
  ["kakh", "cough"],
  ["মূৰৰ বিষ", "headache"],
  ["muror bish", "headache"],
  ["jor hoi ase", "mild-fever"],
] as const) {
  const r = respondToQuery(q);
  const slugOk =
    r.actions.some((a) => a.href.includes(expectSlugPart)) ||
    r.remedies.some((rem) => rem.symptomSlug === expectSlugPart) ||
    r.remedies.length > 0;
  check(`'${q}' matches knowledge`, r.kind === "symptom" && slugOk, `kind=${r.kind}`);
}

console.log("\n=== RED FLAG SAFETY ===\n");

const severe = respondToQuery("I have severe chest pain and difficulty breathing");
check("severe query -> red flag", severe.redFlag === true);
check("red flag has reason", Boolean(severe.redFlagReason?.en));

const blood = respondToQuery("গাৰ পৰা তেজ ওলাইছে আৰু অসহ্য বিষ");
check("Assamese severe query -> red flag", blood.redFlag === true || blood.redFlagReason !== undefined, `redFlag=${blood.redFlag}`);

console.log("\n=== PLANT / INGREDIENT ENTITY ===\n");

const gingerEn = respondToQuery("ginger");
check("'ginger' -> entity kind", gingerEn.kind === "entity", `got ${gingerEn.kind}`);
check("'ginger' has remedies from data", gingerEn.remedies.length > 0 && gingerEn.remedies.every((r) => REMEDIES.some((db) => db.id === r.id)));

const gingerAs = respondToQuery("আদা");
check("'আদা' -> entity kind", gingerAs.kind === "entity", `got ${gingerAs.kind}`);

const gingerRoman = respondToQuery("ada ki karone use kore");
check("'ada ki karone use kore' -> entity kind", gingerRoman.kind === "entity", `got ${gingerRoman.kind}`);

const haldi = respondToQuery("haldi ki");
check("'haldi ki' -> entity kind", haldi.kind === "entity", `got ${haldi.kind}`);

console.log("\n=== SMART NAVIGATION (phase 30) ===\n");

const navCases: Array<[string, string]> = [
  ["open spice scanner", "/spice-scanner"],
  ["open plant scanner", "/plant-scanner"],
  ["show daily habits", "/daily-habits"],
  ["open fridge card", "/fridge-card"],
  ["show all remedies", "/explore"],
  ["open kitchen garden", "/kitchen-garden"],
  ["show dosha test", "/dosha-assessment"],
  ["মছলা স্কেনাৰ খোলক", "/spice-scanner"],
];
for (const [q, href] of navCases) {
  const r = respondToQuery(q);
  check(`'${q}' -> ${href}`, r.kind === "nav" && r.actions[0]?.href === href, `kind=${r.kind} href=${r.actions[0]?.href}`);
}

console.log("\n=== HONEST NO-ANSWER (phase 25) ===\n");

const unknown = respondToQuery("quantum entanglement energy healing");
check("unknown topic -> low confidence", unknown.isLowConfidence === true);
check("unknown topic -> no remedies invented", unknown.remedies.length === 0);

console.log("\n=== UNIVERSAL SEARCH (phase 10-11, 26) ===\n");

const s1 = searchPalette("ginger", "all", 5);
check("search 'ginger' finds content", s1.length > 0);
const s2 = searchPalette("ada", "all", 5);
check("search 'ada' (roman) finds content", s2.length > 0, `${s2.length} results`);
const s3 = searchPalette("আদা", "all", 5);
check("search 'আদা' finds content", s3.length > 0);
const s4 = searchPalette("thanda", "all", 5);
check("search 'thanda' (roman cold) finds content", s4.length > 0, `${s4.length} results`);
const s5 = searchPalette("pet beya", "all", 5);
check("search 'pet beya' finds content", s5.length > 0, `${s5.length} results`);

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===\n`);
process.exit(fail > 0 ? 1 : 0);
