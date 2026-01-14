
import React from 'react';
import { Terminal, Database } from 'lucide-react';

export default function ExpertBio() {
    return (
        <div className="card-elevated rounded-2xl p-6 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all">

            <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-emerald-100 shadow-sm">
                    <Terminal className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800 text-sm">Mankwe Mokgabudi</h4>
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Database className="w-3 h-3" /> ENG
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Algorithm Architect</p>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                        Calculations powered by the <strong>FreightBond Logic Engine</strong>, utilizing real-time FMCSA 49 CFR 387.307 datasets and 2026 actuarial tables.
                    </p>
                </div>
            </div>
        </div>
    );

}
