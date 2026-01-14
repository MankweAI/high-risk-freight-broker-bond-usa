import { z } from 'zod';
import { PageScenario, generateAllScenarios } from './generator';

// --- Zod Schema Definitions ---

const MetaSchema = z.object({
    title: z.string().min(10).max(70, "Title tag should be under 70 chars for SEO"),
    description: z.string().min(50).max(180, "Description should be concise"),
    h1: z.string().min(5),
});

const ContentSchema = z.object({
    heroSubtitle: z.string().min(10),
    estimatedRateRange: z.tuple([z.number(), z.number()]).refine((val) => val[0] <= val[1], {
        message: "Min rate must be <= Max rate",
    }),
    approvalOdds: z.string(),
    bulletPoints: z.array(z.string()).min(1),
    calculatorDefaults: z.object({
        creditScore: z.number().min(300).max(850),
        bondAmount: z.number().min(10000),
    }),
    faqs: z.array(z.object({
        question: z.string().min(5),
        answer: z.string().min(10)
    })).optional(),
    relatedScenarios: z.array(z.object({
        title: z.string().min(5),
        slug: z.array(z.string()).min(1)
    })).optional()
});

export const PageScenarioSchema = z.object({
    slug: z.array(z.string()).min(1),
    type: z.enum(['credit', 'legal', 'tax-lien', 'bankruptcy', 'state', 'combined']),
    meta: MetaSchema,
    content: ContentSchema,
    // Context is optional runtime data, less strict validation needed usually, but good to check specifics if needed
    context: z.object({
        state: z.any().optional(),
        credit: z.any().optional(),
        legal: z.any().optional(),
    }).optional()
});

// --- Validation Helper ---

export function validateAllScenarios(): { valid: boolean; errors: string[] } {
    const scenarios = generateAllScenarios();
    const errors: string[] = [];

    scenarios.forEach((scenario) => {
        const result = PageScenarioSchema.safeParse(scenario);
        if (!result.success) {
            const slugStr = scenario.slug.join('/');
            result.error.issues.forEach((issue) => {
                errors.push(`[${slugStr}] ${issue.path.join('.')}: ${issue.message}`);
            });
        }
    });

    return {
        valid: errors.length === 0,
        errors,
    };
}
