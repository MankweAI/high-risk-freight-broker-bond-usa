'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface Props {
    slug: string[];
}

export default function Breadcrumbs({ slug }: Props) {
    // Construct hierarchy
    // Home > Freight Broker Bond > [Segment 1] > [Segment 2]

    const items = [
        { name: 'Home', path: '/' },
        { name: 'Freight Bonds', path: '/freight-broker-bond' },
    ];

    let currentPath = '/freight-broker-bond';
    slug.forEach(segment => {
        currentPath += `/${segment}`;
        // Capitalize simplisticly (replace hyphens)
        const label = segment.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        items.push({ name: label, path: currentPath });
    });

    // Schema.org JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://bidbond.us${item.path}` // Assuming domain
        }))
    };

    return (
        <nav className="flex items-center text-xs text-gray-400 mb-6 font-medium tracking-wide overflow-x-auto whitespace-nowrap no-scrollbar">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {items.map((item, index) => (
                <React.Fragment key={item.path}>
                    {index > 0 && <span className="mx-2 text-gray-300">/</span>}

                    <Link
                        href={item.path}
                        className={`hover:text-emerald-500 transition-colors ${index === items.length - 1 ? 'text-gray-600 pointer-events-none' : ''}`}
                    >
                        {index === 0 ? <Home className="w-3.5 h-3.5" /> : item.name}
                    </Link>
                </React.Fragment>
            ))}
        </nav>
    );
}
