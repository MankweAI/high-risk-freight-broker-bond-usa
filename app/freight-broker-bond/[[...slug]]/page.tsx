
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateAllScenarios, getScenarioBySlug } from '@/lib/data/generator';
import FreightBondCalculator from '@/components/FreightBondCalculator';
import RiskAssessmentCard from '@/components/RiskAssessmentCard';
import TrustFundComparator from '@/components/TrustFundComparator';
import SemanticFAQ from '@/components/SemanticFAQ';
import ExpertBio from '@/components/ExpertBio';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedScenarios from '@/components/RelatedScenarios';
import ComplianceFooter from '@/components/ComplianceFooter';
import { CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

// --- Static Generation ---
export async function generateStaticParams() {
    const scenarios = generateAllScenarios();
    return scenarios.map((s) => ({
        slug: s.slug,
    }));
}

// --- Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
    const { slug } = await params;
    const scenarioSlug = slug || [];
    const scenario = getScenarioBySlug(scenarioSlug);

    if (!scenario) {
        return {
            title: 'Freight Broker Bond Cost Calculator | BMC-84 Quotes',
            description: 'Calculate your Freight Broker Bond cost instantly. Bad credit programs available.',
        };
    }

    return {
        title: scenario.meta.title,
        description: scenario.meta.description,
    };
}

// --- Page Component ---
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    const scenarioSlug = slug || [];
    // Handle root /freight-broker-bond if slug is empty (optional catch-all)
    // For now, if no slug, we might want to redirect or show a generic "Hub" version.
    // The generator currently assumes at least one slug segment for specific scenarios.
    // Let's assume if it returns undefined, we 404, unless it's the root.

    const scenario = getScenarioBySlug(scenarioSlug);

    if (!scenario) {
        if (scenarioSlug.length === 0) {
            // This matches /freight-broker-bond
            // We could render a "Hub" here, or just 404 for now if not defined in generator.
            // Let's mock a "Root Hub" scenario if undefined
            return <div className="p-10 text-center">Main Hub Implementation Pending</div>;
        }
        return notFound();
    }

    return (
        <main className="min-h-screen pb-32 hero-gradient">

            {/* Mobile Header */}
            <header className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <span className="font-bold text-gray-900 tracking-tight text-lg">FreightBond</span>
                </div>
                {/* Mobile Menu Icon Placeholder */}
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-emerald-300 rounded-full"></div>
                </div>
            </header>

            <div className="max-w-md mx-auto px-4 pt-6 space-y-8">

                {/* Breadcrumb - Minimal */}
                <div className="opacity-80 scale-95 origin-left">
                    <Breadcrumbs slug={scenarioSlug} />
                </div>

                {/* Hero / Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                        {scenario.meta.h1}
                    </h1>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed px-4">
                        {scenario.content.heroSubtitle}
                    </p>
                </div>

                {/* MAIN ACTION: Calculator Card */}
                <div className="card-elevated rounded-3xl overflow-hidden relative z-10">
                    <div className="bg-emerald-50/50 p-2 text-center text-xs font-bold text-emerald-600 uppercase tracking-wider border-b border-emerald-100">
                        Live Quote Estimator
                    </div>
                    <FreightBondCalculator initialScenario={scenario} />
                </div>

                {/* Quick Stats / Bullets */}
                <div className="flex flex-wrap justify-center gap-2">
                    {scenario.content.bulletPoints.map((point, i) => (
                        <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-100 text-xs font-medium text-emerald-800 shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            {point}
                        </div>
                    ))}
                </div>

                {/* Risk Assessment */}
                <RiskAssessmentCard scenario={scenario} />

                {/* How it Works */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 px-2">How It Works</h2>
                    <div className="card-elevated rounded-2xl p-6 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Instant Estimate</h3>
                                <p className="text-xs text-gray-500 mt-1">Free calc, no credit hit.</p>
                            </div>
                        </div>
                        <div className="w-px h-4 bg-emerald-100 ml-4 -my-2"></div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Secure Approval</h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {scenario.type === 'bankruptcy' ? 'Manual review for complex files.' : 'Instant automated binding.'}
                                </p>
                            </div>
                        </div>
                        <div className="w-px h-4 bg-emerald-100 ml-4 -my-2"></div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Same-Day Filing</h3>
                                <p className="text-xs text-gray-500 mt-1">Official BMC-84 sent to FMCSA.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compare */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 px-2 mb-4">You vs. Trust Fund</h2>
                    <TrustFundComparator />
                </div>

                {/* FAQs */}
                {scenario.content.faqs && scenario.content.faqs.length > 0 && (
                    <div className="pt-4">
                        <SemanticFAQ faqs={scenario.content.faqs} />
                    </div>
                )}

                {/* Trust / Bio */}
                <ExpertBio />

                {/* Interlinking */}
                <div className="pt-8 opacity-80">
                    {scenario.content.relatedScenarios && (
                        <RelatedScenarios links={scenario.content.relatedScenarios} />
                    )}
                </div>

            </div>

            <ComplianceFooter state={scenario.context.state} />
        </main>
    );
}
