import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronDown, ChevronUp, Droplet, Zap, Search as SearchIcon, 
  Wind, ShieldCheck, Clock, TrendingUp, CheckCircle 
} from 'lucide-react';
import { TECH_TERMS } from './data/constants';

// Import our new professional components
import SpecDecoder from './components/SpecDecoder';
import Calculator from './components/Calculator';
import AdUnit from './components/AdUnit';

// --- Small UI Components (kept here for simplicity, but can be split too) ---

const Navbar = () => (
  <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F5D04C] to-[#98E2C6]" />
        <span className="font-semibold text-lg tracking-tight text-[#1D1D1F]">SmartBuy <span className="text-gray-400 font-normal">by Tardkantalard</span></span>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-[#1D1D1F]">
        <a href="#calculator" className="hover:text-blue-500 transition-colors">Affordability</a>
        <a href="#decoder" className="hover:text-blue-500 transition-colors">Decoder</a>
        <a href="#glossary" className="hover:text-blue-500 transition-colors">Guide</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <header className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
    <div className="max-w-3xl mx-auto z-10 relative">
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
    </div>
  </header>
);

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
      <SpecDecoder />
      <AdUnit />
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
          {filteredTerms.map(term => <GlossaryCard key={term.id} item={term} />)}
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

const AdditionalFeatures = () => (
  <section id="guide" className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#1D1D1F]">Smart Buying Protocols</h2>
        <p className="text-[#86868B] mt-2">More than just money, it's about timing and mindset.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#F0F0F2] transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><Clock className="w-6 h-6 text-[#1D1D1F]" /></div>
          <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">The 48-Hour Rule</h3>
          <p className="text-sm text-[#86868B] leading-relaxed mb-4">Impulse buying is the enemy. Wait 48 hours. Most urges fade by hour 24.</p>
        </div>
        <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#F0F0F2] transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6 text-[#1D1D1F]" /></div>
          <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Cost Per Use (CPU)</h3>
          <p className="text-sm text-[#86868B] leading-relaxed mb-4">Price / Days Used = True Cost. $1000 Phone / 365 days = $2.7/day.</p>
        </div>
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#333] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#F5D04C] rounded-full blur-3xl opacity-20"></div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm"><Zap className="w-6 h-6 text-[#F5D04C]" /></div>
          <h3 className="text-xl font-bold mb-3">Tardkantalard Picks</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">Curated reviews and honest breakdowns.</p>
          <button className="text-xs font-bold uppercase tracking-widest text-[#F5D04C] hover:text-[#98E2C6] transition-colors">Visit Channel &rarr;</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1D1D1F] text-white py-20 border-t border-gray-800">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">SmartBuy</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">Empowering consumers with technical knowledge and financial wisdom.</p>
      <div className="flex justify-center space-x-6 mb-12">
        {/* TikTok Link */}
        <a 
          href="https://tiktok.com/@tardkantalard" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#F5D04C] hover:text-[#1D1D1F] transition-all cursor-pointer"
        >
          <span className="font-bold text-xs">TT</span>
        </a>

        {/* TikTok Link */}
        <a 
          href="https://www.facebook.com/profile.php?id=61582883504438" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#F5D04C] hover:text-[#1D1D1F] transition-all cursor-pointer"
        >
          <span className="font-bold text-xs">FB</span>
        </a>

        {/* YouTube Link */}
        <a 
          href="https://www.youtube.com/@TardKanTalard" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#98E2C6] hover:text-[#1D1D1F] transition-all cursor-pointer"
        >
          <span className="font-bold text-xs">YT</span>
        </a>

        {/* Instagram Link */}
        <a 
          href="https://www.instagram.com/tardkantalard_official/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#E6D5B8] hover:text-[#1D1D1F] transition-all cursor-pointer"
        >
          <span className="font-bold text-xs">IG</span>
        </a>
      </div>
      <div className="text-xs text-gray-600">
        <p>&copy; 2025 Tardkantalard Team. All rights reserved.</p>
        <p className="mt-2">contact for work: tardkantalard@gmail.com</p>
        <p className="mt-2">Disclaimer: Financial figures are estimates. Please consult a professional.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-[#F5D04C] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Calculator />
        <Glossary />
        <AdditionalFeatures />
      </main>
      <Footer />
    </div>
  );
}