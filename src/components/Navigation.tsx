/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onBookCall: () => void;
  activeSection: string;
}

export default function Navigation({ onBookCall, activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Results', href: '#results' },
    { label: 'Programs', href: '#programs' },
    { label: 'Self Assessment', href: '#assessment' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d0d0d]/80 backdrop-blur-md border-b border-gray-800/40 py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a id="nav-logo" href="#" className="flex items-center space-x-2 group">
          <span className="font-display text-xl font-extrabold tracking-tight text-white uppercase sm:text-2xl">
            Marcus Reed<span className="text-[#F5A623]">.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav id="desktop-navbar" className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              key={link.label}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-all hover:text-[#F5A623] ${
                activeSection === link.href.substring(1)
                  ? 'text-[#F5A623]'
                  : 'text-gray-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            id="nav-cta-btn"
            onClick={onBookCall}
            className="cursor-pointer relative overflow-hidden group bg-transparent border border-[#F5A623] px-6 py-2.5 rounded text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#F5A623] hover:text-[#0D0D0D] hover:shadow-[0_0_20px_rgba(245,166,35,0.4)]"
          >
            <span className="relative z-10">Work With Me</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-[#F5A623] transition-colors p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0d0d0d] border-b border-gray-800/80"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  id={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium tracking-wide transition-colors py-2 ${
                    activeSection === link.href.substring(1)
                      ? 'text-[#F5A623]'
                      : 'text-gray-300 hover:text-[#F5A623]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-gray-800/60 my-2" />
              <button
                id="mobile-nav-cta-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookCall();
                }}
                className="w-full text-center bg-[#F5A623] text-[#0D0D0D] py-3 rounded font-bold uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(245,166,35,0.3)] hover:bg-[#d98d1a]"
              >
                Book a Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
