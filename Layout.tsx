import React, { useState, useEffect } from 'react';
import { LogoIcon } from './ui/Logo';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#362b24] font-sans selection:bg-[#c06e46] selection:text-[#f5f2eb]">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#f5f2eb]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#362b24]/5' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
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

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-[#85756b] hover:text-[#362b24] transition-colors">Process</a>
            <a href="#" className="text-[#85756b] hover:text-[#362b24] transition-colors">Portfolio</a>
            <a href="#" className="text-[#85756b] hover:text-[#362b24] transition-colors">About Us</a>
            <a href="#" className="px-5 py-2.5 bg-[#362b24] text-[#f5f2eb] rounded-full hover:bg-[#2e231e] transition-colors shadow-lg shadow-[#362b24]/10">
              Book Now
            </a>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="py-12 bg-[#e8e2d9]/30 text-center text-xs text-[#85756b] border-t border-[#362b24]/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 opacity-80">
                <LogoIcon className="w-8 h-8 grayscale opacity-50" />
                <p>© {new Date().getFullYear()} Utah Legacy Films.</p>
            </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c06e46] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#c06e46] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#c06e46] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;