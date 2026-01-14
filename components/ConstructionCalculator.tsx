'use client';

import React, { useState } from 'react';
import { StateData, RateCard } from '@/lib/types';
import { BadgeCheck, AlertTriangle, Calculator, DollarSign } from 'lucide-react';

interface Props {
    initialState?: string;
    states: StateData[];
    rateCards: RateCard[];
}

export default function ConstructionCalculator({ initialState = '', states, rateCards }: Props) {
    const [selectedState, setSelectedState] = useState<string>(initialState);
    const [contractValue, setContractValue] = useState<number>(100000);
    const [creditScore, setCreditScore] = useState<number>(700);
    const [result, setResult] = useState<{ premium: number; tier: string; breakdown: string } | null>(null);

    // Helpers moved inside to avoid importing server functions
    const calculate = (val: number, credit: number) => {
        // Default to class B standard for now
        const rateTier = rateCards.find(r => r.tier_name === 'standard_class_b') || rateCards[0];
        if (!rateTier) return null;

        let creditMult = rateTier.credit_multiplier_standard;
        let tierLabel = "Standard Rate";

        if (credit < 650) {
            creditMult = rateTier.credit_multiplier_bad;
            tierLabel = "High Risk Rate";
        } else if (credit > 720) {
            creditMult = rateTier.credit_multiplier_excellent;
            tierLabel = "Preferred Rate";
        }

        // Sliding Scale Logic
        let remaining = val;
        let rawPremium = 0;

        // First 100k
        const tier1 = Math.min(remaining, 100000);
        rawPremium += (tier1 / 1000) * rateTier.base_rate_first_100k;
        remaining -= tier1;

        // Next 400k
        if (remaining > 0) {
            const tier2 = Math.min(remaining, 400000);
            rawPremium += (tier2 / 1000) * rateTier.base_rate_next_400k;
            remaining -= tier2;
        }

        // Next 2M
        if (remaining > 0) {
            const tier3 = remaining;
            rawPremium += (tier3 / 1000) * rateTier.base_rate_next_2m;
        }

        const finalPremium = rawPremium * creditMult;

        return {
            premium: Math.round(finalPremium),
            tier: tierLabel,
            breakdown: `Base: $${Math.round(rawPremium)} x Credit Multiplier ${creditMult}`
        };
    };

    const handleCalculate = () => {
        if (!contractValue || !creditScore) return;
        const res = calculate(contractValue, creditScore);
        setResult(res);
    };

    const selectedStateData = states.find(s => s.state_code === selectedState);
    const isMillerThresholdMet = selectedStateData && contractValue >= selectedStateData.miller_threshold;

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-400" />
                        Bid Bond Estimator
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">2026 Construction Rates (Class B Standard)</p>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-slate-400 uppercase tracking-wider">Live Logic</span>
                    <span className="font-mono text-emerald-400 font-bold">UPDATED: JAN 10</span>
                </div>
            </div>

            <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contract Value */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Contract / Bid Value ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                type="number"
                                value={contractValue}
                                onChange={(e) => setContractValue(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                            />
                        </div>
                    </div>

                    {/* Credit Score */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Owner Credit Score</label>
                        <select
                            value={creditScore}
                            onChange={(e) => setCreditScore(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="750">Excellent (750+)</option>
                            <option value="700">Good (700-749)</option>
                            <option value="650">Fair (650-699)</option>
                            <option value="600">Poor (600-649)</option>
                            <option value="550">Distressed (&lt;600)</option>
                        </select>
                    </div>
                </div>

                {/* State Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Project Location (State)</label>
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                        <option value="">Select State</option>
                        {states.map((s) => (
                            <option key={s.state_code} value={s.state_code}>
                                {s.state_name}
                            </option>
                        ))}
                    </select>
                    {selectedStateData && (
                        <p className="text-xs text-slate-500 mt-1">
                            {selectedStateData.state_name} Bond Threshold:
                            <span className="font-mono font-bold ml-1">${selectedStateData.miller_threshold.toLocaleString()}</span>
                            {' '}(Little Miller Act)
                        </p>
                    )}
                </div>

                <button
                    onClick={handleCalculate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                >
                    Calculate Bond Cost
                </button>

                {/* Results Area */}
                {result && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className={`p-6 rounded-xl border-l-4 shadow-sm ${result.tier.includes('High Risk') ? 'bg-amber-50 border-amber-500' : 'bg-emerald-50 border-emerald-500'
                            }`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${result.tier.includes('High Risk') ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        {result.tier.includes('High Risk') ? <AlertTriangle className="w-3 h-3" /> : <BadgeCheck className="w-3 h-3" />}
                                        {result.tier}
                                    </span>
                                    <p className="mt-3 text-slate-600 text-sm">Estimated Annual Premium</p>
                                    <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                        ${result.premium.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    {isMillerThresholdMet ? (
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">BOND REQUIRED</span>
                                            <span className="text-xs text-slate-400 mt-1">Contract &gt; ${selectedStateData?.miller_threshold.toLocaleString()}</span>
                                        </div>
                                    ) : (
                                        selectedState && <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">OPTIONAL (Below Threshold)</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-200/60">
                                <p className="text-xs text-slate-500 font-mono">{result.breakdown}</p>
                                <div className="mt-4 flex gap-3">
                                    <a href="#" className="flex-1 bg-slate-900 text-white text-center py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                        Get Official Quote
                                    </a>
                                    <a href="#" className="flex-1 bg-white border border-slate-300 text-slate-700 text-center py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                        View Requirements
                                    </a>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-[10px] text-slate-400 text-center leading-relaxed">
                            *Disclaimer: Estimates based on sliding scale rates for Class B construction. Actual rates determined by underwriting.
                            Source: 2026 Surety Standard Rates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
