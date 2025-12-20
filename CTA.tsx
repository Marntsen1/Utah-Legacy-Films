import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const CTA: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate network request
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="inquire" className="relative py-32 px-6 overflow-hidden">
       {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#c06e46]/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-[#362b24] rounded-3xl overflow-hidden shadow-2xl shadow-[#362b24]/20 flex flex-col lg:flex-row">
          
          {/* Left Side: Copy & Pricing CTA */}
          <div className="p-12 md:p-16 lg:w-1/2 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <Reveal width="100%">
              <h2 className="font-serif text-4xl md:text-5xl text-[#f5f2eb] mb-6 leading-tight">
                Capture the story <br /> <span className="text-[#c06e46] italic">before it fades.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2} width="100%">
              <p className="text-[#a89b91] text-lg mb-10 leading-relaxed">
                Time is the one thing we can't get back. We help you preserve your family's legacy with the dignity and beauty it deserves.
              </p>
            </Reveal>

            <Reveal delay={0.3} width="100%">
              <div className="flex flex-col items-start gap-6">
                {/* Pricing "Bubble" Button */}
                <button 
                  onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#f5f2eb]/10 hover:bg-[#f5f2eb]/20 border border-[#f5f2eb]/10 text-[#f5f2eb] px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 group text-sm font-medium tracking-wide backdrop-blur-sm shadow-lg shadow-black/5"
                >
                  <span>View Pricing Packages</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="mt-8 flex items-center gap-4 text-xs text-[#85756b]">
                  <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-[#85756b]/20 border border-[#362b24] flex items-center justify-center text-[#f5f2eb]">J</div>
                     <div className="w-8 h-8 rounded-full bg-[#85756b]/30 border border-[#362b24] flex items-center justify-center text-[#f5f2eb]">M</div>
                     <div className="w-8 h-8 rounded-full bg-[#85756b]/40 border border-[#362b24] flex items-center justify-center text-[#f5f2eb]">+</div>
                  </div>
                  <p>Limited availability for {new Date().getFullYear()} season.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Survey Form - Now Lighter & Friendlier */}
          <div className="p-12 md:p-16 lg:w-1/2 bg-[#efebe4] border-t lg:border-t-0 lg:border-l border-[#362b24]/5">
            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-[#c06e46] flex items-center justify-center mb-6 text-[#f5f2eb]"
                >
                  <Check className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-serif text-[#362b24] mb-2">Message Received</h3>
                <p className="text-[#85756b]">We'll send your free list of interview questions shortly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-sm text-[#c06e46] hover:text-[#362b24] transition-colors"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-[#362b24] font-medium mb-2 text-lg leading-snug">
                  Get your <span className="text-[#c06e46]">free list</span> of interview questions by filling out below.
                </h3>
                
                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      placeholder="Your name" 
                      className="w-full bg-white border border-[#362b24]/10 rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:border-[#c06e46] focus:ring-1 focus:ring-[#c06e46]/20 transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      placeholder="Email address" 
                      className="w-full bg-white border border-[#362b24]/10 rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:border-[#c06e46] focus:ring-1 focus:ring-[#c06e46]/20 transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input 
                      type="tel" 
                      id="phone"
                      placeholder="Phone number (optional)" 
                      className="w-full bg-white border border-[#362b24]/10 rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:border-[#c06e46] focus:ring-1 focus:ring-[#c06e46]/20 transition-all duration-300 shadow-sm"
                    />
                  </div>

                  {/* Who is this for Input */}
                  <div>
                    <label htmlFor="recipient" className="sr-only">Who is the interview for?</label>
                    <textarea 
                      id="recipient"
                      required
                      rows={3}
                      placeholder="Who is this interview for? (e.g. My grandmother, parents, myself)" 
                      className="w-full bg-white border border-[#362b24]/10 rounded-xl px-4 py-3 text-[#362b24] placeholder-[#85756b]/70 focus:outline-none focus:border-[#c06e46] focus:ring-1 focus:ring-[#c06e46]/20 transition-all duration-300 resize-none shadow-sm"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="mt-2 w-full bg-[#362b24] text-[#f5f2eb] font-medium py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#2e231e] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#362b24]/10"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Get Free Questions'}
                  {formState !== 'submitting' && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;