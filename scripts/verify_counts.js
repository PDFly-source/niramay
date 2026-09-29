const fs = require('fs');
const { z } = require('zod');
const { SYMPTOM_GROUPS } = require('./data/symptom_groups');
const digestive = require('./data/remedies_digestive');
const respiratory = require('./data/remedies_respiratory');
const pain = require('./data/remedies_pain');
const skin = require('./data/remedies_skin');
const lifestyle = require('./data/remedies_lifestyle');

const allRemedies = [
  ...digestive,
  ...respiratory,
  ...pain,
  ...skin,
  ...lifestyle
];

console.log("Total remedies collected:", allRemedies.length);
console.log("Total symptom groups:", SYMPTOM_GROUPS.length);

let totalSymptoms = 0;
SYMPTOM_GROUPS.forEach(g => {
  totalSymptoms += g.symptoms.length;
});
console.log("Total symptoms across all groups:", totalSymptoms);

// Let's verify every symptom has remedies:
const missingSymptoms = [];
SYMPTOM_GROUPS.forEach(g => {
  g.symptoms.forEach(s => {
    const rems = allRemedies.filter(r => r.symptomSlug === s.id);
    if (rems.length < 2) {
      missingSymptoms.push({ id: s.id, count: rems.length });
    }
  });
});

console.log("Symptoms with < 2 remedies:", missingSymptoms);
