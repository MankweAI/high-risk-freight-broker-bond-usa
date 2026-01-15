'use client';

import React, { useState, useEffect } from 'react';
import { BadgeCheck, AlertTriangle, Calculator, DollarSign, ArrowRight } from 'lucide-react';
import { PageScenario } from '@/lib/data/generator';

interface Props {
    initialScenario?: PageScenario;
}

export default function FreightBondCalculator({ initialScenario }: Props) {
    // Defaults from Scenario or Fallback
    const defaultCredit = initialScenario?.content.calculatorDefaults.creditScore || 700;
    const defaultAmount = initialScenario?.content.calculatorDefaults.bondAmount || 75000;

    const [bondAmount, setBondAmount] = useState<number>(defaultAmount);
    const [creditScore, setCreditScore] = useState<number>(defaultCredit);
    const [result, setResult] = useState<{ minPremium: number; maxPremium: number; tier: string } | null>(null);

    // Auto-calculate on mount if scenario exists
    useEffect(() => {
        handleCalculate();
    }, [initialScenario]);

    const calculate = (amt: number, credit: number) => {
        // Logic mirroring CREDIT_TIERS in atoms.ts
        // In a real app, we might import CREDIT_TIERS here, or duplicate simple logic
        let rateMin = 0.01;
        let rateMax = 0.03;
        let tierLabel = "Standard Rate";

        if (credit >= 700) {
            rateMin = 0.01; rateMax = 0.015; tierLabel = "Preferred";
        } else if (credit >= 650) {
            rateMin = 0.015; rateMax = 0.03; tierLabel = "Standard";
        } else if (credit >= 600) {
            rateMin = 0.03; rateMax = 0.05; tierLabel = "Mid-Market";
        } else if (credit >= 500) {
            rateMin = 0.05; rateMax = 0.10; tierLabel = "High Risk";
        } else {
            rateMin = 0.10; rateMax = 0.15; tierLabel = "Specialized Program";
        }

        return {
            minPremium: Math.round(amt * rateMin),
            maxPremium: Math.round(amt * rateMax),
            tier: tierLabel
        };
    };

    const handleCalculate = () => {
        const res = calculate(bondAmount, creditScore);
        setResult(res);
    };

    return (
        <div className="w-full bg-white">
            <div className="p-6 space-y-8">
                {/* Bond Amount (Locked mostly for Freight Brokers, but editable) */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Bond Amount</label>
                    <div className="relative group">
                        <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="number"
                            value={bondAmount}
                            onChange={(e) => setBondAmount(Number(e.target.value))}
                            className="mobile-input pl-12 focus:ring-2 focus:ring-emerald-100 placeholder:text-gray-300"
                        />
                    </div>
                </div>

                {/* Credit Score Slider */}
                <div className="space-y-5">
                    <div className="flex justify-between items-end px-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Credit Score</label>
                        <span className={`text-2xl font-bold tracking-tight ${creditScore < 600 ? 'text-rose-500' : 'text-emerald-600'}`}>
                            {creditScore}
                        </span>
                    </div>

                    <div className="relative h-2 bg-emerald-50 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-300 rounded-full"
                            style={{ width: `${((creditScore - 450) / 400) * 100}%` }}
                        ></div>
                        <input
                            type="range"
                            min="450"
                            max="850"
                            step="10"
                            value={creditScore}
                            onChange={(e) => {
                                setCreditScore(Number(e.target.value));
                                const res = calculate(bondAmount, Number(e.target.value));
                                setResult(res);
                            }}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="flex justify-between text-[10px] text-gray-400 font-medium px-1 uppercase tracking-wider">
                        <span>Low risk</span>
                        <span>High risk</span>
                    </div>
                </div>

                {/* Results */}
                {result && (
                    <div className="bg-surface-warm rounded-2xl p-6 border border-emerald-100">
                        <div className="text-center">
                            <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-2">Estimated Annual Premium</p>
                            <div className="flex justify-center items-baseline gap-2 text-4xl font-black text-gray-800 tracking-tight">
                                ${result.minPremium.toLocaleString()}
                                <span className="text-xl text-gray-300 font-light">-</span>
                                <span className="text-2xl text-gray-500">${result.maxPremium.toLocaleString()}</span>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${result.tier.includes('High') || result.tier.includes('Special') ? 'bg-orange-50 text-orange-600' : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                    {result.tier.includes('High') || result.tier.includes('Special') ? <AlertTriangle className="w-3 h-3" /> : <BadgeCheck className="w-3 h-3" />}
                                    {result.tier} Rate
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button className="btn-primary w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2">
                    Get Firm Quote <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                    <a href="/methodology" className="text-[10px] text-gray-400 hover:text-emerald-500 underline decoration-dotted underline-offset-2 transition-colors">
                        View Calculation Logic
                    </a>
                </div>

                <CarrierBadges />
            </div>
        </div>
    );
}

import CarrierBadges from './CarrierBadges';
