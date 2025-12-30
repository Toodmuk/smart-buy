import React, { useState, useMemo } from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { COLORS } from '../data/constants';

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

export default Calculator;