'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { StateEntity } from '@/lib/data/atoms';

interface Props {
    state?: StateEntity;
}

export default function ComplianceFooter({ state }: Props) {
    const licensedText = state
        ? `Licensed in ${state.name} & 49 Other States`
        : "Licensed in All 50 States";

    return (
        <div className="w-full bg-slate-900 border-t border-slate-800 py-4 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-medium uppercase tracking-wider">

                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>{licensedText}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span>NPN: #879102</span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <span>Bonds underwritten by A-Rated Sureties</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
