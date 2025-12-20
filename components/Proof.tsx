import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Proof: React.FC = () => {
  return (
    <section id="proof" className="relative py-32 bg-[#e8e2d9]/30 border-y border-[#362b24]/5 overflow-hidden" aria-label="Social proof and testimonials">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#362b24 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Visual Proof / Video Thumbnail */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative group"
          >
            <div className="aspect-[4/5] md:aspect-square relative rounded-2xl overflow-hidden border border-[#362b24]/10 shadow-2xl shadow-[#362b24]/15">
              {/* Grandparent and child image */}
              <img 
                src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Grandfather reading with grandchild in a warm, intimate setting" 
                className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700 sepia-[.15]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#362b24] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-mono text-white uppercase tracking-wider border border-white/20">
                        Documentary
                    </div>
                </div>
                <p className="text-[#f5f2eb] font-serif text-2xl md:text-3xl italic leading-tight">"Stories from the farm"</p>
                <p className="text-[#f5f2eb]/80 text-sm mt-2 font-medium tracking-wide">The Nielsen Legacy • 42 Minutes</p>
              </div>
            </div>
            
            {/* Play Button Overlay */}
            <button 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer group-hover:scale-110 transition-transform duration-300"
              aria-label="Play documentary video"
              onClick={() => {
                // Add video modal or link to video here
                console.log('Play video clicked');
              }}
            >
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
            </button>
          </motion.div>

          {/* Testimonial Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <Reveal width="100%">
              <div className="inline-flex items-center justify-center md:justify-start mb-8">
                 <Quote className="w-12 h-12 text-[#c06e46] opacity-90" />
              </div>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#362b24] leading-relaxed mb-10">
                "We gathered the whole family to watch Grandpa's film. Seeing him light up while telling stories about his childhood... there wasn't a dry eye in the room. <span className="text-[#c06e46] bg-[#c06e46]/5 px-1">It brought us all closer.</span>"
              </h3>
            </Reveal>

            <Reveal delay={0.3} width="100%">
              <div className="flex items-center justify-center md:justify-start gap-4 border-t border-[#362b24]/10 pt-8">
                <div className="w-14 h-14 rounded-full bg-[#85756b] overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                    alt="Emily Robinson, satisfied customer" 
                    className="w-full h-full object-cover grayscale mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[#362b24] font-bold text-lg font-serif">Emily Robinson</p>
                  <p className="text-[#85756b] text-sm uppercase tracking-wide font-medium">Salt Lake City, UT</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Proof;