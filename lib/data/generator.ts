import { CREDIT_TIERS, LEGAL_ISSUES, STATES, CreditTier, LegalIssue, StateEntity } from './atoms';

export type ScenarioType = 'credit' | 'legal' | 'tax-lien' | 'bankruptcy' | 'state' | 'combined';

/* 
  The "PageScenario" is the props object that feeds our Dynamic Page.
  It contains everything needed to render the helpful content without further DB calls.
*/
export interface PageScenario {
    slug: string[];         // e.g. ['bad-credit'] or ['texas', 'bad-credit']
    type: ScenarioType;
    meta: {
        title: string;
        description: string;
        h1: string;
    };
    content: {
        heroSubtitle: string;
        estimatedRateRange: [number, number];   // [min, max]
        approvalOdds: string;                   // "High", "Low"
        bulletPoints: string[];                 // "No-Collateral available", "99% Approval"
        calculatorDefaults: {
            creditScore: number;
            bondAmount: number;
        };
        faqs: { question: string; answer: string }[];
        relatedScenarios: { title: string; slug: string[] }[];
    };
    context: {
        state?: StateEntity;
        credit?: CreditTier;
        legal?: LegalIssue;
    };
}

export function generateAllScenarios(): PageScenario[] {
    const scenarios: PageScenario[] = [];

    // Helper to get global related links (e.g. top states)
    const getTopStatesLinks = () => STATES.filter(s => s.isTopFreightState).slice(0, 4).map(s => ({
        title: `${s.name} Freight Bonds`,
        slug: [s.slug]
    }));

    // --- 1. Credit Tier Pages (e.g. /freight-broker-bond/bad-credit) ---
    CREDIT_TIERS.forEach(tier => {
        scenarios.push({
            slug: [tier.slug],
            type: 'credit',
            meta: {
                title: `Freight Broker Bond for ${tier.label} | Cost & Requirements`,
                description: `Get approved for a BMC-84 bond with ${tier.label}. Rates start at ${tier.baseRateEstimate[0]}%. Instant quotes available.`,
                h1: `Freight Broker Bonds for ${tier.label}`
            },
            content: {
                heroSubtitle: tier.description,
                estimatedRateRange: tier.baseRateEstimate,
                approvalOdds: tier.approvalOdds,
                bulletPoints: [
                    `Rates from ${tier.baseRateEstimate[0]}%`,
                    tier.minScore < 600 ? 'Bad Credit Programs' : 'Standard Rates',
                    'Instant Quote'
                ],
                calculatorDefaults: {
                    creditScore: Math.floor((tier.minScore + tier.maxScore) / 2),
                    bondAmount: 75000
                },
                faqs: [
                    {
                        question: `Can I get a freight broker bond with a ${tier.minScore} credit score?`,
                        answer: `Yes, we have specialized programs for applicants with credit scores in the ${tier.minScore}-${tier.maxScore} range. While standard markets may decline these applications, our high-risk partners can approve you, typically with a premium between ${tier.baseRateEstimate[0]}% and ${tier.baseRateEstimate[1]}%.`
                    },
                    {
                        question: "Do I need to pay the full bond amount upfront?",
                        answer: "No. You only pay an annual premium, which is a small percentage of the $75,000 bond amount. We also offer financing plans to split this premium into monthly payments."
                    },
                    {
                        question: "Is this the same as BMC-85 Trust Fund?",
                        answer: "No. A BMC-85 requires you to lock up $75,000 cash. This BMC-84 bond allows you to keep your capital and just pay the annual fee."
                    }
                ],
                relatedScenarios: [
                    ...(tier.minScore < 600 ? LEGAL_ISSUES.slice(0, 2).map(l => ({ title: `Bond with ${l.label}`, slug: [l.slug] })) : []),
                    ...getTopStatesLinks()
                ]
            },
            context: { credit: tier }
        });
    });

    // --- 2. Legal Issue Pages (e.g. /freight-broker-bond/open-bankruptcy) ---
    LEGAL_ISSUES.forEach(issue => {
        scenarios.push({
            slug: [issue.slug],
            type: 'legal',
            meta: {
                title: `Freight Broker Bond with ${issue.label} | Approval Guide`,
                description: `Can you get a freight broker bond with ${issue.label}? Yes, but requirements vary. Read our ${new Date().getFullYear()} underwriting guide.`,
                h1: `Getting a BMC-84 Bond with ${issue.label}`
            },
            content: {
                heroSubtitle: issue.description,
                estimatedRateRange: [5.0, 12.0], // Higher risk default
                approvalOdds: issue.approvalStatus,
                bulletPoints: [
                    `Approval: ${issue.approvalStatus}`,
                    'Specialized Carriers',
                    'Payment Plans'
                ],
                calculatorDefaults: {
                    creditScore: 600, // Assumption mainly
                    bondAmount: 75000
                },
                faqs: [
                    {
                        question: `Does having a ${issue.label} disqualify me from being a freight broker?`,
                        answer: `Not necessarily. While the FMCSA requires a $75k bond, private surety companies decide whether to bond you. For ${issue.label}, approval is ${issue.approvalStatus}. You may need to provide additional documentation${issue.requiresPlan ? ' such as proof of a repayment plan' : ''}.`
                    },
                    {
                        question: "Will my bond cost more?",
                        answer: "Likely yes. Because this is considered a higher risk category, underwriters usually require a higher premium (typically 5-12%) and may ask for collateral in severe cases."
                    },
                    {
                        question: "How quickly can I get approved?",
                        answer: "Standard applications are instant, but applications involving legal issues like ${issue.label} typically require a manual underwriter review, which takes 24-48 hours."
                    }
                ],
                relatedScenarios: [
                    { title: "Bad Credit Options", slug: ['bad-credit'] },
                    ...getTopStatesLinks()
                ]
            },
            context: { legal: issue }
        });
    });

    // --- 3. State Hub Pages (e.g. /freight-broker-bond/texas) ---
    STATES.forEach(state => {
        // Base State Page
        scenarios.push({
            slug: [state.slug],
            type: 'state',
            meta: {
                title: `${state.name} Freight Broker Bond Cost | BMC-84 Requirements`,
                description: `Freight Broker Bond requirements for ${state.name} residents. Low rates and instant approval valid for FMCSA.`,
                h1: `${state.name} Freight Broker Bonds`
            },
            content: {
                heroSubtitle: `Serve clients in ${state.name} and nationwide with a federally compliant BMC-84 bond.`,
                estimatedRateRange: [1.0, 10.0], // Wide range for generic state page
                approvalOdds: 'Varies',
                bulletPoints: [
                    `FMCSA Compliant in ${state.name}`,
                    'Instant Approvals',
                    '$75k Bond'
                ],
                calculatorDefaults: {
                    creditScore: 700,
                    bondAmount: 75000
                },
                faqs: [
                    {
                        question: `Do I need a specific ${state.name} freight license?`,
                        answer: `No, the Freight Broker Authority (MC Number) is a federal license issued by the FMCSA. However, as a business in ${state.name}, you must register your business entity (LLC/Corp) with the ${state.name} Secretary of State.`
                    },
                    {
                        question: `Is the $75,000 bond requirement different in ${state.name}?`,
                        answer: "No. The MAP-21 law set the $75,000 requirement federally. It applies to brokers in all 50 states, including " + state.name + "."
                    }
                ],
                relatedScenarios: [
                    { title: `Bad Credit Bonds in ${state.name}`, slug: [state.slug, 'bad-credit'] },
                    { title: `Open Bankruptcy in ${state.name}`, slug: [state.slug, 'open-bankruptcy'] } // Assuming we generate this
                ]
            },
            context: { state: state }
        });

        // --- 4. Cross-Combinations (State + Credit) ---
        // e.g. /freight-broker-bond/texas/bad-credit
        if (state.isTopFreightState) {
            CREDIT_TIERS.filter(c => c.riskLevel === 'HIGH' || c.riskLevel === 'CRITICAL').forEach(tier => {
                scenarios.push({
                    slug: [state.slug, tier.slug],
                    type: 'combined',
                    meta: {
                        title: `${state.name} Freight Broker Bond for ${tier.label}`,
                        description: `Bad credit freight broker bonds in ${state.name}. Get approved even with ${tier.label}.`,
                        h1: `${state.name} Freight Bonds: ${tier.label} Program`
                    },
                    content: {
                        heroSubtitle: `Specialized program for ${tier.label} in ${state.name}.`,
                        estimatedRateRange: tier.baseRateEstimate,
                        approvalOdds: tier.approvalOdds,
                        bulletPoints: [
                            `${state.name} High Risk Program`,
                            'No Collateral',
                            'Instant Quote'
                        ],
                        calculatorDefaults: {
                            creditScore: Math.floor((tier.minScore + tier.maxScore) / 2),
                            bondAmount: 75000
                        },
                        faqs: [
                            {
                                question: `Can I get bonded in ${state.name} with ${tier.label}?`,
                                answer: `Yes, we write high-risk bands in ${state.name} daily. Our program for ${tier.label} applicants typically offers rates between ${tier.baseRateEstimate[0]}% - ${tier.baseRateEstimate[1]}%.`
                            },
                            {
                                question: `Does ${state.name} require extra collateral?`,
                                answer: "State laws don't dictate collateral, the surety carrier does. We work with carriers that focus on premium-only plans, meaning you likely won't need to post cash collateral even with bad credit."
                            }
                        ],
                        relatedScenarios: [
                            { title: `Back to ${state.name} Overview`, slug: [state.slug] },
                            { title: `General ${tier.label} Info`, slug: [tier.slug] }
                        ]
                    },
                    context: { state, credit: tier }
                });
            });
        }


        // --- 5. Cross-Combinations (State + Legal) ---
        // e.g. /freight-broker-bond/texas/open-bankruptcy
        LEGAL_ISSUES.forEach(issue => {
            scenarios.push({
                slug: [state.slug, issue.slug],
                type: 'combined',
                meta: {
                    title: `${state.name} Freight Broker Bond with ${issue.label} | Approval Odds`,
                    description: `Can you get a freight broker bond in ${state.name} with ${issue.label}? Yes. See requirements and approval odds for ${state.name} residents.`,
                    h1: `${state.name} Bond: ${issue.label} Guide`
                },
                content: {
                    heroSubtitle: `Expert underwriting guide for ${issue.label} applicants in ${state.name}.`,
                    estimatedRateRange: [5.0, 15.0], // Higher range for legal issues
                    approvalOdds: issue.approvalStatus,
                    bulletPoints: [
                        `${state.name} ${issue.label} Program`,
                        `Approval: ${issue.approvalStatus}`,
                        'Same-Day Review'
                    ],
                    calculatorDefaults: {
                        creditScore: 600,
                        bondAmount: 75000
                    },
                    faqs: [
                        {
                            question: `Is ${issue.label} an automatic decline in ${state.name}?`,
                            answer: `No. While it makes approval harder, we have specific carriers in ${state.name} that can write bonds for applicants with ${issue.label}, usually requiring a slightly higher premium or financial review.`
                        },
                        {
                            question: `How much does a bond cost in ${state.name} with ${issue.label}?`,
                            answer: `Rates typically range from 5% to 15% depending on the severity and recency of the ${issue.label}. We can often secure terms without full collateral.`
                        }
                    ],
                    relatedScenarios: [
                        { title: `Back to ${state.name} Bond`, slug: [state.slug] },
                        { title: `More on ${issue.label}`, slug: [issue.slug] }
                    ]
                },
                context: { state, legal: issue }
            });
        });
    });

    return scenarios;
}

export function getScenarioBySlug(slugPath: string[]): PageScenario | undefined {
    // slugPath is derived from Next.js params.slug which is string[]
    // e.g. ['texas'] or ['bad-credit'] or ['texas', 'bad-credit']

    if (!slugPath || slugPath.length === 0) return undefined;

    const all = generateAllScenarios();

    return all.find(s => {
        if (s.slug.length !== slugPath.length) return false;
        return s.slug.every((val, index) => val === slugPath[index]);
    });
}
