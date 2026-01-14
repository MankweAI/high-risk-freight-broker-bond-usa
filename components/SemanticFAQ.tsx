'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Script from 'next/script';

interface FAQItem {
    question: string;
    answer: string;
}

interface Props {
    faqs: FAQItem[];
}

export default function SemanticFAQ({ faqs }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Generate Schema.org JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (

        <section className="card-elevated rounded-3xl overflow-hidden glass">
            {/* Inject Schema into Head */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="bg-emerald-50/50 p-6 border-b border-emerald-50">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-500" />
                    Common Questions
                </h2>
            </div>

            <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-transparent group">
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-white/50 transition-colors"
                        >
                            <h3 className={`font-semibold text-sm pr-8 transition-colors ${openIndex === index ? 'text-emerald-700' : 'text-gray-700'}`}>
                                {faq.question}
                            </h3>
                            {openIndex === index ? (
                                <Minus className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            ) : (
                                <Plus className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 flex-shrink-0 mt-0.5" />
                            )}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
