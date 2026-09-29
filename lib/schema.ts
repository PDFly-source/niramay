import { z } from "zod";

export const LocalizedTextSchema = z.union([
  z.string(),
  z.object({
    en: z.string(),
    as: z.string(),
  }),
]);

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

export const IngredientSchema = z.object({
  item: LocalizedTextSchema,
  item_assamese: z.string().optional(),
  qty: LocalizedTextSchema,
  qty_assamese: z.string().optional(),
});

export const DosageSchema = z.object({
  child: LocalizedTextSchema,
  child_assamese: z.string().optional(),
  adult: LocalizedTextSchema,
  adult_assamese: z.string().optional(),
  elderly: LocalizedTextSchema,
  elderly_assamese: z.string().optional(),
});

export const StepSchema = z.union([
  z.string(),
  z.object({
    en: z.string(),
    as: z.string(),
  }),
]);

export type StepItem = z.infer<typeof StepSchema>;

export const RemedySchema = z.object({
  id: z.string(),
  symptom: LocalizedTextSchema,
  symptom_assamese: z.string().optional(),
  symptomSlug: z.string().optional(),
  name: LocalizedTextSchema,
  name_assamese: z.string(),
  ingredients: z.array(IngredientSchema),
  prepTimeMinutes: z.number(),
  steps: z.array(StepSchema),
  dosage: DosageSchema,
  dos: z.array(LocalizedTextSchema),
  donts: z.array(LocalizedTextSchema),
  redFlags: z.array(LocalizedTextSchema),
  tip: LocalizedTextSchema.optional(),
  culturalContext: LocalizedTextSchema.optional(),
  primarySpice: z.string().optional(),
  difficulty: z.enum(["Easy", "Moderate"]).optional(),
  suitableTime: LocalizedTextSchema.optional(),
});

export type Remedy = z.infer<typeof RemedySchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Dosage = z.infer<typeof DosageSchema>;

export const SymptomCategorySchema = z.object({
  slug: z.string(),
  title: z.string(),
  assameseTitle: z.string(),
  description: z.string(),
  description_assamese: z.string().optional(),
  iconName: z.string(),
  commonSpices: z.array(z.string()),
  redFlagsSummary: z.string(),
  redFlagsSummary_assamese: z.string().optional(),
  categoryId: z.string().optional(),
});

export type SymptomCategory = z.infer<typeof SymptomCategorySchema>;

export interface SymptomCategoryGroup {
  id: string;
  label: string;
  label_assamese?: string;
  description?: string;
  description_assamese?: string;
  symptoms: {
    id: string;
    label: string;
    label_assamese?: string;
  }[];
}
