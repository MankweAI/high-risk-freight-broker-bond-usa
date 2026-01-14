import ConstructionCalculator from '@/components/ConstructionCalculator';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { getConstructionMarketData, getRateCardLogic } from '@/lib/data';

export default async function Home() {
  const states = await getConstructionMarketData();
  const rateCards = await getRateCardLogic();
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar Stub */}
      <nav className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <span className="text-xl font-black text-blue-900 tracking-tighter">BIDBOND<span className="text-blue-600">.US</span></span>
          <div className="space-x-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600">Calculators</a>
            <a href="#" className="hover:text-blue-600">State Requirements</a>
            <a href="#" className="hover:text-blue-600">For Contractors</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-900 pb-32 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Stop Overpaying for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-emerald-300">Construction Bid Bonds</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Instant estimates for Class B Performance & Payment Bonds.
            Check your state's <strong>Little Miller Act</strong> threshold instantly.
          </p>

          <div className="flex justify-center gap-8 mb-12 text-blue-200/80 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>A-Rated Sureties</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Sliding Scale Rates</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Bad Credit OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="relative -mt-24 px-4 pb-20">
        <ConstructionCalculator states={states} rateCards={rateCards} />
      </div>

      {/* Trust Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h3 className="text-slate-900 font-bold text-2xl mb-12">Trusted by Contractors in 50 States</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholders for logos */}
          <div className="h-12 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-12 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-12 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-12 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  );
}
