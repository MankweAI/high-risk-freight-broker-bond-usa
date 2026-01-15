'use client';

import React from 'react';

export default function CarrierBadges() {
    return (
        <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mb-3">
                Underwritten by Treasury Listed Carriers
            </p>
            <div className="flex justify-center items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                {/* Placeholder for Logos - using text badges for now to avoid broken images */}
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">
                    <span className="text-emerald-600">A++</span> AM Best
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">
                    <span className="text-blue-600">T-List</span> Treasury Approved
                </div>
            </div>
        </div>
    );
}
