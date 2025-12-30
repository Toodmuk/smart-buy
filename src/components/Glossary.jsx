import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Droplet, Zap, Search as SearchIcon, Wind, ShieldCheck } from 'lucide-react';
import { TECH_TERMS } from '../data/constants';
import SpecDecoder from './SpecDecoder';
import AdUnit from './AdUnit';
import { RevealOnScroll } from './Animations';

// Map string IDs from data to actual Icon components
const iconMap = {
"Droplet": <Droplet className="w-5 h-5" />,
"Zap": <Zap className="w-5 h-5" />,
"Search": <SearchIcon className="w-5 h-5" />,
"Wind": <Wind className="w-5 h-5" />,
"ShieldCheck": <ShieldCheck className="w-5 h-5" />
};

const GlossaryCard = ({ item, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    useEffect(() => { if (defaultOpen) setIsOpen(true); }, [defaultOpen]);

    return (
        <div 
        className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer h-fit ${defaultOpen ? 'ring-2 ring-[#F5D04C] ring-offset-2' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        >
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gray-50 text-gray-700`}>
                {iconMap[item.iconId] || <Zap className="w-5 h-5" />}
            </div>
            <div>
                <h4 className="font-bold text-lg text-[#1D1D1F]">{item.term}</h4>
                <span className="text-xs font-medium text-[#86868B] uppercase tracking-wide">{item.category}</span>
            </div>
            </div>
            {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </div>
        
        <div className={`mt-4 text-[#86868B] text-sm overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="font-medium text-gray-600 mb-2">{item.simple}</p>
            <p className="mb-4 leading-relaxed whitespace-pre-line">{item.detail}</p>
            <div className="bg-[#F5F5F7] p-3 rounded-lg flex gap-3">
            <div className="min-w-[4px] bg-[#F5D04C] rounded-full"></div>
            <p className="text-xs italic text-gray-600">
                <span className="font-bold">Pro Tip:</span> {item.tips}
            </p>
            </div>
        </div>
        </div>
    );
    };

    const Glossary = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTerms = useMemo(() => {
        if (!searchTerm) return TECH_TERMS;
        const lowerTerm = searchTerm.toLowerCase();
        return TECH_TERMS.filter(item => 
        item.term.toLowerCase().includes(lowerTerm) || 
        item.category.toLowerCase().includes(lowerTerm) ||
        item.detail.toLowerCase().includes(lowerTerm)
        );
    }, [searchTerm]);

    return (
        <section id="glossary" className="pb-20 pt-10 bg-[#F5F5F7]">
        <RevealOnScroll>
            <SpecDecoder />
        </RevealOnScroll>
        <RevealOnScroll>
            <AdUnit />
        </RevealOnScroll>
        
        <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1D1D1F] mb-3">Speak the Language</h2>
            <p className="text-[#86868B] mb-8">Browse common terms or search the quick list below.</p>
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#F5D04C] to-[#98E2C6] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-white rounded-xl shadow-sm flex items-center p-2">
                <Search className="text-gray-400 w-5 h-5 ml-3" />
                <input 
                    type="text" 
                    placeholder="Filter list (e.g., Inverter, OLED)..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-transparent focus:outline-none text-[#1D1D1F] font-medium"
                />
                {searchTerm && <button onClick={() => setSearchTerm("")} className="p-2 text-gray-400 hover:text-gray-600"><span className="text-xs font-bold uppercase">Clear</span></button>}
                </div>
            </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 items-start">
            {filteredTerms.map(term => (
                <RevealOnScroll key={term.id}>
                <GlossaryCard item={term} />
                </RevealOnScroll>
            ))}
            </div>
            {filteredTerms.length === 0 && (
            <div className="text-center py-10">
                <h3 className="text-lg font-bold text-gray-600">No definitions found</h3>
                <p className="text-gray-400">Try using the Universal Decoder above.</p>
            </div>
            )}
        </div>
        </section>
    );
};

export default Glossary;