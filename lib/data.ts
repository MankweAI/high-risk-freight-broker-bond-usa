import { parseCSV } from './csv-parser';
import { StateData, RateCard } from './types';
export type { StateData, RateCard };

// Singleton cache
let stateDataCache: StateData[] | null = null;
let rateCardCache: RateCard[] | null = null;

export async function getConstructionMarketData(): Promise<StateData[]> {
    if (stateDataCache) return stateDataCache;
    const raw = await parseCSV<StateData>('construction_market_data.csv');
    // Filter out empty rows or rows missing state_name
    stateDataCache = raw.filter(s => s && s.state_name && typeof s.state_name === 'string');
    return stateDataCache;
}

export async function getRateCardLogic(): Promise<RateCard[]> {
    if (rateCardCache) return rateCardCache;
    rateCardCache = await parseCSV<RateCard>('rate_card_logic.csv');
    return rateCardCache;
}

export async function getStateBySlug(slug: string): Promise<StateData | undefined> {
    if (!slug) return undefined;
    const states = await getConstructionMarketData();
    // Normalize: 'new-york' -> 'New York'
    const name = slug.replace(/-/g, ' ').toLowerCase();
    return states.find(s => s && s.state_name && s.state_name.toLowerCase() === name);
}

// NOTE: Client-Side Math Logic is now in ConstructionCalculator.tsx
// This file only exports Server-Side Data Loaders.
