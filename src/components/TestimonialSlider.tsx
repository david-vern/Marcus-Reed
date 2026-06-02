/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 'david',
      name: 'David Chen',
      company: 'Elevate Digital',
      result: '+$240,000 Growth',
      quote: "Marcus helped me identify the bottlenecks keeping my company stuck. Within months, we had a clearer strategy, stronger team structure, and consistent growth.",
      metricLabel: 'Revenue Scale',
      metricValue: '$180K ➔ $420K'
    },
    {
      id: 'ryan',
      name: 'Ryan Foster',
      company: 'Apex Solutions',
      result: '+122% Revenue Spike',
      quote: "I was working nonstop and still felt stuck. Marcus showed me how to scale without becoming the bottleneck. The transformation was immediate.",
      metricLabel: 'Annual Contract Value',
      metricValue: '$350K ➔ $780K'
    },
    {
      id: 'michael',
      name: 'Michael Torres',
      company: 'GrowthLab',
      result: '2x MRR Growth',
      quote: "The systems Marcus helped us implement changed everything. We finally had predictable growth instead of constant firefighting, and we cut my work hours by almost a third.",
      metricLabel: 'Work Hours Saved',
      metricValue: '-30% Workload'
    },
    {
      id: 'jason',
      name: 'Jason Mitchell',
      company: 'Peak Performance Group',
      result: 'Grew Team size by 8x',
      quote: "The clarity, accountability, and strategic direction were worth every dollar. Marcus helped me think like a true CEO and scale from a solo operator to a full systems-led agency.",
      metricLabel: 'Team Expansion',
      metricValue: '1 ➔ 8 Members'
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="results" className="py-24 bg-[#1a1a2e]/50 border-t border-b border-gray-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div id="results-title-header" className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase bg-black/60 px-3 py-1 rounded-full border border-gray-800">
              Validated Client Outcomes
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-4 tracking-tight uppercase leading-none">
              Client Results
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Real metrics from founders who transitioned from day-to-day firefighting to systems-based multi-million dollar growth.
            </p>
          </div>

          {/* Navigation Controls */}
          <div id="testimonial-nav-controls" className="flex items-center space-x-3">
            <button
              id="testimonial-prev-arrow"
              onClick={handlePrev}
              className="p-3 bg-black/40 border border-gray-800 rounded-full hover:border-[#F5A623] hover:text-[#F5A623] text-gray-400 transition-all cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              id="testimonial-next-arrow"
              onClick={handleNext}
              className="p-3 bg-black/40 border border-gray-800 rounded-full hover:border-[#F5A623] hover:text-[#F5A623] text-gray-400 transition-all cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Display Card */}
        <div id="testimonial-display-card" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main big block - testimonial quotation (7 columns) */}
          <div className="lg:col-span-7 bg-black/50 border border-gray-800/80 rounded-2xl p-8 md:p-12 relative min-h-[350px] flex flex-col justify-between">
            <div className="absolute top-6 right-8 text-gray-800 pointer-events-none">
              <Quote className="h-20 w-20 opacity-20 text-[#F5A623] scroll-smooth" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  <p className="text-xl md:text-2xl text-gray-200 font-sans tracking-wide leading-relaxed italic pr-4">
                    "{current.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-800/80 flex items-center space-x-4">
                  {/* Avatar Indicator badge */}
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1A1A2E] to-amber-700/80 border border-[#F5A623]/30 flex items-center justify-center font-bold text-white uppercase text-md">
                    {current.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wide text-md">{current.name}</h4>
                    <span className="text-xs font-mono text-[#F5A623] uppercase tracking-wider">{current.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side - Gorgeous Dynamic Metric Callout Card (5 columns) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-b from-[#1A1A2E] to-black border-2 border-[#F5A623]/40 rounded-2xl p-10 relative overflow-hidden shadow-2xl text-center"
              >
                {/* Visual mesh */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F5A623]" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full" />

                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#F5A623] uppercase bg-black/40 px-3 py-1 rounded border border-gray-800/80">
                      Validated Growth
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl font-black text-white mt-5 tracking-tight uppercase leading-tight">
                      {current.result}
                    </h3>
                  </div>

                  <div className="py-6 border-y border-gray-800 flex justify-between items-center max-w-sm mx-auto text-left">
                    <div>
                      <span className="block text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                        {current.metricLabel}
                      </span>
                      <span className="block text-md font-bold text-white mt-1">
                        {current.metricValue}
                      </span>
                    </div>
                    <div className="text-[#F5A623] bg-[#F5A623]/5 p-2 rounded-full border border-[#F5A623]/20">
                      <Plus className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    *Performance audited under professional scale coaching standards. Average outcomes vary based on organizational execution.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Small Navigation dots */}
        <div id="testimonial-bullets" className="flex justify-center space-x-2 mt-10">
          {testimonials.map((t, idx) => (
            <button
              id={`testimonial-bullet-${idx}`}
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all rounded-full ${
                activeIndex === idx ? 'w-8 bg-[#F5A623]' : 'w-2 bg-gray-800 hover:bg-gray-700'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
