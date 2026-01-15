export interface CreditTier {
  slug: string;
  label: string;
  minScore: number;
  maxScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  baseRateEstimate: [number, number]; // e.g. [1.0, 3.0] percent
  approvalOdds: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  description: string;
}

export interface LegalIssue {
  slug: string;
  label: string;
  riskLevel: 'MODERATE' | 'HIGH' | 'SEVERE';
  approvalStatus: 'Likely' | 'Possible' | 'Unlikely' | 'Case-by-Case';
  requiresPlan: boolean; // Needs a payment plan or extra documentation?
  description: string;
}

export interface StateEntity {
  name: string;
  slug: string; // 'texas'
  code: string; // 'TX'
  fmcsaFieldOffice?: string;
  isTopFreightState: boolean;
  brokerCount: number;
}

// --- 1. Credit Tiers (The "Score" Dimension) ---
export const CREDIT_TIERS: CreditTier[] = [
  {
    slug: 'excellent-credit',
    label: 'Excellent Credit (700+)',
    minScore: 700,
    maxScore: 850,
    riskLevel: 'LOW',
    baseRateEstimate: [1.0, 1.5], // 1% - 1.5%
    approvalOdds: 'Excellent',
    description: 'Preferred tier rates with instant approval and no collateral.'
  },
  {
    slug: 'good-credit',
    label: 'Good Credit (650-699)',
    minScore: 650,
    maxScore: 699,
    riskLevel: 'LOW',
    baseRateEstimate: [1.5, 3.0],
    approvalOdds: 'Excellent',
    description: 'Standard market rates with high approval chances.'
  },
  {
    slug: 'fair-credit',
    label: 'Fair Credit (600-649)',
    minScore: 600,
    maxScore: 649,
    riskLevel: 'MODERATE',
    baseRateEstimate: [3.0, 5.0],
    approvalOdds: 'Good',
    description: 'Mid-market rates. Review might be required for lower end.'
  },
  {
    slug: 'bad-credit',
    label: 'Bad Credit (500-599)',
    minScore: 500,
    maxScore: 599,
    riskLevel: 'HIGH',
    baseRateEstimate: [5.0, 10.0],
    approvalOdds: 'Fair',
    description: 'High risk program. Collateral may be discussed but often avoided with higher premiums.'
  },
  {
    slug: 'poor-credit',
    label: 'Poor Credit (<500)',
    minScore: 300,
    maxScore: 499,
    riskLevel: 'CRITICAL',
    baseRateEstimate: [10.0, 15.0],
    approvalOdds: 'Poor',
    description: 'Requires specialized high-risk surety programs. 100% collateral often waived in favor of higher premium.'
  }
];

// --- 2. Legal Issues (The "Problem" Dimension) ---
export const LEGAL_ISSUES: LegalIssue[] = [
  {
    slug: 'open-bankruptcy',
    label: 'Open Bankruptcy',
    riskLevel: 'SEVERE',
    approvalStatus: 'Case-by-Case',
    requiresPlan: true,
    description: 'Challenging but possible. Trustee approval required.'
  },
  {
    slug: 'discharged-bankruptcy',
    label: 'Discharged Bankruptcy',
    riskLevel: 'HIGH',
    approvalStatus: 'Likely',
    requiresPlan: false,
    description: 'Acceptable if discharged >12 months ago. Proof of discharge required.'
  },
  {
    slug: 'tax-lien',
    label: 'Unpaid Tax Liens',
    riskLevel: 'HIGH',
    approvalStatus: 'Possible',
    requiresPlan: true,
    description: 'Must show proof of specialized payment plan with IRS.'
  },
  {
    slug: 'civil-judgment',
    label: 'Civil Judgment',
    riskLevel: 'MODERATE',
    approvalStatus: 'Likely',
    requiresPlan: true,
    description: 'Satisfaction of judgment or payment plan proofs needed.'
  },
  {
    slug: 'felony-conviction',
    label: 'Felony Conviction',
    riskLevel: 'HIGH',
    approvalStatus: 'Case-by-Case',
    requiresPlan: false,
    description: 'Depends on nature of conviction. Financial crimes are hardest to bond.'
  }
];

// --- 3. States (The "Geo" Dimension) ---
export const STATES: StateEntity[] = [
  { name: 'Texas', slug: 'texas', code: 'TX', isTopFreightState: true, brokerCount: 2800 },
  { name: 'California', slug: 'california', code: 'CA', isTopFreightState: true, brokerCount: 3079 },
  { name: 'Florida', slug: 'florida', code: 'FL', isTopFreightState: true, brokerCount: 2709 },
  { name: 'Georgia', slug: 'georgia', code: 'GA', isTopFreightState: true, brokerCount: 1601 },
  { name: 'Illinois', slug: 'illinois', code: 'IL', isTopFreightState: true, brokerCount: 2047 },
  { name: 'Ohio', slug: 'ohio', code: 'OH', isTopFreightState: false, brokerCount: 1100 },
  { name: 'Pennsylvania', slug: 'pennsylvania', code: 'PA', isTopFreightState: true, brokerCount: 890 },
  { name: 'North Carolina', slug: 'north-carolina', code: 'NC', isTopFreightState: false, brokerCount: 680 },
  { name: 'Michigan', slug: 'michigan', code: 'MI', isTopFreightState: false, brokerCount: 791 },
  { name: 'Tennessee', slug: 'tennessee', code: 'TN', isTopFreightState: true, brokerCount: 750 },
  { name: 'New York', slug: 'new-york', code: 'NY', isTopFreightState: false, brokerCount: 950 },
];
