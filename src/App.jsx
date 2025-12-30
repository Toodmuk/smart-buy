import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronDown, ChevronUp, Droplet, Zap, Search as SearchIcon, 
  Wind, ShieldCheck, Clock, TrendingUp, CheckCircle, Shield, Monitor, 
  Activity, AlertTriangle, Cpu, X, Info, XCircle, ExternalLink 
} from 'lucide-react';

// ==========================================
// SECTION 1: DATA & CONSTANTS
// ==========================================

const COLORS = {
  bg: 'bg-[#F5F5F7]',
  card: 'bg-white',
  textMain: 'text-[#1D1D1F]',
  textSec: 'text-[#86868B]',
  charcoal: '#333333',
  yellow: '#F5D04C',
  mint: '#98E2C6',
  sand: '#E6D5B8',
  sky: '#B4D4E6',
  danger: '#FF3B30',
  success: '#34C759',
};

const AD_CONFIG = {
  enabled: true,
  provider: 'custom', 
  google: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX', 
    slot: '1234567890', 
  },
  custom: {
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    title: 'Minimalist Tech Organizer',
    description: 'Keep your cables tangle-free. The perfect companion for your new gadgets.',
    link: '#', 
    cta: 'Shop Now'
  }
};

const IP_RATING_DATA = {
  solids: {
    '0': { short: "Not protected", detail: "No protection against contact and ingress of objects." },
    '1': { short: ">50mm Objects", detail: "Protected against solid objects larger than 50mm." },
    '2': { short: ">12.5mm Objects", detail: "Protected against solid objects larger than 12.5mm." },
    '3': { short: ">2.5mm Objects", detail: "Protected against solid objects larger than 2.5mm." },
    '4': { short: ">1mm Objects", detail: "Protected against solid objects larger than 1mm." },
    '5': { short: "Dust Protected", detail: "Ingress of dust is not entirely prevented." },
    '6': { short: "Dust Tight", detail: "No ingress of dust; complete protection." },
    'x': { short: "Not Tested", detail: "No data available." },
    'X': { short: "Not Tested", detail: "No data available." }
  },
  liquids: {
    '0': { short: "Not protected", detail: "No liquid protection." },
    '1': { short: "Dripping Water", detail: "Protected against vertically falling water drops." },
    '2': { short: "Tilted Dripping", detail: "Protected against falling drops when tilted up to 15°." },
    '3': { short: "Spraying Water", detail: "Protected against spray up to 60° from vertical." },
    '4': { short: "Splashing Water", detail: "Protected against splashing water from any direction." },
    '5': { short: "Water Jets", detail: "Protected against water jets (6.3mm)." },
    '6': { short: "Powerful Jets", detail: "Protected against powerful water jets (12.5mm)." },
    '7': { short: "Immersion (1m)", detail: "Protected against temporary immersion (1m, 30 mins)." },
    '8': { short: "Deep Immersion", detail: "Protected against continuous immersion (>1m)." },
    '9': { short: "High Temp/Pressure", detail: "Protected against high pressure/temp wash-down." },
    'x': { short: "Not Tested", detail: "No data available." },
    'X': { short: "Not Tested", detail: "No data available." }
  }
};

const DECODER_DICTIONARY = [
  {
    id: 'hepa',
    keywords: ['hepa', 'filter', 'h13', 'h14', 'air'],
    title: 'HEPA (High Efficiency Particulate Air)',
    category: 'Air Filtration',
    definition: "A standard for efficiency of air filtration defined by the US DOE and EU standard EN 1822.",
    specs: [
      { label: "Efficiency (H13)", value: "99.97% of particles @ 0.3 microns" },
      { label: "Efficiency (H14)", value: "99.995% of particles @ 0.3 microns" },
      { label: "Mechanism", value: "Diffusion, Interception, Impaction" }
    ],
    breakdown: "HEPA filters use a mat of fibers. 0.3 microns is the 'Most Penetrating Particle Size' (MPPS) and is the hardest to trap.",
    commonUses: "Hospital operating rooms, clean rooms, high-end consumer air purifiers.",
    misconceptions: "People think HEPA acts like a sieve. In reality, it uses electrostatic attraction and physical physics."
  },
  {
    id: 'refresh-rate',
    keywords: ['refresh', 'rate', 'hz', '120hz', '144hz', '240hz', '60hz'],
    title: 'Refresh Rate (Hertz/Hz)',
    category: 'Display Technology',
    definition: "The number of times per second that a display hardware updates its buffer.",
    specs: [
      { label: "Standard Cinema", value: "24 Hz" },
      { label: "Standard Monitor", value: "60 Hz (16.6ms)" },
      { label: "Gaming Standard", value: "144 Hz (6.9ms)" },
      { label: "Esports Pro", value: "240 Hz - 540 Hz" }
    ],
    breakdown: "Higher refresh rates reduce motion blur. The jump from 60Hz to 120Hz is drastic; 240Hz+ is subtle.",
    commonUses: "Gaming monitors, Smartphones (ProMotion), TVs.",
    misconceptions: "Refresh Rate is not Frame Rate (FPS). You need both to be high for the benefit."
  },
  {
    id: 'oled',
    keywords: ['oled', 'amoled', 'screen', 'display'],
    title: 'OLED (Organic Light-Emitting Diode)',
    category: 'Display Technology',
    definition: "Display tech where every pixel produces its own light (emissive).",
    specs: [
      { label: "Contrast Ratio", value: "Infinite (True Black)" },
      { label: "Response Time", value: "< 1ms (Instant)" },
      { label: "Burn-in Risk", value: "Moderate" }
    ],
    breakdown: "Pixels turn off for black, creating infinite contrast. Organic compounds can degrade (burn-in).",
    commonUses: "High-end smartphones, Premium TVs.",
    misconceptions: "QLED is not OLED. QLED is LCD with quantum dots. Only OLED is self-emissive."
  },
  {
    id: 'usb-c',
    keywords: ['usb', 'type-c', 'thunderbolt', 'pd'],
    title: 'USB-C & Power Delivery',
    category: 'Connectivity',
    definition: "A 24-pin rotationally symmetrical connector system.",
    specs: [
      { label: "Max Power (PD 3.1)", value: "240W (48V @ 5A)" },
      { label: "Max Speed (USB4)", value: "40 Gbps or 80 Gbps" },
      { label: "Video", value: "DisplayPort Alt Mode supported" }
    ],
    breakdown: "USB-C is just the SHAPE. It can be slow (USB 2.0) or fast (Thunderbolt). Check the specs.",
    commonUses: "Laptops, Phones, Monitors.",
    misconceptions: "Thinking all USB-C cables are equal. Many are charging-only (slow data)."
  },
  {
    id: 'hdmi',
    keywords: ['hdmi', '2.1', '2.0', 'arc', 'earc'],
    title: 'HDMI Versions (1.4 - 2.1a)',
    category: 'Connectivity',
    definition: "Proprietary audio/video interface for uncompressed video data.",
    specs: [
      { label: "HDMI 1.4", value: "10.2 Gbps (4K@30Hz)" },
      { label: "HDMI 2.0", value: "18 Gbps (4K@60Hz)" },
      { label: "HDMI 2.1", value: "48 Gbps (4K@120Hz)" }
    ],
    breakdown: "HDMI 2.1 is needed for 4K 120Hz gaming (PS5/Xbox) and eARC audio.",
    commonUses: "TVs, Consoles, Soundbars.",
    misconceptions: "Gold connectors improve picture quality. They don't; they just resist corrosion."
  }
];

const TECH_TERMS = [
  {
    id: 1,
    term: "IP Rating (Ingress Protection)",
    category: "Durability",
    iconId: "Droplet", 
    simple: "How waterproof and dustproof a device is.",
    detail: "IPXX: First digit (dust), Second digit (water). IP68 > IP67 > IPX4.",
    tips: "Warranty rarely covers water damage. Rinse salt water off immediately."
  },
  {
    id: 2,
    term: "Inverter Technology",
    category: "Appliances",
    iconId: "Zap",
    simple: "Smarter motor that adjusts speed to save 30-50% electricity.",
    detail: "Instead of Stop/Start (Fixed Speed), it cruises at the right speed to maintain temp.",
    tips: "Pays for itself in 3-5 years via electricity savings."
  },
  {
    id: 3,
    term: "OLED vs LCD (IPS/VA)",
    category: "Displays",
    iconId: "Search",
    simple: "OLED: Perfect blacks, risk of burn-in. LCD: Brighter, durable.",
    detail: "OLED pixels allow per-pixel dimming. LCD uses a backlight.",
    tips: "Movies in dark room = OLED. Static PC work = LCD."
  },
  {
    id: 4,
    term: "BTU (British Thermal Unit)",
    category: "Air Conditioner",
    iconId: "Wind",
    simple: "Cooling capacity. Match to room size.",
    detail: "Room sqm x 800 = BTU needed. Add 20% for sunny rooms.",
    tips: "Too low runs forever (waste). Too high creates humidity issues."
  },
  {
    id: 5,
    term: "HEPA Filter (H13/H14)",
    category: "Health",
    iconId: "ShieldCheck",
    simple: "The standard that actually stops PM2.5.",
    detail: "True HEPA (H13) stops 99.97% of 0.3 micron particles.",
    tips: "Look for CADR numbers. 'HEPA-type' is marketing nonsense."
  },
  {
    id: 6,
    term: "Refresh Rate",
    category: "Screens",
    iconId: "Zap",
    simple: "Updates per second. Higher = Smoother.",
    detail: "60Hz is standard. 120Hz is fluid. LTPO saves battery.",
    tips: "Hard to go back to 60Hz after using 120Hz."
  }
];

// ==========================================
// SECTION 2: COMPONENTS
// ==========================================

// --- COMPONENT: SpecDecoder ---
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

// --- COMPONENT: Calculator ---
const Calculator = () => {
  const [savings, setSavings] = useState(50000);
  const [price, setPrice] = useState(15000);

  const timesAffordable = useMemo(() => {
    const priceNum = Number(price);
    const savingsNum = Number(savings);
    if (!priceNum || priceNum === 0) return 0;
    return savingsNum / priceNum;
  }, [savings, price]);

  const percentageOfSavings = useMemo(() => {
    const priceNum = Number(price);
    const savingsNum = Number(savings);
    if (!savingsNum || savingsNum === 0) return 100;
    return (priceNum / savingsNum) * 100;
  }, [savings, price]);

  let status = { label: "Unknown", color: "gray", icon: Info, advice: "" };
  if (timesAffordable >= 10) {
    status = { 
      label: "Safe to Buy", 
      color: COLORS.success, 
      icon: CheckCircle, 
      advice: "You can comfortably afford this. It barely dents your safety net."
    };
  } else if (timesAffordable >= 5) {
    status = { 
      label: "Proceed with Caution", 
      color: COLORS.yellow, 
      icon: AlertTriangle, 
      advice: "You can buy it, but consider if it's a 'Need' or a 'Want'. It takes a noticeable chunk of your funds."
    };
  } else {
    status = { 
      label: "Not Recommended", 
      color: COLORS.danger, 
      icon: XCircle, 
      advice: "This is financially risky. The 'Rule of 10' suggests saving more first. Don't go broke for a gadget."
    };
  }

  const chartGradient = `conic-gradient(
    ${status.color} 0% ${percentageOfSavings}%, 
    #E5E5EA ${percentageOfSavings}% 100%
  )`;

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1F] mb-2">The Reality Check</h2>
          <p className="text-[#86868B]">Can you *really* afford it? We use the <span className="font-semibold text-black">"Rule of 10"</span>.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-[#F5F5F7] p-8 rounded-3xl">
              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Item Price</label>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2 text-gray-400">฿</span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-transparent text-4xl font-bold text-[#1D1D1F] focus:outline-none placeholder-gray-300"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="bg-[#F5F5F7] p-8 rounded-3xl">
              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Savings</label>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2 text-gray-400">฿</span>
                <input 
                  type="number" 
                  value={savings} 
                  onChange={(e) => setSavings(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-transparent text-4xl font-bold text-[#1D1D1F] focus:outline-none placeholder-gray-300"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            <div 
              className="w-64 h-64 rounded-full relative shadow-xl transition-all duration-700 ease-out"
              style={{ background: chartGradient }}
            >
              <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center text-center px-4">
                <span className="text-sm font-medium text-gray-400">Impact</span>
                <span className="text-4xl font-bold text-[#1D1D1F] mt-1">
                  {Math.min(percentageOfSavings, 100).toFixed(1)}%
                </span>
                <span className="text-xs text-gray-400 mt-1">of your savings</span>
              </div>
            </div>

            <div className={`mt-8 p-6 rounded-2xl w-full border border-gray-100 shadow-sm bg-white`}>
              <div className="flex items-center gap-3 mb-2">
                <status.icon className="w-6 h-6" style={{ color: status.color }} />
                <h3 className="text-xl font-bold" style={{ color: status.color }}>{status.label}</h3>
              </div>
              <p className="text-[#86868B] text-sm leading-relaxed">{status.advice}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
                <span>Ability to buy:</span>
                <span className="font-semibold text-gray-600">{timesAffordable.toFixed(1)} times</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: AdUnit ---
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

// ==========================================
// SECTION 3: MAIN APP & UI COMPONENTS
// ==========================================

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