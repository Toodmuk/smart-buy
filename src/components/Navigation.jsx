import React from 'react';

export const Navbar = () => (
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

export const Footer = () => (
<footer className="bg-[#1D1D1F] text-white py-20 border-t border-gray-800">
    <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-2xl font-bold mb-4 tracking-tight">SmartBuy</h2>
    <p className="text-gray-500 max-w-md mx-auto mb-8">Empowering consumers with technical knowledge and financial wisdom.</p>
    <div className="flex justify-center space-x-6 mb-12">
        <a href="https://tiktok.com/@yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#F5D04C] hover:text-[#1D1D1F] transition-all cursor-pointer"><span className="font-bold text-xs">TT</span></a>
        <a href="https://youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#98E2C6] hover:text-[#1D1D1F] transition-all cursor-pointer"><span className="font-bold text-xs">YT</span></a>
        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#E6D5B8] hover:text-[#1D1D1F] transition-all cursor-pointer"><span className="font-bold text-xs">IG</span></a>
    </div>
    <div className="text-xs text-gray-600">
        <p>&copy; 2024 Tardkantalard Team. All rights reserved.</p>
        <p className="mt-2">Disclaimer: Financial figures are estimates. Please consult a professional.</p>
    </div>
    </div>
</footer>
);