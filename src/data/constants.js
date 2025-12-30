import { Wind, Monitor, Zap, Activity, Droplet, ShieldCheck, Search } from 'lucide-react';
// We import icons here so we can use them in the definitions directly, 
// or you can map them in the component. For simplicity, we'll keep the structure.
import React from 'react';

// --- CONFIGURATION ---
export const COLORS = {
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

export const AD_CONFIG = {
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

// --- KNOWLEDGE BASE ---
export const IP_RATING_DATA = {
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

export const DECODER_DICTIONARY = [
    {
        id: 'hepa',
        keywords: ['hepa', 'filter', 'h13', 'h14', 'air'],
        title: 'HEPA (High Efficiency Particulate Air)',
        category: 'Air Filtration',
        // Note: In a real app, you might pass icon strings instead of components in data files
        // But for this refactor we will handle icons in the component to keep data pure JSON-like if possible
        // For now, we will omit the direct icon component in data and handle it in the switch statement in the component
        // or keep it simple.
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

export const TECH_TERMS = [
    {
        id: 1,
        term: "IP Rating (Ingress Protection)",
        category: "Durability",
        // We use a string identifier for icon mapping in the component
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