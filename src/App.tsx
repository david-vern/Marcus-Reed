/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Clock,
  ArrowRight,
  Check,
  Star,
  Users,
  Award,
  Zap,
  BookOpen,
  Linkedin,
  Instagram,
  Twitter,
  ChevronRight,
  ShieldAlert,
  ChevronDown,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

// Subcomponents imports
import Navigation from './components/Navigation';
import RoiCalculator from './components/RoiCalculator';
import ProgramCard from './components/ProgramCard';
import TestimonialSlider from './components/TestimonialSlider';
import BookingModal from './components/BookingModal';
import { Program } from './types';

// Image assets references
const marcusPortrait = '/assets/images/marcus_reed_portrait_1780239831723.png';
const businessScalingBg = '/assets/images/business_scaling_dark_1780239853254.png';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('about');
  const [activeBlogTab, setActiveBlogTab] = useState('all');

  const programs: Program[] = [
    {
      id: '1on1',
      name: '1-on-1 Intensive Coaching',
      price: '$3,000',
      period: '/ MONTH',
      badge: 'ELITE PRIVATE ACCESS',
      description: 'Personalized growth coaching designed for entrepreneurs serious about scaling past $1M+ operational control.',
      includes: [
        'Bi-weekly private coaching sessions',
        'Custom growth strategy roadmap',
        'Leadership and team optimization',
        'Revenue and KPI tracking dashboards',
        'Unlimited direct email and Slack support',
        'Quarterly comprehensive business audits'
      ],
      ctaText: 'Apply For Private Access'
    },
    {
      id: 'mastermind',
      name: 'Group Mastermind',
      price: '$997',
      period: '/ MONTH',
      badge: 'ACCELERATED PEER NETWORK',
      description: 'Join a carefully curated community of ambitious founders committed to systems-driven velocity.',
      includes: [
        'Weekly mastermind design sessions',
        'Direct peer-to-peer accountability loops',
        'Live hot-seat coaching workshops',
        'Proven commercial growth frameworks',
        'VIP access to private member network',
        'Monthly specialized guest expert masterclasses'
      ],
      ctaText: 'Join The Mastermind'
    },
    {
      id: 'strategy',
      name: 'Strategy Day',
      price: '$2,500',
      period: 'ONE-TIME',
      badge: 'BOTTLENECK RAPID RECOVERY',
      description: 'A focused, high-impact hyper-intensive planning session to solve your single largest operational ceiling.',
      includes: [
        'Full-day private Strategy intensive',
        'In-depth operational business audits',
        'Growth-leverage opportunity assessment',
        'Complete 90-day action blueprint',
        'Professional executive KPI dashboard build',
        '30-day integration & support follow-up'
      ],
      ctaText: 'Book My Strategy Day'
    }
  ];

  const blogPosts = [
    {
      title: 'The Founder Trap: Why Scaling Past $500k Relies on Systems, Not Talent',
      category: 'scaling',
      tag: 'OPERATIONAL DESIGN',
      readTime: '6 min read',
      date: 'May 28, 2026',
      desc: 'Most entrepreneurs believe growing revenue requires finding superstars. The reality? High-converting companies are scaled on systems, not individual heroes.'
    },
    {
      title: 'How to Reclaim 15 Hours of Weekly Calendar Workload in 30 Days',
      category: 'workload',
      tag: 'EXECUTIVE TIME',
      readTime: '5 min read',
      date: 'May 12, 2026',
      desc: 'Step-by-step framework to audit your current calendar bottlenecks, isolate operational noise, and transition into your primary role as a true CEO.'
    },
    {
      title: 'Designing Predictable Growth Loops Instead of Spot-Fixing Marketing Stalls',
      category: 'marketing',
      tag: 'REVENUE VELOCITY',
      readTime: '8 min read',
      date: 'Apr 24, 2026',
      desc: 'Traditional campaigns create spikes, not sustainable predictability. Learn to structure automated organic-to-paid feedback mechanics that sell continuously.'
    }
  ];

  const handleOpenBooking = (programId?: string) => {
    setSelectedProgramId(programId);
    setIsBookingOpen(true);
  };

  const handleSelectProgramRecommendation = (programId: string) => {
    setSelectedProgramId(programId);
    setIsBookingOpen(true);
  };

  // Scroll spy effect to highlight navigation items
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'results', 'programs', 'assessment'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0D0D0D] min-h-screen text-gray-200 selection:bg-[#F5A623] selection:text-black">
      {/* Navigation Bar */}
      <Navigation onBookCall={() => handleOpenBooking()} activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 pb-24 md:pt-40 md:pb-36 bg-[#0D0D0D] relative overflow-hidden flex items-center border-b border-gray-950"
      >
        {/* Ambient golden radial background glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#F5A623]/2 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div id="hero-bento-split" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Call to action typography copy (7 columns) */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] text-[#F5A623] uppercase bg-[#1A1A2E] px-4 py-1.5 rounded border border-gray-800/85">
                  OPERATIONAL ARCHITECTURE FOR FOUNDERS
                </span>
                
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase mt-5 mb-4 leading-[1.05]">
                  You've Built <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-amber-400 to-[#F5A623]">Something.</span> Now Let's Scale It.
                </h1>
                
                <p className="font-display font-bold text-gray-300 text-lg md:text-xl tracking-wide max-w-2xl leading-normal">
                  Business growth coaching for entrepreneurs ready to break past their revenue ceiling.
                </p>
              </div>

              <div className="space-y-4 text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                <p>
                  Most founders hit a point where working harder stops producing better results. Revenue stalls, teams become harder to manage, and growth starts feeling heavier instead of easier.
                </p>
                <p>
                  I help ambitious entrepreneurs build scalable structures, strengthen executive leadership, and introduce predictable growth—without sacrificing their health, family, or personal freedom.
                </p>
              </div>

              {/* Action buttons */}
              <div id="hero-cta-group" className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  id="hero-book-call-btn"
                  onClick={() => handleOpenBooking()}
                  className="cursor-pointer bg-[#F5A623] hover:bg-amber-400 text-[#0d0d0d] font-bold uppercase tracking-wider text-xs py-4 px-8 rounded transition-all duration-300 shadow-[0_8px_20px_rgba(245,166,35,0.25)] hover:shadow-[0_8px_30px_rgba(245,166,35,0.4)] text-center"
                >
                  Book a Strategy Call
                </button>
                <a
                  id="hero-view-results-lnk"
                  href="#results"
                  className="cursor-pointer border border-gray-700 hover:border-white hover:bg-white/5 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>See Client Results</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Media Highlight Image (5 columns) */}
            <div className="lg:col-span-5 flex justify-center">
              <div id="portrait-frame" className="relative group max-w-sm sm:max-w-md">
                {/* Accent frames */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-2xl" />
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/20 to-[#F5A623]/20 rounded-2xl blur-lg group-hover:opacity-100 opacity-60 transition duration-1000 group-hover:duration-200" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#F5A623]/40 rounded-bl-2xl hidden sm:block pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#F5A623]/40 rounded-tr-2xl hidden sm:block pointer-events-none" />

                {/* Main Portrait */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-800/80 aspect-[3/4]">
                  <img
                    id="marcus-hero-portrait"
                    src={marcusPortrait}
                    alt="Marcus Reed Business Growth Coach Logo portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Floating Micro Badge */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-gray-800/80 flex items-center space-x-3">
                    <div className="bg-[#F5A623] h-10 w-10 rounded-full flex items-center justify-center text-black font-black">
                      MR
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white uppercase tracking-wide">Marcus Reed</span>
                      <span className="block text-[10px] font-mono text-[#F5A623] uppercase">Coaching Operations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof Stats Bar */}
      <section id="stats-bar" className="py-12 bg-[#1A1A2E]/60 border-b border-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div id="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            
            <div id="stat-coached" className="pt-0">
              <span className="font-display text-4xl md:text-5xl font-black text-[#F5A623] block leading-none select-none">
                120+
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-2.5 block font-bold">
                Founders Coached
              </span>
            </div>

            <div id="stat-revenue" className="pt-6 md:pt-0">
              <span className="font-display text-4xl md:text-5xl font-black text-[#F5A623] block leading-none select-none">
                $50M+
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-2.5 block font-bold">
                Revenue Generated
              </span>
            </div>

            <div id="stat-rating" className="pt-6 md:pt-0">
              <span className="font-display text-4xl md:text-5xl font-black text-[#F5A623] block leading-none select-none">
                4.9★
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-2.5 block font-bold">
                Average Rating
              </span>
            </div>

            <div id="stat-experience" className="pt-6 md:pt-0">
              <span className="font-display text-4xl md:text-5xl font-black text-[#F5A623] block leading-none select-none">
                12+
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mt-2.5 block font-bold">
                Years of Experience
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Who This Is For (Bento Grid) */}
      <section id="who-fits" className="py-24 bg-[#0d0d0d] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div id="who-fits-header" className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase bg-[#1A1A2E] px-3 py-1 rounded border border-gray-800">
              The Alignment Check
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase mt-4 mb-5 tracking-tight leading-tight">
              Signs You are Stuck
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              If any of the following organizational bottlenecks describe your weekly operations, you have reached the business volume ceiling.
            </p>
          </div>

          {/* Bento Style Grid */}
          <div id="who-fits-cards-container" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Stuck at same revenue */}
            <div id="bento-card-stuck" className="bg-[#1A1A2E]/30 hover:bg-[#1A1A2E]/50 border border-gray-800 rounded-2xl p-8 relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 blur-xl rounded-full" />
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-gray-500">01 / STALL</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white mb-4">
                You're Stuck at the Same Revenue Level
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                You've been hovering around the same revenue numbers for years despite putting in more effort than ever. You know your business has more potential, but growth feels frustratingly inconsistent and heavy.
              </p>
            </div>

            {/* Card 2: Business runs you */}
            <div id="bento-card-runs-you" className="bg-gradient-to-b from-[#1A1A2E]/60 to-black/30 border-2 border-[#F5A623]/30 rounded-2xl p-8 relative overflow-hidden shadow-xl group transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-xl rounded-full" />
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                  <Clock className="h-5 w-5 animate-pulse" />
                </div>
                <span className="font-mono text-xs font-bold text-[#F5A623]">02 / PRESSURE</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white mb-4">
                Your Business Runs You
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your calendar is packed with internal fires, your team depends on you for every operational choice, and taking a real vacation feels impossible. Success shouldn't require being the forever bottleneck.
              </p>
            </div>

            {/* Card 3: Harder work, no growth */}
            <div id="bento-card-hustle" className="bg-[#1A1A2E]/30 hover:bg-[#1A1A2E]/50 border border-gray-800 rounded-2xl p-8 relative overflow-hidden group transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 blur-xl rounded-full" />
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-10 rounded-lg bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-gray-500">03 / HUstLE</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-white mb-4">
                Working Harder But Not Growing Faster
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                More hours, more personal stress, and more team accountability aren't translating into meaningful wealth or speed. You need real operational leverage, governance, and strategy—not more hustle.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ROI Diagnostic Calculators */}
      <RoiCalculator onSelectProgram={handleSelectProgramRecommendation} />

      {/* Programs (The Pricing Tiers) */}
      <section id="programs" className="py-24 bg-gradient-to-b from-[#0D0D0D] to-[#111122]/30 border-t border-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div id="programs-header" className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase bg-[#1A1A2E] px-3 py-1 rounded border border-gray-800">
              Growth Architecture Programs
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase mt-4 mb-5 tracking-tight leading-none text-center">
              Coaching Programs
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed text-center">
              Choose the level of engagement that fits your current operational scale, from targeted custom strategy intensives to high-level peer networks.
            </p>
          </div>

          {/* Program cards layout */}
          <div id="programs-cards-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {programs.map((prog, index) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                onApply={(id) => handleOpenBooking(id)}
                isPopular={prog.id === '1on1'}
              />
            ))}
          </div>

        </div>
      </section>

      {/* About Marcus section */}
      <section id="about" className="py-24 bg-[#0d0d0d] relative overflow-hidden border-t border-b border-gray-950">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-amber-500/2 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div id="about-content-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Story (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase bg-[#1A1A2E] px-3 py-1 rounded border border-gray-800">
                MEET YOUR CATALYST
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase leading-tight mt-3">
                I Learned the Hard Way That More Work Doesn't Always Mean More Growth.
              </h2>
              
              <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                <p className="font-semibold text-gray-200">
                  Ten years ago, I was exactly where many of my clients are today.
                </p>
                <p>
                  I built my first company from the ground up and eventually scaled it past $2 million in annual revenue. From the outside, everything looked successful. Inside, I was exhausted.
                </p>
                <p>
                  I was working 70-hour weeks, answering every question, solving every problem, and carrying the weight of the business on my shoulders.
                </p>
                <p className="text-amber-400 font-medium">
                  The company grew—but my freedom disappeared.
                </p>
                <p>
                  That grueling experience forced me to rethink everything. I tore down the company model and rebuilt the business around delegation, systems, leadership, and scalable processes. Revenue continued to grow, but this time without the constant chaos and mental burnout.
                </p>
                <p>
                  Today, I help founders do the same. My clients don't just grow revenue—they build high-converting, resilient businesses that support the life they actually want to live.
                </p>
              </div>

              {/* Media validation */}
              <div id="media-logos-box" className="pt-8 space-y-3">
                <span className="block font-mono text-[9px] tracking-wider text-gray-500 uppercase font-bold">
                  As Featured in / Worked with
                </span>
                <div id="logo-grid" className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {/* Forbes SVG */}
                  <div className="flex items-center text-gray-400 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="font-sans font-black text-lg tracking-tight select-none">FORBES</span>
                  </div>
                  {/* Entrepreneur SVG */}
                  <div className="flex items-center text-gray-400 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="font-serif font-bold text-lg select-none">Entrepreneur</span>
                  </div>
                  {/* Inc. Magazine */}
                  <div className="flex items-center text-gray-400 opacity-60 hover:opacity-100 transition-opacity">
                    <span className="font-sans font-black tracking-normal text-lg select-none">INC. <span className="font-light">MAGAZINE</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Imagery (5 columns) */}
            <div className="lg:col-span-5 flex justify-center">
              <div id="workspace-imagery-framed" className="relative group max-w-sm sm:max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 to-[#F5A623]/10 rounded-2xl blur group-hover:opacity-100 opacity-50 transition" />
                
                <div className="overflow-hidden rounded-2xl border border-gray-800/80 aspect-[4/3]">
                  <img
                    id="business-scaling-background"
                    src={businessScalingBg}
                    alt="Corporate luxury modern boardroom mockup representation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-110 hover:contrast-100 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <TestimonialSlider />

      {/* Blog and Insights Grid (Adding value and conversion appeal) */}
      <section id="insights" className="py-24 bg-[#0d0d0d] border-b border-gray-950 justify-center">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div id="insights-header" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase bg-black px-3 py-1 rounded border border-gray-800">
                FOUNDER KNOWLEDGE BASE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase mt-4 tracking-tight leading-tight">
                Insights & Blog
              </h2>
            </div>
            
            {/* Filter buttons */}
            <div id="blog-filters" className="flex flex-wrap gap-2 text-xs font-bold tracking-wide uppercase font-mono">
              {['all', 'scaling', 'workload', 'marketing'].map((tab) => (
                <button
                  id={`blog-tab-${tab}`}
                  key={tab}
                  onClick={() => setActiveBlogTab(tab)}
                  className={`px-4 py-2 rounded transition-all border cursor-pointer ${
                    activeBlogTab === tab
                      ? 'bg-[#F5A623] text-black border-[#F5A623] shadow-md'
                      : 'bg-[#1A1A2E]/30 text-gray-400 border-gray-800/80 hover:border-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div id="blog-posts-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => activeBlogTab === 'all' || post.category === activeBlogTab)
              .map((post, idx) => (
                <article
                  id={`blog-article-${idx}`}
                  key={idx}
                  className="bg-[#1A1A2E]/30 hover:bg-[#1A1A2E]/50 border border-gray-800/80 rounded-xl p-6 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#F5A623] font-bold">
                      <span className="bg-[#F5A623]/10 px-2 py-0.5 border border-[#F5A623]/25 rounded">
                        {post.tag}
                      </span>
                      <span className="text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {post.desc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-800/60 mt-6 flex justify-between items-center text-[10px] font-mono select-none">
                    <span className="text-gray-500">{post.date}</span>
                    <button
                      id={`blog-read-btn-${idx}`}
                      onClick={() => handleOpenBooking()}
                      className="text-[#F5A623] hover:text-[#f3b64c] font-black uppercase flex items-center space-x-1"
                    >
                      <span>Read Post</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </article>
              ))}
          </div>

        </div>
      </section>

      {/* Final Call to Action Segment */}
      <section id="final-cta" className="py-24 bg-gradient-to-t from-black to-[#1A1A2E]/60 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#F5A623] uppercase">
              REPRODUCIBLE SYSTEMIZED ACCELERATION
            </span>
            
            <h2 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              Ready to Scale?
            </h2>
            
            <div className="space-y-2 text-md tracking-wide">
              <p className="text-gray-200 font-bold">
                Book a free 30-minute strategy call.
              </p>
              <p className="text-amber-400 font-mono text-xs uppercase font-bold">
                No pitch. No pressure.
              </p>
            </div>

            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed pt-2">
              Just absolute operational clarity on what's holding your business back and the fastest high-leverage path to your next level of growth.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                id="final-section-cta"
                onClick={() => handleOpenBooking()}
                className="cursor-pointer bg-[#F5A623] hover:bg-amber-400 text-[#0d0d0d] font-bold uppercase tracking-wider text-xs py-4.5 px-10 rounded transition-all duration-300 shadow-[0_8px_25px_rgba(245,166,35,0.3)] hover:shadow-[0_8px_35px_rgba(245,166,35,0.5)]"
              >
                Book My Free Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Absolute Master Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedProgramId={selectedProgramId}
      />

      {/* Footer */}
      <footer id="main-coaching-footer" className="bg-[#070707] py-16 border-t border-gray-900 overflow-hidden text-center sm:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo & Pitch column (5 cols) */}
          <div id="footer-pitch-col" className="md:col-span-5 space-y-4">
            <span className="font-display text-xl font-black tracking-tight text-white uppercase sm:text-2xl">
              Marcus Reed<span className="text-[#F5A623]">.</span>
            </span>
            <span className="block font-mono text-[9px] tracking-widest text-[#F5A623] uppercase font-bold">
              Business Growth Coach
            </span>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Helping elite founders transition from operational fire-fighters to systems-driven CEOs scaling past $2M+ without burning out.
            </p>
            
            {/* Social media icons widget */}
            <div id="socials-group" className="flex justify-center sm:justify-start items-center space-x-4 pt-2">
              <a href="#" className="h-8 w-8 hover:bg-[#F5A623]/10 hover:text-[#F5A623] rounded-full border border-gray-800 flex items-center justify-center text-gray-400 transition" aria-label="LinkedIn Profile">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 hover:bg-[#F5A623]/10 hover:text-[#F5A623] rounded-full border border-gray-800 flex items-center justify-center text-gray-400 transition" aria-label="Instagram Profile">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 hover:bg-[#F5A623]/10 hover:text-[#F5A623] rounded-full border border-gray-800 flex items-center justify-center text-gray-400 transition" aria-label="Twitter Feed">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav quicklinks columns (4 cols) */}
          <div id="footer-nav-col" className="md:col-span-4 grid grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold">
                Navigational
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="text-gray-400 hover:text-[#F5A623] transition-colors">About</a></li>
                <li><a href="#results" className="text-gray-400 hover:text-[#F5A623] transition-colors">Results</a></li>
                <li><a href="#programs" className="text-gray-400 hover:text-[#F5A623] transition-colors">Programs</a></li>
                <li><a href="#assessment" className="text-gray-400 hover:text-[#F5A623] transition-colors">Self Assessment</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold">
                Resources
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#insights" className="text-gray-400 hover:text-[#F5A623] transition-colors">Blog</a></li>
                <li><button onClick={() => handleOpenBooking()} className="text-gray-400 hover:text-[#F5A623] transition-colors text-left cursor-pointer">Contact</button></li>
                <li><button onClick={() => handleOpenBooking()} className="text-gray-400 hover:text-[#F5A623] transition-colors text-left cursor-pointer">Apply</button></li>
              </ul>
            </div>
          </div>

          {/* Legal / credits (3 cols) */}
          <div id="footer-credits-col" className="md:col-span-3 text-left space-y-3 md:text-right">
            <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold">
              Legal Info
            </h4>
            <div className="text-[11px] text-gray-500 space-y-1 font-sans">
              <p>© 2026 Marcus Reed.</p>
              <p>All Rights Reserved.</p>
              <p className="pt-2">Designed for high compliance conversions.</p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
