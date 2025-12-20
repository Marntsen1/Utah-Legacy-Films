import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';

const Hero: React.FC = () => {
  // Animation Variants for the Title
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.2, 0.65, 0.3, 0.9] 
      } 
    }
  };

  const cinematicTextVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(8px)", color: "#362b24" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      color: "#c06e46", 
      transition: { 
        duration: 1.0, 
        ease: "easeOut" 
      } 
    }
  };

  const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        delay: 0.8, 
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-20 px-6 overflow-hidden" aria-label="Hero section">
      
      {/* 1. THE HOOK: Centered Text Content */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10 mb-16">
        <Reveal delay={0.1} width="fit-content">
          <div className="inline-block px-5 py-2 mb-8 border border-[#362b24]/20 rounded-full bg-[#362b24]/5 backdrop-blur-md shadow-sm">
            <span className="text-[#362b24] text-xs font-bold uppercase tracking-[0.2em]">
              Serving Families in Utah
            </span>
          </div>
        </Reveal>

        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#362b24] mb-8 leading-[1.05]"
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-block md:block">
            <motion.span variants={wordVariants} className="inline-block">Tell</motion.span>
            {" "}
            <motion.span variants={wordVariants} className="inline-block">your</motion.span>
            {" "}
            <motion.span variants={wordVariants} className="inline-block">story</motion.span>
          </span>

          <span className="inline-block ml-3 md:ml-0">
            <motion.span 
              variants={cinematicTextVariants} 
              className="italic relative inline-block"
            >
              cinematically.
              <motion.svg 
                className="absolute w-full h-3 -bottom-1 left-0 text-[#c06e46]/30" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
              >
                <motion.path 
                  d="M0 5 Q 50 10 100 5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  variants={underlineVariants}
                />
              </motion.svg>
            </motion.span>
          </span>
        </motion.h1>

        <Reveal delay={0.4}>
          <p className="text-lg md:text-2xl text-[#85756b] max-w-2xl mx-auto mb-10 font-light leading-relaxed antialiased">
            We capture the essence of your loved ones in intimate, documentary-grade interviews. 
            Preserve their voice, laugh, and wisdom for generations to come.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button variant="primary" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto shadow-xl shadow-[#362b24]/20">
              Start Your Journey
            </Button>
            <Button 
              variant="secondary" 
              className="group w-full sm:w-auto bg-white/50 backdrop-blur-sm"
              onClick={() => {
                // Add video modal or link to video here
                console.log('Watch trailer clicked');
              }}
            >
              <Play className="w-4 h-4 mr-2 group-hover:text-[#c06e46] transition-colors" />
              Watch Trailer
            </Button>
          </div>
        </Reveal>
      </div>

      {/* 2. VISUAL ANCHOR: Interview Setup Image */}
      <Reveal delay={0.6} width="100%">
        <div className="relative w-full max-w-6xl mx-auto z-10 mt-8 group">
          <div className="relative rounded-3xl overflow-hidden bg-[#f5f2eb] p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-[#362b24]/20 hover:scale-[1.02] cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-[#362b24]/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none z-10" />
            <img 
              src="/interview-setup.png" 
              alt="Professional video interview setup with elderly couple and videographer in a warm living room" 
              className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-white font-medium text-sm">Professional Interview Setup</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-white/0 via-[#e8e2d9]/30 to-white/0 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c06e46]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;