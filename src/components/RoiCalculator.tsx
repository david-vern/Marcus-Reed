/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { ShieldAlert, TrendingUp, DollarSign, ArrowRight, Zap, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface RoiCalculatorProps {
  onSelectProgram: (programId: string) => void;
}

export default function RoiCalculator({ onSelectProgram }: RoiCalculatorProps) {
  const [revenue, setRevenue] = useState(550000); // 550k default
  const [hours, setHours] = useState(65); // 65 hrs default
  const [teamSize, setTeamSize] = useState(4);
  const [bottleneck, setBottleneck] = useState('bottleneck'); // bottleneck, sales, team, systems

  const calculations = useMemo(() => {
    // 1. Burnout risk calculation
    let burnoutPoints = 0;
    if (hours > 70) burnoutPoints += 50;
    else if (hours > 55) burnoutPoints += 35;
    else if (hours > 45) burnoutPoints += 15;
    else burnoutPoints += 5;

    if (bottleneck === 'bottleneck') burnoutPoints += 35;
    if (bottleneck === 'systems') burnoutPoints += 25;
    if (bottleneck === 'team') burnoutPoints += 20;
    if (bottleneck === 'sales') burnoutPoints += 15;

    if (teamSize < 3) burnoutPoints += 15;
    else if (teamSize < 6) burnoutPoints += 5;

    const burnoutRisk = Math.min(Math.max(burnoutPoints, 10), 100);

    // 2. Scale Potential Score (0 to 100)
    // Founders who are bottlenecks but have higher revenue have highest scale potential with systems
    let scalePoints = 35;
    if (revenue > 1000000) scalePoints += 35;
    else if (revenue > 500000) scalePoints += 25;
    else scalePoints += 15;

    if (teamSize >= 5) scalePoints += 15;
    if (bottleneck === 'bottleneck' || bottleneck === 'systems') scalePoints += 15; // easily solved with coaching

    const scalePotential = Math.min(scalePoints, 95);

    // 3. Profit Leakage (Lost growth because owner is in the weeds)
    // 35% of revenue is standard inefficiency/leakage in founder-led service/product companies
    const profitLeak = Math.round(revenue * 0.38);

    // 4. Recommendation
    let recommendedProgram = '1on1';
    let recLabel = '1-on-1 Intensive Coaching';
    if (revenue < 400000) {
      recommendedProgram = 'mastermind';
      recLabel = 'Group Mastermind';
    } else if (hours < 45 && teamSize > 6) {
      recommendedProgram = 'strategy';
      recLabel = 'Strategy Day Intensive';
    }

    return {
      burnoutRisk,
      scalePotential,
      profitLeak,
      recommendedProgram,
      recLabel
    };
  }, [revenue, hours, teamSize, bottleneck]);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${(val / 1000).toFixed(0)}K`;
  };

  return (
    <section id="assessment" className="py-24 bg-[#0d0d0d] border-t border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div id="assessment-header" className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase bg-[#1a1a2e] px-3 py-1 rounded-full border border-gray-800">
            Interactive Diagnostic
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-4 mb-6 leading-tight">
            Calculate Your Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-amber-400 to-[#F5A623]">Scale Potential</span> & Burnout Risk
          </h2>
          <p className="text-gray-400 text-lg">
            Answer 4 simple questions about your current business metrics to see the invisible barrier locking your growth and receive a customized leverage plan.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div id="assessment-dashboard-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel - Controls (7 cols) */}
          <div id="calc-input-panel" className="lg:col-span-7 bg-[#1A1A2E]/40 border border-gray-800/80 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
            
            <div className="space-y-8">
              {/* Slider 1: Revenue */}
              <div id="input-group-revenue">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="revenue-range" className="text-sm font-semibold tracking-wide text-gray-200">
                    CURRENT ANNUAL REVENUE
                  </label>
                  <span className="font-mono text-lg font-bold text-[#F5A623] bg-[#1A1A2E] px-3 py-1 border border-gray-800 rounded">
                    {formatCurrency(revenue)}
                  </span>
                </div>
                <input
                  id="revenue-range"
                  type="range"
                  min="200000"
                  max="2500000"
                  step="50000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>$200K</span>
                  <span>$1.0M</span>
                  <span>$1.8M</span>
                  <span>$2.5M+</span>
                </div>
              </div>

              {/* Slider 2: Hours worked */}
              <div id="input-group-hours">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="hours-range" className="text-sm font-semibold tracking-wide text-gray-200">
                    OWNER HOURS WORKED PER WEEK
                  </label>
                  <span className={`font-mono text-lg font-bold px-3 py-1 border border-gray-800 rounded ${
                    hours >= 60 ? 'text-red-400 bg-red-950/20' : 'text-[#F5A623] bg-[#1A1A2E]'
                  }`}>
                    {hours} hrs
                  </span>
                </div>
                <input
                  id="hours-range"
                  type="range"
                  min="30"
                  max="90"
                  step="5"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>30 hrs (Balanced)</span>
                  <span>50 hrs (Strained)</span>
                  <span className="text-red-500/80">70+ hrs (Danger Zone)</span>
                </div>
              </div>

              {/* Slider 3: Team size */}
              <div id="input-group-team">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="team-range" className="text-sm font-semibold tracking-wide text-gray-200">
                    CURRENT TEAM SIZE
                  </label>
                  <span className="font-mono text-lg font-bold text-[#F5A623] bg-[#1A1A2E] px-3 py-1 border border-gray-800 rounded">
                    {teamSize} {teamSize === 1 ? 'person' : 'people'}
                  </span>
                </div>
                <input
                  id="team-range"
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>0 (Solo Operator)</span>
                  <span>5 (Small Team)</span>
                  <span>10 (Scaling)</span>
                  <span>20+ (Enterprise)</span>
                </div>
              </div>

              {/* Radio Group: Primary Bottleneck */}
              <div id="input-group-bottleneck">
                <label className="block text-sm font-semibold tracking-wide text-gray-200 mb-4 uppercase">
                  PRIMARY BUSINESS BOTTLENECK
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'bottleneck', label: 'I am the bottleneck of all operations', desc: 'Nothing runs without my direct sign-off' },
                    { id: 'sales', label: 'Inconsistent lead flow / sales pipeline', desc: 'Revenue hits a ceiling we can’t unlock' },
                    { id: 'team', label: 'Team lacks ownership & execution ability', desc: 'Constant hand-holding is required' },
                    { id: 'systems', label: 'No clear, reliable scalable structures', desc: 'Processes are stuck in people’s heads' }
                  ].map((option) => (
                    <button
                      id={`bottleneck-option-${option.id}`}
                      key={option.id}
                      type="button"
                      onClick={() => setBottleneck(option.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        bottleneck === option.id
                          ? 'bg-[#F2A323]/10 border-[#F5A623] shadow-[0_4px_12px_rgba(245,166,35,0.15)]'
                          : 'bg-black/40 border-gray-800/80 hover:border-gray-700 hover:bg-black/60'
                      }`}
                    >
                      <span className="block text-xs font-bold text-white mb-1 tracking-wide">
                        {option.label}
                      </span>
                      <span className="block text-[11px] text-gray-400 leading-snug">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800/60 flex items-start space-x-3 text-xs text-gray-400">
              <Info className="h-4 w-4 text-[#F5A623] shrink-0 mt-0.5" />
              <p>
                Calculations are based on 10+ years of micro-scaling operational assessments and standard agency/service business structural models.
              </p>
            </div>
          </div>

          {/* Right panel - Dynamic results (5 cols) */}
          <div id="calc-result-panel" className="lg:col-span-5 bg-gradient-to-b from-[#1A1A2E]/80 to-black/80 border-2 border-[#F5A623]/30 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[#F5A623]/2 saturate-150 rounded-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <div className="border-b border-gray-800/80 pb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  Assessment Diagnosis
                </h3>
                <p className="text-gray-400 text-xs">Real-time analysis based on {formatCurrency(revenue)} operations</p>
              </div>

              {/* Gauge Row: Burnout & Scale potential */}
              <div className="grid grid-cols-2 gap-6">
                
                {/* Burnout Indicator */}
                <div id="result-burnout-indicator" className="text-center p-4 bg-black/40 rounded-xl border border-gray-800">
                  <div className="flex justify-center mb-2">
                    <ShieldAlert className={`h-6 w-6 ${calculations.burnoutRisk > 60 ? 'text-red-400' : 'text-[#F5A623]'}`} />
                  </div>
                  <span className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-1">
                    Burnout Risk
                  </span>
                  <span className={`block font-display text-2xl font-extrabold ${
                    calculations.burnoutRisk > 60 ? 'text-red-400' : 'text-[#F5A623]'
                  }`}>
                    {calculations.burnoutRisk}%
                  </span>
                  
                  {/* Miniature text status */}
                  <span className="text-[9px] font-mono block mt-1 text-gray-500">
                    {calculations.burnoutRisk > 75 ? '🔥 High Burnout Danger' : calculations.burnoutRisk > 45 ? '⚠️ High Pressure' : '✨ Manageable'}
                  </span>
                </div>

                {/* Scale Potential Indicator */}
                <div id="result-scale-indicator" className="text-center p-4 bg-black/40 rounded-xl border border-gray-800">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-1">
                    Scale Potential
                  </span>
                  <span className="block font-display text-2xl font-extrabold text-emerald-400">
                    {calculations.scalePotential}%
                  </span>
                  <span className="text-[9px] font-mono block mt-1 text-gray-500">
                    High systems leverage
                  </span>
                </div>

              </div>

              {/* Profit leakage section */}
              <div id="result-leak-section" className="bg-black/60 rounded-xl p-5 border border-gray-800/80">
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="h-5 w-5 text-[#F5A623]" />
                  <h4 className="text-sm font-bold tracking-wide uppercase text-gray-200">
                    Estimated Annual Profit Leak
                  </h4>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-display text-3xl font-extrabold text-white">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(calculations.profitLeak)}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">/ year</span>
                </div>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                  Lost revenue from operational bottlenecks, missed sales leverage, and high executive workload keeping the founder stuck.
                </p>
              </div>

              {/* Recommendation Card */}
              <div id="result-recommendation-section" className="bg-gradient-to-r from-[#1A1A2E] to-black rounded-xl p-5 border border-[#F5A623]/25">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-amber-400 uppercase">
                    Recommended Catalyst
                  </span>
                </div>
                <h4 className="text-md font-extrabold text-white mb-1">
                  {calculations.recLabel}
                </h4>
                <p className="text-gray-400 text-xs leading-normal">
                  Specifically calibrated to optimize {hours} hour workloads and scale founders to their next growth phase efficiently.
                </p>
              </div>

            </div>

            {/* Premium CTA Trigger button */}
            <div className="relative mt-8 z-10">
              <button
                id="calc-submit-cta"
                onClick={() => onSelectProgram(calculations.recommendedProgram)}
                className="cursor-pointer w-full flex items-center justify-center space-x-2 bg-[#F5A623] hover:bg-amber-400 text-[#0d0d0d] font-bold uppercase tracking-wider text-xs py-4 px-6 rounded transition-all shadow-[0_8px_20px_rgba(245,166,35,0.25)] hover:shadow-[0_8px_30px_rgba(245,166,35,0.4)]"
              >
                <span>Apply For This Solution</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
