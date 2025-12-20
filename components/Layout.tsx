import React, { useState, useEffect } from 'react';
import { LogoIcon } from './ui/Logo';
import { Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#362b24] font-sans selection:bg-[#c06e46] selection:text-[#f5f2eb]">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#f5f2eb]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#362b24]/5' : 'bg-transparent py-6'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a 
            href="#hero" 
            className="flex items-center gap-3 group"
            aria-label="Utah Legacy Films - Home"
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            <div className="relative">
                <LogoIcon className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl text-[#362b24] font-bold tracking-tight leading-none">
                Utah Legacy
                </span>
                <span className="text-[0.65rem] md:text-xs text-[#c06e46] uppercase tracking-[0.2em] font-medium leading-none mt-1">
                Films
                </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a 
              href="#value-props" 
              className="text-[#85756b] hover:text-[#362b24] transition-colors"
              onClick={(e) => handleNavClick(e, 'value-props')}
            >
              Process
            </a>
            <a 
              href="#proof" 
              className="text-[#85756b] hover:text-[#362b24] transition-colors"
              onClick={(e) => handleNavClick(e, 'proof')}
            >
              Portfolio
            </a>
            <a 
              href="#inquire" 
              className="text-[#85756b] hover:text-[#362b24] transition-colors"
              onClick={(e) => handleNavClick(e, 'inquire')}
            >
              About Us
            </a>
            <a 
              href="#plans" 
              className="px-5 py-2.5 bg-[#362b24] text-[#f5f2eb] rounded-full hover:bg-[#2e231e] transition-colors shadow-lg shadow-[#362b24]/10"
              onClick={(e) => handleNavClick(e, 'plans')}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#362b24] hover:text-[#c06e46] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 top-[73px] bg-[#f5f2eb] z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="flex flex-col p-6 space-y-6">
            <a 
              href="#value-props" 
              className="text-lg text-[#362b24] hover:text-[#c06e46] transition-colors py-2"
              onClick={(e) => handleNavClick(e, 'value-props')}
            >
              Process
            </a>
            <a 
              href="#proof" 
              className="text-lg text-[#362b24] hover:text-[#c06e46] transition-colors py-2"
              onClick={(e) => handleNavClick(e, 'proof')}
            >
              Portfolio
            </a>
            <a 
              href="#inquire" 
              className="text-lg text-[#362b24] hover:text-[#c06e46] transition-colors py-2"
              onClick={(e) => handleNavClick(e, 'inquire')}
            >
              About Us
            </a>
            <a 
              href="#plans" 
              className="px-6 py-3 bg-[#362b24] text-[#f5f2eb] rounded-full hover:bg-[#2e231e] transition-colors text-center font-medium"
              onClick={(e) => handleNavClick(e, 'plans')}
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="py-12 bg-[#e8e2d9]/30 text-center text-xs text-[#85756b] border-t border-[#362b24]/10 mt-20" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 opacity-80">
                <LogoIcon className="w-8 h-8 grayscale opacity-50" />
                <p>© {new Date().getFullYear()} Utah Legacy Films. All rights reserved.</p>
            </div>
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a href="#privacy" className="hover:text-[#c06e46] transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-[#c06e46] transition-colors">Terms</a>
            <a href="#inquire" className="hover:text-[#c06e46] transition-colors" onClick={(e) => handleNavClick(e, 'inquire')}>Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;