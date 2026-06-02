/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Program } from '../types';

interface ProgramCardProps {
  key?: string;
  program: Program;
  onApply: (programId: string) => void;
  isPopular?: boolean;
}

export default function ProgramCard({ program, onApply, isPopular = false }: ProgramCardProps) {
  return (
    <motion.div
      id={`program-card-${program.id}`}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 h-full ${
        isPopular
          ? 'bg-gradient-to-b from-[#1a1a2e]/90 to-black/90 border-2 border-[#F5A623] shadow-[0_15px_35px_rgba(245,166,35,0.12)]'
          : 'bg-[#1A1A2E]/30 hover:bg-[#1A1A2E]/50 border border-gray-800/80 shadow-lg'
      }`}
    >
      {/* Popular Highlight Badge */}
      {isPopular && (
        <div className="absolute top-0 right-0">
          <span className="block bg-[#F5A623] text-black font-mono font-bold text-[9px] tracking-widest uppercase px-4 py-1.5 rounded-bl-xl origin-top-right">
            FLAGSHIP INTENSIVE
          </span>
        </div>
      )}

      {/* Main card info wrapper */}
      <div className="p-8 md:p-10">
        
        {/* Name and badge */}
        <div>
          <span className="font-mono text-[9px] tracking-widest text-[#F5A623] uppercase">
            {program.badge || 'PRODUCING LEVERAGE'}
          </span>
          <h3 className="font-display text-2xl font-extrabold text-white mt-1 uppercase">
            {program.name}
          </h3>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed">
            {program.description}
          </p>
        </div>

        {/* Pricing tag */}
        <div className="my-8 flex items-baseline select-none">
          <span className="font-display text-4xl font-extrabold text-[#F5A623]">
            {program.price}
          </span>
          <span className="text-xs text-gray-400 font-mono tracking-widest uppercase ml-2">
            {program.period}
          </span>
        </div>

        {/* Deliverables Checklist list */}
        <div className="space-y-4 pt-6 border-t border-gray-800/60">
          <h4 className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">
            Program Deliverables
          </h4>
          <ul className="space-y-3">
            {program.includes.map((incl, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-gray-300">
                <Check className="h-4 w-4 text-[#F5A623] shrink-0 mt-0.5" />
                <span>{incl}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Action Button layout */}
      <div className="p-8 md:p-10 pt-0">
        <button
          id={`apply-btn-${program.id}`}
          onClick={() => onApply(program.id)}
          className={`cursor-pointer w-full text-center py-3.5 px-6 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            isPopular
              ? 'bg-[#F5A623] text-[#0d0d0d] hover:bg-amber-400 hover:shadow-[0_4px_20px_rgba(245,166,35,0.35)]'
              : 'bg-black/50 hover:bg-[#F5A623] hover:text-[#0d0d0d] text-white border border-[#F5A623] hover:border-[#F5A623]'
          }`}
        >
          {program.ctaText}
        </button>
      </div>

    </motion.div>
  );
}
