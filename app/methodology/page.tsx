import React from 'react';
import { ArrowLeft, Table, FileText, Lock, Info } from 'lucide-react';
import ComplianceFooter from '@/components/ComplianceFooter';

export const metadata = {
    title: 'Bond Rate Methodology | Transparency Report',
    description: 'Understand how we calculate your freight broker bond premium. Fully transparent pricing logic based on credit score tiers.',
};

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            <main className="flex-grow max-w-4xl mx-auto px-6 py-12">

                <div className="mb-8">
                    <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wide">
                        <ArrowLeft className="w-4 h-4" /> Back to Calculator
                    </a>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                    Methodology & <span className="text-emerald-600">Fair Pricing</span>
                </h1>

                <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-xl text-slate-600 leading-relaxed mb-12">
                        We believe in complete transparency. Unlike other agencies that hide their pricing logic behind "black box" algorithms,
                        we publish our exact underwriting tiers. Our engine, <code>RiskResolver v3</code>, uses strictly defined credit brackets to estimate your premium.
                    </p>

                    <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-8">
                        <Table className="w-6 h-6 text-emerald-500" />
                        The Pricing Matrix
                    </h2>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4">Credit Score</th>
                                        <th className="px-6 py-4">Risk Tier</th>
                                        <th className="px-6 py-4">Est. Rate</th>
                                        <th className="px-6 py-4">Est. Annual Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900">750 - 850</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">Preferred</span></td>
                                        <td className="px-6 py-4">1.0% - 1.5%</td>
                                        <td className="px-6 py-4">$750 - $1,125</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900">700 - 749</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded bg-teal-100 text-teal-700 text-xs font-bold uppercase">Standard</span></td>
                                        <td className="px-6 py-4">1.5% - 3.0%</td>
                                        <td className="px-6 py-4">$1,125 - $2,250</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900">650 - 699</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase">Mid-Market</span></td>
                                        <td className="px-6 py-4">3.0% - 5.0%</td>
                                        <td className="px-6 py-4">$2,250 - $3,750</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900">600 - 649</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold uppercase">High Risk</span></td>
                                        <td className="px-6 py-4">5.0% - 10.0%</td>
                                        <td className="px-6 py-4">$3,750 - $7,500</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900">Under 600</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-bold uppercase">Specialized</span></td>
                                        <td className="px-6 py-4">10.0% - 15.0%</td>
                                        <td className="px-6 py-4">$7,500+</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
                            <p className="text-xs text-slate-400 font-mono">Source: risk_calculator_logic_v3.csv | Last Updated: Q1 2026</p>
                        </div>
                    </div>

                    <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
                        <FileText className="w-6 h-6 text-emerald-500" />
                        Data Integrity Statement
                    </h2>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-12">
                        <p className="mb-4">
                            Our platform connects directly with <strong>FMCSA-approved surety carriers</strong> (T-Listed). The rates shown above are estimates based on historical underwriting data.
                            Actual rates can vary based on:
                        </p>
                        <ul className="space-y-2 list-disc pl-5 marker:text-emerald-500">
                            <li>Accuracy of personal credit report (Soft Pull only).</li>
                            <li>Years in business (New ventures may see slightly higher base rates).</li>
                            <li>Financial standing (Bank balances for high-limit bonds).</li>
                        </ul>
                    </div>

                    <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
                        <Lock className="w-6 h-6 text-emerald-500" />
                        Privacy & Security
                    </h2>
                    <div className="flex gap-4 items-start p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-900 mb-12">
                        <Info className="w-6 h-6 shrink-0 mt-1 text-emerald-600" />
                        <div>
                            <h3 className="font-bold mb-2">No "Hard Inquiries" on Initial Quotes</h3>
                            <p className="text-sm opacity-90">
                                Our initial rate calculator is purely informational. We do not run a hard credit check until you explicitly permit a formal underwriting review.
                                Your data is encrypted using 256-bit SSL standards.
                            </p>
                        </div>
                    </div>

                </div>

            </main>
            <ComplianceFooter />
        </div>
    );
}
