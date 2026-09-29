// scripts/generate-dataset.js
const fs = require('fs');
const path = require('path');
const { z } = require('zod');

const DosageSchema = z.object({
  child: z.string(),
  adult: z.string(),
  elderly: z.string(),
});

const IngredientSchema = z.object({
  item: z.string(),
  qty: z.string(),
});

const RemedySchema = z.object({
  id: z.string(),
  symptom: z.string(),
  symptomSlug: z.string(),
  name: z.string(),
  name_assamese: z.string(),
  ingredients: z.array(IngredientSchema),
  prepTimeMinutes: z.number(),
  steps: z.array(z.string()),
  dosage: DosageSchema,
  dos: z.array(z.string()),
  donts: z.array(z.string()),
  redFlags: z.array(z.string()),
  culturalContext: z.string().optional(),
  primarySpice: z.string().optional(),
  difficulty: z.enum(["Easy", "Moderate"]).optional(),
  suitableTime: z.string().optional(),
});

console.log("Validator ready");
