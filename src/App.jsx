import React from 'react';
import { Navbar, Footer } from './components/Navigation';
import { Hero, AdditionalFeatures } from './components/Hero';
import { RevealOnScroll } from './components/Animations';
import Calculator from './components/Calculator';
import Glossary from './components/Glossary';
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-[#F5D04C] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <RevealOnScroll>
          <Calculator />
        </RevealOnScroll>
        <Glossary />
        <AdditionalFeatures />
      </main>
      <Footer />
    </div>
  );
}