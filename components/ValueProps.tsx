import React from 'react';
import { motion } from 'framer-motion';
import { Film, Heart, Clock } from 'lucide-react';
import { ValueCardProps } from '../types';
import { Reveal } from './ui/Reveal';

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, delay, hover: { duration: 0.3 } }}
      className="group relative p-8 rounded-2xl bg-white/60 border border-[#362b24]/10 backdrop-blur-md hover:border-[#c06e46]/30 transition-colors duration-300 hover:shadow-xl hover:shadow-[#362b24]/5 text-center md:text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#c06e46]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative z-10 flex flex-col items-center md:items-start">
        <div className="w-14 h-14 mb-6 rounded-2xl bg-[#f5f2eb] border border-[#362b24]/10 flex items-center justify-center text-[#c06e46] group-hover:scale-110 transition-transform duration-300 shadow-sm">
          {icon}
        </div>
        <h3 className="font-serif text-2xl text-[#362b24] mb-3">{title}</h3>
        <p className="text-[#85756b] leading-relaxed text-sm md:text-base">{description}</p>
      </div>
    </motion.div>
  );
};

const ValueProps: React.FC = () => {
  const features = [
    {
      title: "Intimate Connection",
      description: "Our interviewers are trained to guide conversations deeply yet gently, uncovering the stories and emotions that define your family's legacy.",
      icon: <Heart className="w-7 h-7" />,
      delay: 0.1
    },
    {
      title: "Cinematic Quality",
      description: "We don't just record video; we film a documentary. Using Netflix-approved cameras and professional lighting, we turn your living room into a studio.",
      icon: <Film className="w-7 h-7" />,
      delay: 0.2
    },
    {
      title: "Effortless Production",
      description: "No travel required. We come to you, handle the setup, the interview, and the editing. You simply sit back and share your story.",
      icon: <Clock className="w-7 h-7" />,
      delay: 0.3
    }
  ];

  return (
    <section id="value-props" className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-[#f5f2eb] to-[#efebe4]" aria-label="Value propositions">
      <div className="max-w-7xl mx-auto">
        
        {/* EXPLANATION: Centered Stack */}
        <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
          <Reveal width="100%">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#362b24] mb-8 leading-tight">
              More than a video. <br />
              <span className="text-[#c06e46]">A timeless heirloom.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.2} width="100%">
            <p className="text-[#85756b] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16">
              We combine the production value of high-end cinema with the warmth of a family conversation. It's a way to gather the family, even when you can't all be in the same room.
            </p>
          </Reveal>

          {/* Centered Image Visual */}
          <Reveal delay={0.3} width="100%">
             <div className="w-full max-w-3xl mx-auto aspect-[16/9] relative rounded-3xl overflow-hidden shadow-2xl shadow-[#362b24]/10 border border-[#362b24]/10 group">
               <img 
                  src="/family-watching.png" 
                  alt="Family of four watching their legacy film together on the TV, with elderly couple displayed on screen" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to placeholder if image not found
                    target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
                  }}
               />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
             </div>
          </Reveal>
        </div>

        {/* PROOF POINTS: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <ValueCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;