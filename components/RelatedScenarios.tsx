
import React from 'react';
import Link from 'next/link'; // Standard Next.js Link
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
    title: string;
    slug: string[];
}

interface Props {
    links: RelatedLink[];
}

export default function RelatedScenarios({ links }: Props) {
    if (!links || links.length === 0) return null;

    return (
        <section className="border-t border-emerald-100 pt-10 mt-10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Explore Related Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link, i) => (
                    <Link
                        key={i}
                        href={`/freight-broker-bond/${link.slug.join('/')}`}
                        className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all"
                    >
                        <span className="text-gray-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">{link.title}</span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
        </section>
    );
}
