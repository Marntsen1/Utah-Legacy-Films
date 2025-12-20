import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Warm Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f2eb] via-[#ece8df] to-[#f5f2eb]" />

      {/* Grid Mesh - subtle brown */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#362b24 1px, transparent 1px), linear-gradient(90deg, #362b24 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Blobs - Earth Tones (Browns, Clays) */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#c06e46]/10 rounded-full blur-3xl mix-blend-multiply"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#85756b]/15 rounded-full blur-3xl mix-blend-multiply"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 60, -20, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-[#d6ad60]/15 rounded-full blur-3xl mix-blend-multiply"
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -20, 20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Vignette using warm tones */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f2eb] via-transparent to-[#f5f2eb] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(245,242,235,0.4)_100%)]" />
    </div>
  );
};

export default AnimatedBackground;