import React, { useState } from 'react';
import { Shield, CheckCircle, Activity, AlertTriangle, Cpu, Search, X, Monitor, Wind, Zap } from 'lucide-react';
import { IP_RATING_DATA, DECODER_DICTIONARY } from '../data/constants';

// Helper to get icon based on category/id if needed
const getIcon = (item) => {
    if (item.category.includes('Air')) return <Wind className="w-6 h-6 text-blue-400" />;
    if (item.category.includes('Display')) return <Monitor className="w-6 h-6 text-purple-400" />;
    if (item.category.includes('Connectivity')) return <Activity className="w-6 h-6 text-green-400" />;
    return <Zap className="w-6 h-6 text-yellow-400" />;
};

const SpecDecoder = () => {
    const [query, setQuery] = useState('');
    const [activeResult, setActiveResult] = useState(null);

    const parseQuery = (input) => {
    if (!input) return null;
    const cleanInput = input.trim().toUpperCase();

    // 1. IP Rating
    const ipRegex = /^IP([0-6X])([0-9X])(K?)$/; 
    const ipMatch = cleanInput.match(ipRegex);

    if (ipMatch) {
        const solidChar = ipMatch[1];
        const liquidChar = ipMatch[2];
        const isK = ipMatch[3] === 'K';
        const solidData = IP_RATING_DATA.solids[solidChar];
        const liquidData = IP_RATING_DATA.liquids[liquidChar];
        
        const finalLiquidData = (liquidChar === '9' && isK) 
        ? IP_RATING_DATA.liquids['9'] 
        : (liquidData || { short: "Unknown", detail: "Rating not recognized" });

        return {
        type: 'IP_RATING',
        title: cleanInput,
        icon: <Shield className="w-8 h-8 text-blue-500" />,
        components: [
            { label: `Digit 1: "${solidChar}" (Solids)`, value: solidData.short, detail: solidData.detail, color: "text-amber-600 bg-amber-50" },
            { label: `Digit 2: "${liquidChar}${isK ? 'K' : ''}" (Liquids)`, value: finalLiquidData.short, detail: finalLiquidData.detail, color: "text-blue-600 bg-blue-50" }
        ],
        summary: `This device is ${solidData.short.toLowerCase()} and protected against ${finalLiquidData.short.toLowerCase()}.`,
        context: "IP ratings are self-certified. Higher numbers for water don't always mean better protection against everything (e.g. pressure vs immersion)."
        };
    }

    // 2. Dictionary Search
    const foundItem = DECODER_DICTIONARY.find(item => 
        item.keywords.some(k => cleanInput.includes(k.toUpperCase())) || 
        cleanInput.includes(item.id.toUpperCase())
    );

    if (foundItem) {
        return { type: 'DICTIONARY', ...foundItem, icon: getIcon(foundItem) };
    }
    return null;
    };

    const handleSearch = (val) => {
    setQuery(val);
    if (val.length > 1) setActiveResult(parseQuery(val));
    else setActiveResult(null);
    };

    return (
    <div id="decoder" className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 -z-10"></div>

        <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
                <Cpu size={14} /> Universal Decoder
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Tech Spec Translator</h2>
            <p className="text-[#86868B]">Enter code (e.g., <span className="font-mono bg-gray-100 px-1 rounded">IP67</span>, <span className="font-mono bg-gray-100 px-1 rounded">HEPA</span>) to see what it means.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
            type="text" 
            className="w-full pl-12 pr-12 py-4 bg-[#F5F5F7] border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl text-lg transition-all outline-none placeholder:text-gray-400 font-medium"
            placeholder="Type a spec..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            />
            {query && (
            <button onClick={() => {setQuery(''); setActiveResult(null);}} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
            </button>
            )}
        </div>

        {activeResult ? (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#F5F5F7] rounded-2xl p-6 md:p-8 border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
                    {activeResult.type === 'IP_RATING' ? 'Ingress Protection' : activeResult.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">{activeResult.title}</h3>
                    {activeResult.definition && (
                        <p className="text-gray-600 mt-2 border-l-2 border-blue-400 pl-3 italic">{activeResult.definition}</p>
                    )}
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm">{activeResult.icon}</div>
                </div>

                {activeResult.type === 'IP_RATING' && (
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                    {activeResult.components.map((comp, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border border-gray-200/50 ${comp.color}`}>
                            <div className="text-xs font-bold opacity-60 uppercase mb-1">{comp.label}</div>
                            <div className="text-xl font-bold mb-2">{comp.value}</div>
                            <p className="text-sm opacity-80 leading-snug">{comp.detail}</p>
                        </div>
                    ))}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm text-gray-600 flex gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p>{activeResult.summary}</p>
                    </div>
                </div>
                )}

                {activeResult.type === 'DICTIONARY' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeResult.specs.map((spec, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{spec.label}</div>
                        <div className="font-semibold text-[#1D1D1F] text-sm leading-tight">{spec.value}</div>
                        </div>
                    ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-[#1D1D1F] mb-2 flex items-center gap-2 text-sm"><Activity size={16}/> How it Works</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{activeResult.breakdown}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1D1D1F] mb-2 flex items-center gap-2 text-sm"><AlertTriangle size={16} className="text-amber-500"/> Misconceptions</h4>
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-gray-700 italic">"{activeResult.misconceptions}"</div>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </div>
        ) : (
            <div className="text-center py-6 opacity-40">
                {query ? <p className="text-sm">Searching...</p> : 
                <div className="flex justify-center gap-2">
                    {['IP68', 'HEPA', 'OLED'].map(tag => (
                        <span key={tag} onClick={() => handleSearch(tag)} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 cursor-pointer hover:bg-gray-200">{tag}</span>
                    ))}
                </div>
                }
            </div>
        )}
        </div>
    </div>
    );
};

export default SpecDecoder;