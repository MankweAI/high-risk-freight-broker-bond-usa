'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock, Unlock } from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';

export default function TrustFundComparator() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex flex-col gap-4">
            {/* Option A: BMC-84 Bond */}
            <div className="card-elevated rounded-3xl p-6 relative overflow-hidden ring-4 ring-emerald-50 border border-emerald-100">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20">
                    SMART CHOICE
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500">
                        <Unlock className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-lg">BMC-84 Bond</h4>
                        <p className="text-xs text-emerald-500 font-bold uppercase tracking-wide">Pay Annually</p>
                    </div>
                </div>

                <div className="bg-surface-warm rounded-2xl p-4 mb-5 border border-emerald-100">
                    <div className="flex items-baseline gap-1 text-2xl font-black text-gray-700">
                        $938<span className="text-lg text-gray-300 font-normal">-</span>$3,750
                        <span className="text-xs font-normal text-gray-400 ml-1">/ year</span>
                    </div>
                    <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> Keeps $75k in your pocket
                    </p>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 mb-6 px-1">
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full mt-2 shrink-0"></div>
                        <span>Improves cash flow significantly</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full mt-2 shrink-0"></div>
                        <span>Builds business credit history</span>
                    </li>
                </ul>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full text-center py-3 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm hover:bg-emerald-100 transition-colors"
                >
                    Request Rate Access
                </button>
            </div>

            {/* Option B: BMC-85 Trust */}
            <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-6 opacity-75 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-600 text-lg">BMC-85 Trust</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Full Collateral</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100 text-gray-400">
                    <div className="flex items-baseline gap-1 text-2xl font-black text-gray-500 grayscale">
                        $75,000
                        <span className="text-xs font-normal text-gray-400 ml-1">/ upfront</span>
                    </div>
                    <p className="text-xs text-rose-400 font-bold mt-1 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> Capital is frozen
                    </p>
                </div>

                <button className="w-full text-center py-3 rounded-xl border border-gray-200 text-gray-400 font-bold text-sm hover:bg-gray-50 transition-colors">
                    Read Guide
                </button>
            </div>

            <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );

}
