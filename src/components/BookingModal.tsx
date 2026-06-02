/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgramId?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedProgramId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: preselectedProgramId === 'mastermind' ? '$200K - $500K' : '$500K+',
    bottleneck: '',
  });

  // Calculate some future dates dynamically for the calendar
  const getUpcomingDates = () => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let added = 0;
    // Start generating dates
    for (let i = 1; i < 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip sundays for professional calls
      if (d.getDay() !== 0) {
        dates.push({
          raw: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
          dayName: days[d.getDay()],
          dayNum: d.getDate(),
          monthName: months[d.getMonth()]
        });
        added++;
        if (added >= 5) break; // 5 days max
      }
    }
    return dates;
  };

  const dates = getUpcomingDates();
  const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime(''); // Reset time selection on date switch
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="booking-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          id="booking-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-2xl bg-[#0D0D0D] border-2 border-gray-800 rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(245,166,35,0.15)] z-10"
        >
          {/* Closer button */}
          <button
            id="close-booking-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-[#F5A623] transition-colors p-2 rounded-full hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Stepper Header (Only for Steps 1 & 2) */}
          {step < 3 && (
            <div className="bg-[#1A1A2E]/60 border-b border-gray-800/80 px-8 py-5 flex justify-between items-center">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#F5A623] uppercase">
                  Strategy Call Selection
                </span>
                <h3 className="text-white font-display font-black tracking-wide text-md">
                  {step === 1 ? '1. SELECT DATE & TIME' : '2. QUALIFY YOUR REVENUE'}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-[#F5A623]' : 'bg-gray-700'}`} />
                <span className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-[#F5A623]' : 'bg-gray-700'}`} />
              </div>
            </div>
          )}

          {/* Modal Content */}
          <div className="p-8">
            
            {/* STEP 1: Date & Time Selector */}
            {step === 1 && (
              <div id="booking-step-1" className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-[#F5A623] mr-2" />
                    Available Consultation Days
                  </h4>
                  <div className="grid grid-cols-5 gap-3">
                    {dates.map((d) => (
                      <button
                        id={`calendar-date-${d.raw}`}
                        key={d.raw}
                        onClick={() => handleDateSelect(d.raw)}
                        className={`text-center py-4 px-1 rounded-xl border transition-all cursor-pointer ${
                          selectedDate === d.raw
                            ? 'bg-[#F5A623]/10 border-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.2)]'
                            : 'bg-black/30 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <span className="block text-[10px] font-mono tracking-wide text-gray-400 uppercase">
                          {d.dayName}
                        </span>
                        <span className={`block font-display text-xl font-extrabold my-0.5 ${
                          selectedDate === d.raw ? 'text-[#F5A623]' : 'text-white'
                        }`}>
                          {d.dayNum}
                        </span>
                        <span className="block text-[9px] font-mono text-gray-500 uppercase">
                          {d.monthName}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <motion.div
                    id="time-selector-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center">
                      <Clock className="h-4 w-4 text-[#F5A623] mr-2" />
                      Select a Time Slot (Your Local Time)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          id={`timeslot-${time.replace(/[:\s]/g, '-')}`}
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                            selectedTime === time
                              ? 'bg-[#F5A623] text-[#0d0d0d] border-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.35)]'
                              : 'bg-black/30 border-gray-800 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Footer buttons for step 1 */}
                <div className="pt-6 border-t border-gray-800 flex justify-end">
                  <button
                    id="booking-step1-next"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(2)}
                    className="cursor-pointer flex items-center space-x-2 bg-[#F5A623] hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F5A623] text-[#0d0d0d] font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded transition-all"
                  >
                    <span>Proceed to Qualifications</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Qualification Form */}
            {step === 2 && (
              <form id="booking-step-2" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="David Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/40 border border-gray-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
                      Business Email
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="david@elevatedigital.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/40 border border-gray-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-company" className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
                      Company Name
                    </label>
                    <input
                      id="form-company"
                      type="text"
                      required
                      placeholder="Elevate Digital"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-black/40 border border-gray-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-revenue" className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
                      Annual Company Revenue
                    </label>
                    <select
                      id="form-revenue"
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="w-full bg-black/40 border border-gray-800/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F5A623] cursor-pointer"
                    >
                      <option value="Under $200K" className="bg-[#0d0d0d]">Under $200K</option>
                      <option value="$200K - $500K" className="bg-[#0d0d0d]">$200K - $500K</option>
                      <option value="$500K - $1.2M" className="bg-[#0d0d0d]">$500K - $1.2M (Primary Focus)</option>
                      <option value="$1.2M+" className="bg-[#0d0d0d]">$1.2M+ (Elite Scaling)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="form-bottleneck" className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
                    What is the biggest operational roadblock in your business today?
                  </label>
                  <textarea
                    id="form-bottleneck"
                    required
                    rows={3}
                    placeholder="E.g., I work 70 hours/week, team depends on me for everything, sales are stable but stagnant..."
                    value={formData.bottleneck}
                    onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                    className="w-full bg-black/40 border border-[#gray-800]/80 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#F5A623] resize-none"
                  />
                </div>

                <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                  <button
                    id="form-back-btn"
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center space-x-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    id="form-submit-booking"
                    type="submit"
                    className="cursor-pointer bg-[#F5A623] hover:bg-[#F2A323] text-[#0d0d0d] font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded transition-all shadow-[0_4px_14px_rgba(245,166,35,0.3)]"
                  >
                    Confirm Strategy Call Setup
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Success Confirmation Screen */}
            {step === 3 && (
              <motion.div
                id="booking-step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/50">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl font-black text-white leading-tight uppercase">
                    Your Scaling Brief is Locked
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Excellent choice, <span className="text-white font-bold">{formData.name}</span>! Marcus Reed has reserved this exclusive consultation slot for your company <span className="text-white font-bold">{formData.company}</span>.
                  </p>
                </div>

                {/* Styled invite details */}
                <div id="booking-confirmation-ticket" className="bg-[#1A1A2E]/80 border border-gray-800 rounded-xl p-5 max-w-md mx-auto divide-y divide-gray-800/80 text-left font-mono text-xs">
                  <div className="pb-3 flex justify-between">
                    <span className="text-gray-400 uppercase">Consultant:</span>
                    <span className="text-white font-bold uppercase tracking-wide">Marcus Reed</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-gray-400 uppercase">Date Scheduled:</span>
                    <span className="text-white font-bold">{selectedDate}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-gray-400 uppercase">Time Slot:</span>
                    <span className="text-[#F5A623] font-bold">{selectedTime}</span>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <span className="text-gray-400 uppercase">Focus Framework:</span>
                    <span className="text-white font-bold uppercase sm:text-right">{formData.revenue === '$1.2M+' ? 'Enterprise Multiplier' : 'Founder-to-CEO Transition'}</span>
                  </div>
                </div>

                <div className="bg-[#F59E0B]/5 border border-amber-500/10 rounded-lg p-4 text-xs text-left max-w-md mx-auto line-relaxed">
                  <span className="font-bold text-[#F5A623] block mb-1">What happens next?</span>
                  <p className="text-gray-400 font-sans">
                    A personalized calendar wedding invite and secure Zoom details have been dispatched to <span className="text-white font-semibold">{formData.email}</span>. Please complete your <strong>Pre-brief questionnaire</strong> (attached to the email) at least 2 hours before the call.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    id="booking-success-close"
                    onClick={onClose}
                    className="cursor-pointer border border-gray-700 hover:border-[#F5A623] hover:text-[#F5A623] text-gray-400 font-bold uppercase tracking-wider text-xs py-2.5 px-8 rounded transition-all"
                  >
                    Return to Homepage
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
