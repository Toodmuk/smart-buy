import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, TrendingUp, Zap } from 'lucide-react';
import { RevealOnScroll } from './Animations';

export const Hero = () => {
const { scrollY } = useScroll();
const y1 = useTransform(scrollY, [0, 300], [0, 100]); 
const opacity = useTransform(scrollY, [0, 300], [1, 0]); 
const scale = useTransform(scrollY, [0, 300], [1, 0.9]); 

return (
    <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
    <motion.div 
        style={{ y: y1, opacity, scale }}
        className="max-w-3xl mx-auto z-10 relative"
    >
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Educational Project
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-6 leading-tight">
        Buy better.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900">
            Not just more.
        </span>
        </h1>
        <p className="text-xl text-[#86868B] max-w-xl mx-auto mb-10 leading-relaxed">
        Understand the tech. Calculate the cost. <br/>
        Make decisions your future self will thank you for.
        </p>
        <a href="#calculator" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1D1D1F] text-white font-medium hover:bg-black transition-transform transform hover:scale-105">
        Check Affordability
        </a>
    </motion.div>
    </header>
);
};

export const AdditionalFeatures = () => (
<section id="guide" className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#1D1D1F]">Smart Buying Protocols</h2>
        <p className="text-[#86868B] mt-2">More than just money, it's about timing and mindset.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
        <RevealOnScroll>
        <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#F0F0F2] transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><Clock className="w-6 h-6 text-[#1D1D1F]" /></div>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">The 48-Hour Rule</h3>
            <p className="text-sm text-[#86868B] leading-relaxed mb-4">Impulse buying is the enemy. Wait 48 hours. Most urges fade by hour 24.</p>
        </div>
        </RevealOnScroll>
        <RevealOnScroll>
        <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#F0F0F2] transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6 text-[#1D1D1F]" /></div>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Cost Per Use (CPU)</h3>
            <p className="text-sm text-[#86868B] leading-relaxed mb-4">Price / Days Used = True Cost. $1000 Phone / 365 days = $2.7/day.</p>
        </div>
        </RevealOnScroll>
        <RevealOnScroll>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#333] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#F5D04C] rounded-full blur-3xl opacity-20"></div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm"><Zap className="w-6 h-6 text-[#F5D04C]" /></div>
            <h3 className="text-xl font-bold mb-3">Tardkantalard Picks</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">Curated reviews and honest breakdowns.</p>
            <button className="text-xs font-bold uppercase tracking-widest text-[#F5D04C] hover:text-[#98E2C6] transition-colors">Visit Channel &rarr;</button>
        </div>
        </RevealOnScroll>
    </div>
    </div>
</section>
);