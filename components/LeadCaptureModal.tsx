'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose }: Props) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');

        // Mock submission
        setTimeout(() => {
            setStatus('success');
            // In a real app, this is where we'd send to backend
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors z-10"
                >
                    <X className="w-4 h-4" />
                </button>

                {status === 'success' ? (
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Access Requested!</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            We've added <span className="font-bold text-slate-700">{email}</span> to our priority queue. You'll receive your rate access link shortly.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors mt-4"
                        >
                            Return to Site
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Beta Program</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Request Rate Access</h3>
                            <p className="text-sm text-slate-500 mt-2 max-w-[280px] mx-auto">
                                We are currently accepting a limited number of new brokers into our beta program. Request access to view exclusive rates.
                            </p>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 mb-1 block">Work Email</label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@company.com"
                                            className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        <>
                                            Request Access <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                                    <Lock className="w-3 h-3" />
                                    <span>Your information is encrypted & secure.</span>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
