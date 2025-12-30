import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AD_CONFIG } from '../data/constants';

const AdUnit = () => {
    if (!AD_CONFIG.enabled) return null;

    return (
        <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
            {AD_CONFIG.provider === 'google' ? 'Ad' : 'Sponsored'}
            </div>

            {AD_CONFIG.provider === 'custom' ? (
            <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden relative">
                    <img 
                    src={AD_CONFIG.custom.imageUrl} 
                    alt={AD_CONFIG.custom.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="p-6 flex flex-col justify-center flex-grow">
                <h4 className="text-lg font-bold text-[#1D1D1F] mb-1">{AD_CONFIG.custom.title}</h4>
                <p className="text-sm text-[#86868B] mb-4 leading-relaxed max-w-lg">{AD_CONFIG.custom.description}</p>
                <a href={AD_CONFIG.custom.link} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors w-fit">
                    {AD_CONFIG.custom.cta} <ExternalLink size={14} />
                </a>
                </div>
            </div>
            ) : (
            <div className="flex items-center justify-center p-8 bg-gray-50 text-gray-400 min-h-[150px]">
                <div className="text-center">
                <p className="text-xs font-mono mb-2">Google AdSense Slot</p>
                <p className="text-[10px] opacity-50">Client: {AD_CONFIG.google.client}</p>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default AdUnit;