import React, { useState, useMemo, useEffect } from 'react';
import { 
  PieChart, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Shield, 
  Zap, 
  Droplet, 
  Wind,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Clock,
  Info,
  Sparkles,
  Monitor, 
  Activity, 
  Database, 
  X,        
  Cpu,
  ExternalLink // Added for Ad link
} from 'lucide-react';

// --- CONFIGURATION: ADS ---
// Toggle 'provider' between 'google' and 'custom'
const AD_CONFIG = {
  enabled: true,
  provider: 'custom', // Options: 'google' or 'custom'
  
  // If provider is 'google', fill these:
  google: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX', // Your AdSense ID
    slot: '1234567890', // Your Ad Slot ID
  },

  // If provider is 'custom' (Direct Sponsorship), fill these:
  custom: {
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Example placeholder
    title: 'Minimalist Tech Organizer',
    description: 'Keep your cables tangle-free. The perfect companion for your new gadgets.',
    link: '#', // The sponsor's website
    cta: 'Shop Now'
  }
};

// --- Branding & Color Palette ---
const COLORS = {
  bg: 'bg-[#F5F5F7]', // Apple-like light gray
  card: 'bg-white',
  textMain: 'text-[#1D1D1F]',
  textSec: 'text-[#86868B]',
  charcoal: '#333333',
  yellow: '#F5D04C', // Tardkantalard Brand Color (Approx)
  mint: '#98E2C6',   // Tardkantalard Brand Color (Approx)
  sand: '#E6D5B8',   // Tardkantalard Brand Color (Approx)
  sky: '#B4D4E6',    // Soft Sky
  danger: '#FF3B30', // System Red
  success: '#34C759', // System Green
};

// --- DATA: Spec Decoder Knowledge Base ---

const IP_RATING_DATA = {
  solids: {
    '0': { short: "Not protected", detail: "No protection against contact and ingress of objects." },
    '1': { short: ">50mm Objects", detail: "Protected against solid objects larger than 50mm (e.g., accidental touch by hand)." },
    '2': { short: ">12.5mm Objects", detail: "Protected against solid objects larger than 12.5mm (e.g., fingers)." },
    '3': { short: ">2.5mm Objects", detail: "Protected against solid objects larger than 2.5mm (e.g., tools, thick wires)." },
    '4': { short: ">1mm Objects", detail: "Protected against solid objects larger than 1mm (e.g., most wires, slender screws)." },
    '5': { short: "Dust Protected", detail: "Ingress of dust is not entirely prevented, but it must not enter in sufficient quantity to interfere with the satisfactory operation of the equipment." },
    '6': { short: "Dust Tight", detail: "No ingress of dust; complete protection against contact (dust-tight). A vacuum must be applied." },
    'x': { short: "Not Tested", detail: "No data available to specify a protection rating with regard to this criteria." },
    'X': { short: "Not Tested", detail: "No data available to specify a protection rating with regard to this criteria." }
  },
  liquids: {
    '0': { short: "Not protected", detail: "No liquid protection." },
    '1': { short: "Dripping Water", detail: "Protected against vertically falling water drops. Limited ingress permitted." },
    '2': { short: "Tilted Dripping", detail: "Protected against vertically falling water drops when enclosure is tilted up to 15°." },
    '3': { short: "Spraying Water", detail: "Protected against water falling as a spray at any angle up to 60° from the vertical." },
    '4': { short: "Splashing Water", detail: "Protected against splashing water from any direction. Limited ingress permitted." },
    '5': { short: "Water Jets", detail: "Protected against water jets projected by a nozzle (6.3mm) from any direction." },
    '6': { short: "Powerful Jets", detail: "Protected against powerful water jets (12.5mm nozzle)." },
    '7': { short: "Immersion (1m)", detail: "Protected against temporary immersion (up to 1m for 30 mins)." },
    '8': { short: "Deep Immersion", detail: "Protected against continuous immersion. Typically >1m depth. Check manufacturer specifics." },
    '9': { short: "High Temp/Pressure", detail: "Protected against high pressure, high temperature wash-down jets (80°C)." },
    'x': { short: "Not Tested", detail: "No data available to specify a protection rating with regard to this criteria." },
    'X': { short: "Not Tested", detail: "No data available to specify a protection rating with regard to this criteria." }
  }
};

const DECODER_DICTIONARY = [
  {
    id: 'hepa',
    keywords: ['hepa', 'filter', 'h13', 'h14', 'air'],
    title: 'HEPA (High Efficiency Particulate Air)',
    category: 'Air Filtration',
    icon: <Wind className="w-6 h-6 text-blue-400" />,
    definition: "A standard for efficiency of air filtration defined by the US DOE and EU standard EN 1822.",
    specs: [
      { label: "Efficiency (H13)", value: "99.97% of particles @ 0.3 microns" },
      { label: "Efficiency (H14)", value: "99.995% of particles @ 0.3 microns" },
      { label: "Mechanism", value: "Diffusion, Interception, Impaction" }
    ],
    breakdown: "HEPA filters are composed of a mat of randomly arranged fibers (usually fiberglass). Key to understanding HEPA is the 'Most Penetrating Particle Size' (MPPS), typically 0.3 microns. Surprisingly, particles smaller AND larger than 0.3 microns are easier to trap. 0.3 is the hardest, which is why it's the benchmark.",
    commonUses: "Hospital operating rooms, clean rooms, high-end consumer air purifiers.",
    misconceptions: "People think HEPA acts like a sieve where smaller holes stop particles. In reality, it uses electrostatic attraction and physical physics (Brownian motion) to trap particles far smaller than the gaps between fibers."
  },
  {
    id: 'refresh-rate',
    keywords: ['refresh', 'rate', 'hz', '120hz', '144hz', '240hz', '60hz'],
    title: 'Refresh Rate (Hertz/Hz)',
    category: 'Display Technology',
    icon: <Monitor className="w-6 h-6 text-purple-400" />,
    definition: "The number of times per second that a display hardware updates its buffer.",
    specs: [
      { label: "Standard Cinema", value: "24 Hz" },
      { label: "Standard Monitor", value: "60 Hz (16.6ms frame time)" },
      { label: "Gaming Standard", value: "144 Hz (6.9ms frame time)" },
      { label: "Esports Pro", value: "240 Hz - 540 Hz" }
    ],
    breakdown: "Higher refresh rates reduce motion blur and input lag. However, diminishing returns apply. The jump from 60Hz to 120Hz is visually drastic. The jump from 240Hz to 360Hz is subtle and mostly perceptible only to trained competitive gamers.",
    commonUses: "Gaming monitors, Smartphones (ProMotion), TVs.",
    misconceptions: "Refresh Rate is not Frame Rate (FPS). Refresh rate is the monitor's limit; FPS is the computer's output. You need both to be high for the benefit."
  },
  {
    id: 'oled',
    keywords: ['oled', 'amoled', 'screen', 'display'],
    title: 'OLED (Organic Light-Emitting Diode)',
    category: 'Display Technology',
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    definition: "A display technology where every pixel produces its own light (emissive), eliminating the need for a backlight.",
    specs: [
      { label: "Contrast Ratio", value: "Infinite (True Black)" },
      { label: "Response Time", value: "< 1ms (Instant)" },
      { label: "Burn-in Risk", value: "Moderate (over long periods)" }
    ],
    breakdown: "Since individual pixels can turn off completely, OLEDs achieve 'perfect black'. This creates infinite contrast. However, the organic compounds degrade over time, specifically the blue subpixels, leading to potential burn-in if static images are displayed for thousands of hours.",
    commonUses: "High-end smartphones, Premium TVs, Smartwatches.",
    misconceptions: "QLED is not OLED. QLED is just an LCD with a quantum dot filter. Only OLED (and MicroLED) are self-emissive."
  },
  {
    id: 'usb-c',
    keywords: ['usb', 'type-c', 'thunderbolt', 'pd'],
    title: 'USB-C & Power Delivery',
    category: 'Connectivity',
    icon: <Activity className="w-6 h-6 text-green-400" />,
    definition: "A 24-pin physical connector system with a rotationally symmetrical connector.",
    specs: [
      { label: "Max Power (PD 3.1)", value: "240W (48V @ 5A)" },
      { label: "Max Speed (USB4)", value: "40 Gbps or 80 Gbps" },
      { label: "Video", value: "DisplayPort Alt Mode supported" }
    ],
    breakdown: "USB-C is just the SHAPE of the plug. It does not guarantee speed. A USB-C cable can be USB 2.0 (slow, 480Mbps) or Thunderbolt 4 (fast, 40Gbps). Always check the rating of the cable itself.",
    commonUses: "Laptops, Phones, Monitors, Docks.",
    misconceptions: "Thinking all USB-C cables charge at the same speed. Without an 'E-marker' chip, cables are often limited to 60W (3A)."
  },
  {
    id: 'hdmi',
    keywords: ['hdmi', '2.1', '2.0', 'arc', 'earc'],
    title: 'HDMI Versions (1.4 - 2.1a)',
    category: 'Connectivity',
    icon: <Monitor className="w-6 h-6 text-red-400" />,
    definition: "Proprietary audio/video interface for transmitting uncompressed video data.",
    specs: [
      { label: "HDMI 1.4", value: "10.2 Gbps (4K @ 30Hz)" },
      { label: "HDMI 2.0", value: "18 Gbps (4K @ 60Hz, HDR)" },
      { label: "HDMI 2.1", value: "48 Gbps (4K @ 120Hz, 8K @ 60Hz)" }
    ],
    breakdown: "HDMI 2.1 is critical for PS5/Xbox Series X to achieve 4K 120Hz. It also introduces VRR (Variable Refresh Rate) and eARC (Enhanced Audio Return Channel) for uncompressed Dolby Atmos.",
    commonUses: "TVs, Consoles, Soundbars.",
    misconceptions: "Gold plated connectors improve picture quality. They do not; digital signals either work or they don't. Gold only helps prevent corrosion over many years."
  }
];

// --- DATA: Technical Glossary (Existing) ---
const TECH_TERMS = [
  {
    id: 1,
    term: "IP Rating (Ingress Protection)",
    category: "Durability",
    icon: <Droplet className="w-5 h-5" />,
    simple: "How waterproof and dustproof a device is.",
    detail: "The rating format is IPXX. The first digit (0-6) is for dust. The second digit (0-9) is for water. \n• IP67: Can survive 1 meter depth for 30 minutes.\n• IP68: Can survive deeper than 1 meter (usually 1.5m) for 30 minutes.\n• IPX4: Only splash resistant (rain/sweat), do not submerge.",
    tips: "Warranty often DOES NOT cover water damage even if it's IP68. Salt water breaks seals faster—rinse with fresh water immediately if exposed."
  },
  {
    id: 2,
    term: "Inverter Technology",
    category: "Appliances",
    icon: <Zap className="w-5 h-5" />,
    simple: "A smarter motor that adjusts speed to save 30-50% electricity.",
    detail: "Old 'Fixed Speed' ACs work like a light switch: 100% ON or 0% OFF, causing temperature swings and power spikes. An Inverter acts like a gas pedal, running at 20%, 50%, or 80% power to maintain exact temperature without stopping.",
    tips: "Calculated over 3-5 years, an Inverter AC pays for its higher price tag through lower electricity bills."
  },
  {
    id: 3,
    term: "OLED vs LCD (IPS/VA)",
    category: "Displays",
    icon: <Search className="w-5 h-5" />,
    simple: "OLED has perfect blacks and vibrant colors; LCD is durable and brighter.",
    detail: "• OLED: Each pixel emits its own light. To show black, it turns off completely (Infinite Contrast). Great for movies.\n• LCD: Uses a big backlight behind the screen. Black looks like dark grey in a dark room. Safer from 'Burn-in' issues long-term.",
    tips: "If you watch movies in the dark, go OLED. If you use it as a PC monitor with static toolbars all day, good quality LCD is safer."
  },
  {
    id: 4,
    term: "BTU (British Thermal Unit)",
    category: "Air Conditioner",
    icon: <Wind className="w-5 h-5" />,
    simple: "The cooling capacity. Match this to your room size or lose money.",
    detail: "Basic Calculation: Room Area (sqm) x 800.\n• 9,000 BTU: Small bedroom (10-14 sqm)\n• 12,000 BTU: Master bedroom (15-20 sqm)\n• 18,000 BTU: Living room (24-30 sqm)\n*Multiply by 1000 instead of 800 if the room gets direct afternoon sunlight.",
    tips: "A BTU that is too low runs at 100% constantly, drying the air and wasting energy. Too high creates humidity issues."
  },
  {
    id: 5,
    term: "HEPA Filter (H13/H14)",
    category: "Health",
    icon: <ShieldCheck className="w-5 h-5" />,
    simple: "The only filter standard that actually stops PM2.5.",
    detail: "True HEPA (H13 grade) captures 99.97% of particles down to 0.3 microns (smoke, bacteria, PM2.5). Many cheap purifiers say 'HEPA-type' or 'HEPA-style'—these are fake marketing terms and do not offer medical-grade protection.",
    tips: "Check the CADR (Clean Air Delivery Rate) number. Higher CADR = cleans the room faster."
  },
  {
    id: 6,
    term: "Refresh Rate (60Hz vs 120Hz)",
    category: "Screens",
    icon: <Zap className="w-5 h-5" />,
    simple: "How many times the screen updates per second. Higher = Smoother.",
    detail: "• 60Hz: Standard smooth. Fine for YouTube.\n• 120Hz/144Hz: Ultra smooth. Makes scrolling text readable while moving and games feel instant.\n• LTPO/Adaptive: High-end feature that drops to 1Hz when reading to save battery.",
    tips: "Once your eyes adjust to 120Hz, 60Hz will feel 'laggy'. Beware of cheap '120Hz' screens with slow ghosting (smearing)."
  }
];

// --- Components ---

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

const Calculator = () => {
  const [savings, setSavings] = useState(50000);
  const [price, setPrice] = useState(15000);

  const timesAffordable = useMemo(() => {
    if (price === 0) return 0;
    return savings / price;
  }, [savings, price]);

  const percentageOfSavings = useMemo(() => {
    if (savings === 0) return 100;
    return (price / savings) * 100;
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
                  onChange={(e) => setPrice(Number(e.target.value))}
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
                  onChange={(e) => setSavings(Number(e.target.value))}
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
              <p className="text-[#86868B] text-sm leading-relaxed">
                {status.advice}
              </p>
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

// --- NEW COMPONENT: UNIVERSAL SPEC DECODER ---
const SpecDecoder = () => {
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState(null);

  const parseQuery = (input) => {
    if (!input) return null;
    const cleanInput = input.trim().toUpperCase();

    // 1. IP Rating (Regex: IP + Digit/X + Digit/X + Optional K)
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
        context: "IP ratings are self-certified by manufacturers based on IEC 60529. Higher numbers don't always mean better protection against everything (e.g., immersion protection doesn't guarantee protection against high-pressure jets)."
      };
    }

    // 2. Dictionary Search
    const foundItem = DECODER_DICTIONARY.find(item => 
      item.keywords.some(k => cleanInput.includes(k.toUpperCase())) || 
      cleanInput.includes(item.id.toUpperCase())
    );

    if (foundItem) {
      return { type: 'DICTIONARY', ...foundItem };
    }

    return null;
  };

  const handleSearch = (val) => {
    setQuery(val);
    if (val.length > 1) {
      setActiveResult(parseQuery(val));
    } else {
      setActiveResult(null);
    }
  };

  return (
    <div id="decoder" className="max-w-5xl mx-auto px-6 mb-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 -z-10"></div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
             <Cpu size={14} /> Universal Decoder
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Tech Spec Translator</h2>
          <p className="text-[#86868B]">Enter any code (e.g., <span className="font-mono text-gray-600 bg-gray-100 px-1 rounded">IP67</span>, <span className="font-mono text-gray-600 bg-gray-100 px-1 rounded">HEPA</span>, <span className="font-mono text-gray-600 bg-gray-100 px-1 rounded">120Hz</span>) to see exactly what it means.</p>
        </div>

        {/* Input Field */}
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
            <button 
              onClick={() => {setQuery(''); setActiveResult(null);}}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Result Card */}
        {activeResult ? (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#F5F5F7] rounded-2xl p-6 md:p-8 border border-gray-200">
              
              {/* Header */}
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
                <div className="p-3 bg-white rounded-xl shadow-sm">
                   {activeResult.icon}
                </div>
              </div>

              {/* IP Rating Content */}
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

              {/* Dictionary Content */}
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
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-gray-700 italic">
                        "{activeResult.misconceptions}"
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
           <div className="text-center py-6 opacity-40">
              {query ? (
                 <p className="text-sm">Searching global database...</p>
              ) : (
                <div className="flex justify-center gap-2">
                   {['IP68', 'HEPA', 'OLED'].map(tag => (
                      <span key={tag} onClick={() => handleSearch(tag)} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 cursor-pointer hover:bg-gray-200">{tag}</span>
                   ))}
                </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
};


const GlossaryCard = ({ item, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setIsOpen(true);
  }, [defaultOpen]);

  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer h-fit ${defaultOpen ? 'ring-2 ring-[#F5D04C] ring-offset-2' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gray-50 text-gray-700`}>
            {item.icon}
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

// --- NEW COMPONENT: AD UNIT ---
// Handles both Google Ads and Custom Sponsorships cleanly
const AdUnit = () => {
  if (!AD_CONFIG.enabled) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 mb-16">
      <div className="relative group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        {/* Legal Label */}
        <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
          {AD_CONFIG.provider === 'google' ? 'Ad' : 'Sponsored'}
        </div>

        {AD_CONFIG.provider === 'custom' ? (
          // --- CUSTOM AD LAYOUT ---
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
               <p className="text-sm text-[#86868B] mb-4 leading-relaxed max-w-lg">
                 {AD_CONFIG.custom.description}
               </p>
               <a 
                 href={AD_CONFIG.custom.link}
                 className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors w-fit"
               >
                 {AD_CONFIG.custom.cta} <ExternalLink size={14} />
               </a>
             </div>
          </div>
        ) : (
          // --- GOOGLE AD LAYOUT ---
          // In a real app, you would paste the Google Script logic here.
          // Since we can't run external scripts in this preview easily, 
          // this serves as the "Slot" where the ad would render.
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
      {/* INTEGRATED DECODER COMPONENT HERE */}
      <SpecDecoder />

      {/* --- ADS SECTION PLACEMENT --- */}
      {/* Placed here as a break between the intense Calculator/Decoder and the reading list */}
      <AdUnit />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header & Tech Decoder Input */}
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
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xs font-bold uppercase">Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {filteredTerms.map(term => (
              <GlossaryCard key={term.id} item={term} />
          ))}
        </div>
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-lg font-bold text-gray-600">No definitions found in list</h3>
            <p className="text-gray-400">Try using the Universal Decoder above for more complex terms.</p>
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
        {/* Card 1: 48 Hour Rule */}
        <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#F0F0F2] transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6 text-[#1D1D1F]" />
          </div>
          <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">The 48-Hour Rule</h3>
          <p className="text-sm text-[#86868B] leading-relaxed mb-4">
            Impulse buying is the enemy. If you see something you want:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#98E2C6]" /> Wait 48 hours.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#98E2C6]" /> If you still want it, proceed.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#98E2C6]" /> Most urges fade by hour 24.</li>
          </ul>
        </div>

        {/* Card 2: Cost Per Use */}
        <div className="p-8 rounded-3xl bg-[#F5F5F7] hover:bg-[#F0F0F2] transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-[#1D1D1F]" />
          </div>
          <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Cost Per Use (CPU)</h3>
          <p className="text-sm text-[#86868B] leading-relaxed mb-4">
            A $200 pair of shoes you wear everyday is cheaper than a $50 pair you wear once.
          </p>
          <div className="bg-white p-3 rounded-xl text-xs text-gray-500 font-mono">
            Price / Days Used = True Cost<br/>
            <span className="text-[#333] font-bold">$1000 Phone / 365 days = $2.7/day</span>
          </div>
        </div>

        {/* Card 3: Tardkantalard Feature */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#333] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#F5D04C] rounded-full blur-3xl opacity-20"></div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-[#F5D04C]" />
          </div>
          <h3 className="text-xl font-bold mb-3">Tardkantalard Picks</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Curated reviews and honest breakdowns of the latest tech without the fluff.
          </p>
          <button className="text-xs font-bold uppercase tracking-widest text-[#F5D04C] hover:text-[#98E2C6] transition-colors">
            Visit Channel &rarr;
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1D1D1F] text-white py-20 border-t border-gray-800">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">SmartBuy</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Empowering consumers with technical knowledge and financial wisdom.
      </p>
      
      <div className="flex justify-center space-x-6 mb-12">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#F5D04C] hover:text-[#1D1D1F] transition-all cursor-pointer">
          <span className="font-bold text-xs">TT</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#98E2C6] hover:text-[#1D1D1F] transition-all cursor-pointer">
          <span className="font-bold text-xs">YT</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#E6D5B8] hover:text-[#1D1D1F] transition-all cursor-pointer">
          <span className="font-bold text-xs">IG</span>
        </div>
      </div>

      <div className="text-xs text-gray-600">
        <p>&copy; 2024 Tardkantalard Team. All rights reserved.</p>
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