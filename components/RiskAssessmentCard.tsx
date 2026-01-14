'use client';

import React from 'react';
import { PageScenario } from '@/lib/data/generator';
import { CheckCircle2, HelpCircle, XCircle, AlertOctagon } from 'lucide-react';

interface Props {
    scenario: PageScenario;
}

export default function RiskAssessmentCard({ scenario }: Props) {
    // Determine Visuals based on Approval Odds string in scenario
    const odds = scenario.content.approvalOdds; // "Excellent", "Good", "Case-by-Case", "Unlikely"

    const getIcon = () => {
        if (odds === 'Excellent' || odds === 'Good') return <CheckCircle2 className="w-10 h-10 text-emerald-500" />;
        if (odds === 'Fair' || odds === 'Possible') return <HelpCircle className="w-10 h-10 text-orange-400" />;
        return <AlertOctagon className="w-10 h-10 text-rose-400" />;
    };

    const getBgColor = () => {
        if (odds === 'Excellent' || odds === 'Good') return 'bg-emerald-50/50 border-emerald-100';
        if (odds === 'Fair' || odds === 'Possible') return 'bg-orange-50/50 border-orange-100';
        return 'bg-rose-50/50 border-rose-100';
    };

    return (
        <div className={`card-elevated rounded-3xl p-6 border ${getBgColor()} relative overflow-hidden transition-all`}>

            <div className="flex items-center gap-5 relative z-10">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    {getIcon()}
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Approval Odds</h3>
                    <div className="text-2xl font-black text-gray-800 tracking-tight leading-none">
                        {odds}
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-3 relative z-10">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <span>Probability</span>
                    <span>{odds === 'Case-by-Case' ? 'Manual Review' : 'Instant Bind'}</span>
                </div>
                <div className="w-full bg-white/60 h-3 rounded-full overflow-hidden border border-white/50">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${odds === 'Excellent' ? 'w-[95%] bg-emerald-400' :
                            odds === 'Good' ? 'w-[80%] bg-emerald-400' :
                                odds === 'Case-by-Case' ? 'w-[50%] bg-orange-400' : 'w-[25%] bg-rose-400'
                            }`}
                    ></div>
                </div>
            </div>

            {/* Background Blob */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-40 ${odds.includes('Excel') ? 'bg-emerald-200' : odds.includes('Case') ? 'bg-orange-200' : 'bg-rose-200'
                }`}></div>
        </div>
    );
}
