export interface StateData {
    state_code: string;
    state_name: string;
    miller_threshold: number;
    statute_citation: string;
    bond_cost_min: number;
}

export interface RateCard {
    tier_name: string;
    base_rate_first_100k: number;
    base_rate_next_400k: number;
    base_rate_next_2m: number;
    credit_multiplier_bad: number;
    credit_multiplier_standard: number;
    credit_multiplier_excellent: number;
}
