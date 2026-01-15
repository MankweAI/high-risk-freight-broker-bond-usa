'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { StateEntity } from '@/lib/data/atoms';

interface Props {
    state?: StateEntity;
}

export default function ComplianceFooter({ state }: Props) {
    return (
        <div className="w-full bg-slate-900 border-t border-slate-800 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

                {/* Main Disclaimer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-slate-500 font-medium tracking-wide leading-relaxed">
                    <div className="max-w-2xl">
                        <p className="mb-2">
                            <span className="text-slate-400 font-bold uppercase">FreightBond is an independent pricing research tool.</span> Rates are mathematical estimates based on market datasets and are not binding offers of insurance.
                        </p>
                        <p>
                            Bonding services are provided by third-party licensed partners. This platform does not directly issue surety bonds.
                        </p>
                    </div>

                    {/* Partner CTA */}
                    <div className="shrink-0">
                        <a href="mailto:partners@freightbond.com" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 hover:border-slate-600 group">
                            <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400" />
                            <span className="text-slate-300 group-hover:text-white">Licensed Broker? Partner with our Technology Suite</span>
                        </a>
                    </div>
                </div>

                {/* Secondary Info */}
                <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-wider">
                    <span>System Status: Online</span>
                    <span>Data Source: FMCSA & Treasury Dept Matches</span>
                </div>

            </div>
        </div>
    );
}
