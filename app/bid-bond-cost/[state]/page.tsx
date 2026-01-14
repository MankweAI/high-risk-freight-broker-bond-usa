import { getConstructionMarketData, getStateBySlug, getRateCardLogic } from '@/lib/data';
import ConstructionCalculator from '@/components/ConstructionCalculator';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Scale, AlertCircle } from 'lucide-react';

export async function generateStaticParams() {
    const states = await getConstructionMarketData();
    return states
        .filter(state => state && state.state_name)
        .map((state) => ({
            state: state.state_name.toLowerCase().replace(/\s+/g, '-'),
        }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
    const stateData = await getStateBySlug(params.state);
    if (!stateData) return {};

    return {
        title: `${stateData.state_name} Construction Bid Bond Cost | 2026 Rates`,
        description: `Instant Bid Bond estimates for ${stateData.state_name} contractors. Check Little Miller Act thresholds ($${stateData.miller_threshold.toLocaleString()}) and Class B sliding scale rates.`,
    };
}

export default async function StatePage({ params }: { params: { state: string } }) {
    const stateData = await getStateBySlug(params.state);
    const allStates = await getConstructionMarketData();
    const rateCards = await getRateCardLogic();

    if (!stateData) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Navbar Stub */}
            <nav className="bg-white border-b border-slate-200 py-4">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <span className="text-xl font-black text-blue-900 tracking-tighter">BIDBOND<span className="text-blue-600">.US</span></span>
                    <a href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">&larr; Back to Home</a>
                </div>
            </nav>

            <div className="bg-blue-900 text-white pb-32 pt-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm font-medium mb-6">
                        <MapPin className="w-4 h-4" />
                        <span>{stateData.state_name} Construction Market Data</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Construction Bid Bond Cost in {stateData.state_name}
                    </h1>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                        Calculate exact premiums for Class B Performance Bonds. Updated for 2026 sliding scale rates.
                    </p>
                </div>
            </div>

            <div className="relative -mt-24 px-4 pb-20">
                <ConstructionCalculator initialState={stateData.state_code} states={allStates} rateCards={rateCards} />
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-20">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Bonding Requirements in {stateData.state_name}</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-900">Little Miller Act Threshold</h3>
                            </div>
                            <p className="text-slate-600 mb-2">
                                In {stateData.state_name}, payment and performance bonds are mandatory for public works contracts exceeding:
                            </p>
                            <p className="text-3xl font-black text-slate-900">${stateData.miller_threshold.toLocaleString()}</p>
                            <p className="text-xs text-slate-400 mt-4 font-mono">Source: {stateData.statute_citation}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-amber-600" />
                                </div>
                                <h3 className="font-bold text-slate-900">2026 Compliance Note</h3>
                            </div>
                            <p className="text-slate-600">
                                Contractors bidding on state funded projects in {stateData.state_name} must provide a bid bond equal to 5-10% of the bid amount. Ensure your surety is listed on the U.S. Treasury Circular 570.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
